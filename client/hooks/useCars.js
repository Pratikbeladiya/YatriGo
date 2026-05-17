import { useState, useEffect, useContext } from 'react';

import { CarContext } from '@/providers/CarProvider';
import axiosInstance from '@/utils/axios';

// Hook to consume Cars Context
export const useCars = () => {
    return useContext(CarContext);
};

// Provider state controller for Cars
export const useProvideCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCars = async () => {
        try {
            const { data } = await axiosInstance.get('/cars');
            setCars(data.cars);
        } catch (error) {
            console.error('Failed to load cars:', error);
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

            const { data } = await axiosInstance.get(`/cars/search/${key || 'undefined'}?${params.toString()}`);
            setCars(data);
        } catch (error) {
            console.error('Failed to search cars:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCars();
    }, []);

    return {
        cars,
        setCars,
        loading,
        setLoading,
        searchCars,
        getCars
    };
};
