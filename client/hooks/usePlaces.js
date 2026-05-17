import { useState, useEffect, useContext } from 'react';

import { PlaceContext } from '@/providers/PlaceProvider';
import axiosInstance from '@/utils/axios';

// Hook to consume Places Context
export const usePlaces = () => {
    return useContext(PlaceContext);
};

// Provider state controller for Places
export const useProvidePlaces = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPlaces = async () => {
        try {
            const { data } = await axiosInstance.get('/places');
            setPlaces(data.places);
        } catch (error) {
            console.error('Failed to load places:', error);
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

            const { data } = await axiosInstance.get(`/places/search/${key || 'undefined'}?${params.toString()}`);
            setPlaces(data);
        } catch (error) {
            console.error('Failed to search places:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPlaces();
    }, []);

    return {
        places,
        setPlaces,
        loading,
        setLoading,
        searchPlaces,
        getPlaces
    };
};
