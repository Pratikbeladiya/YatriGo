import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/ui/Layout';
import axiosInstance from './utils/axios';
import { AuthProvider } from '@/context/AuthContext';
import { PlaceProvider } from '@/context/PlaceContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getItemFromLocalStorage } from './utils';
import { CarProvider } from '@/context/CarContext';

// Lazy load pages for performance optimization (Code Splitting)
const IndexPage = lazy(() => import('./pages/IndexPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const PlacesPage = lazy(() => import('./pages/PlacesPage'));
const BookingsPage = lazy(() => import('./pages/BookingsPage'));
const PlacesFormPage = lazy(() => import('./pages/PlacesFormPage'));
const PlacePage = lazy(() => import('./pages/PlacePage'));
const SingleBookedPlace = lazy(() => import('./pages/SingleBookedPlace'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const HotelsPage = lazy(() => import('./pages/HotelsPage'));
const CarRentalsPage = lazy(() => import('./pages/CarRentalsPage'));
const CarsPage = lazy(() => import('./pages/CarsPage'));
const CarsFormPage = lazy(() => import('./pages/CarsFormPage'));
const CarPage = lazy(() => import('./pages/CarPage'));
const CarBookingsPage = lazy(() => import('./pages/CarBookingsPage'));
const SingleCarBooked = lazy(() => import('./pages/SingleCarBooked'));

function App() {
  useEffect(() => {
    // set the token on refreshing the website
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${getItemFromLocalStorage('token')}`;
  }, []);

  // Professional Skeleton Loader for Suspense Fallback
  const PageLoader = () => (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50/50">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <PlaceProvider>
          <CarProvider>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<IndexPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/account" element={<ProfilePage />} />
                  <Route path="/account/places" element={<PlacesPage />} />
                  <Route path="/account/places/:id" element={<PlacesFormPage />} />
                  <Route path="/place/:id" element={<PlacePage />} />
                  <Route path="/account/bookings" element={<BookingsPage />} />
                  <Route
                    path="/account/bookings/:id"
                    element={<SingleBookedPlace />}
                  />
                  <Route path="/hotels" element={<HotelsPage />} />
                  <Route path="/car-rentals" element={<CarRentalsPage />} />
                  <Route path="/account/cars" element={<CarsPage />} />
                  <Route path="/account/cars/:id" element={<CarsFormPage />} />
                  <Route path="/car/:id" element={<CarPage />} />
                  <Route path="/account/car-bookings" element={<CarBookingsPage />} />
                  <Route path="/account/car-bookings/:id" element={<SingleCarBooked />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
            <ToastContainer autoClose={2000} transition={Slide} />
          </CarProvider>
        </PlaceProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
