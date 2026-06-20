import { createContext, useState, useEffect } from 'react';
import axiosInstance from '@/utils/axios';

const initialState = {
  places: [],
  setPlaces: () => {},
  loading: true,
  setLoading: () => {},
  getPlaces: () => {},
  searchPlaces: () => {},
};

export const PlaceContext = createContext(initialState);

export const PlaceProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPlaces = async () => {
    try {
      const { data } = await axiosInstance.get('/places');
      setPlaces(data && Array.isArray(data.places) ? data.places : []);
    } catch (error) {
      console.error('Failed to load places:', error);
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  const searchPlaces = async (key, filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.city) params.append('city', filters.city);
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.ratings) params.append('ratings', filters.ratings);
      if (filters.rooms) params.append('rooms', filters.rooms);
      if (filters.guests) params.append('guests', filters.guests);

      const { data } = await axiosInstance.get(
        `/places/search/${key || 'undefined'}?${params.toString()}`
      );
      setPlaces(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to search places:', error);
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <PlaceContext.Provider
      value={{
        places,
        setPlaces,
        loading,
        setLoading,
        getPlaces,
        searchPlaces,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};
