import { useContext } from 'react';
import { CarContext } from '@/context/CarContext';

export const useCars = () => {
  return useContext(CarContext);
};
