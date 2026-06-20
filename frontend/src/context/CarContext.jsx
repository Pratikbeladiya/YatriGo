import { createContext, useState, useEffect } from 'react';
import axiosInstance from '@/utils/axios';

const initialState = {
  cars: [],
  setCars: () => {},
  loading: true,
  setLoading: () => {},
  getCars: () => {},
  searchCars: () => {},
};

export const CarContext = createContext(initialState);

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCars = async () => {
    try {
      const { data } = await axiosInstance.get('/cars');
      setCars(data && Array.isArray(data.cars) ? data.cars : []);
    } catch (error) {
      console.error('Failed to load cars:', error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const searchCars = async (key, filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.city) params.append('city', filters.city);
      if (filters.fuelType) params.append('fuelType', filters.fuelType);
      if (filters.transmission) params.append('transmission', filters.transmission);
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.ratings) params.append('ratings', filters.ratings);
      if (filters.seatingCapacity) params.append('seatingCapacity', filters.seatingCapacity);

      const { data } = await axiosInstance.get(
        `/cars/search/${key || 'undefined'}?${params.toString()}`
      );
      setCars(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to search cars:', error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <CarContext.Provider
      value={{
        cars,
        setCars,
        loading,
        setLoading,
        getCars,
        searchCars,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
