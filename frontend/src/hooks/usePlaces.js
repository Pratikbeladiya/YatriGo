import { useContext } from 'react';
import { PlaceContext } from '@/context/PlaceContext';

export const usePlaces = () => {
  return useContext(PlaceContext);
};
