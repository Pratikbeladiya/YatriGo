import { createContext } from 'react';

import { useProvideCars } from '../../hooks';

const initialState = {
  cars: [],
  setCars: () => {},
  loading: true,
  setLoading: () => {},
};

export const CarContext = createContext(initialState);

export const CarProvider = ({ children }) => {
  const allCars = useProvideCars();

  return (
    <CarContext.Provider value={allCars}>{children}</CarContext.Provider>
  );
};
