import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AccountNav from '@/components/ui/AccountNav';
import BookingDates from '@/components/ui/BookingDates';
import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';

const CarBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const { data } = await axiosInstance.get('/car-bookings');
        setBookings(data.booking);
        setLoading(false);
      } catch (error) {

        setLoading(false);
      }
    };
    getBookings();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AccountNav />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Car Rentals</h1>
        <p className="text-gray-500 text-sm mt-1">Track and manage your upcoming car rental reservations.</p>
      </div>

      <div className="grid gap-6">
        {bookings?.length > 0 ? (
          bookings.map((booking) => (
            <Link
              to={`/account/car-bookings/${booking._id}`}
              className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
              key={booking._id}
            >
              <div className="md:w-64 h-48 md:h-auto overflow-hidden">
                {booking?.car?.photos?.[0] ? (
                  <img src={booking.car.photos[0]} alt={booking.car.carName} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold">No Image</div>
                )}
              </div>
              
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h2 className="text-lg font-bold text-gray-900">{booking?.car?.brand} {booking?.car?.carName}</h2>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Reserved</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-rose-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {booking?.car?.location}
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-4 flex flex-wrap gap-6 items-center">
                    <BookingDates
                      booking={booking}
                      className="text-gray-700 font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    <span className="text-sm font-medium italic">Rental Agreement Active</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Total Price</p>
                    <p className="text-3xl font-black text-blue-600">₹{booking.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-24 bg-blue-50/50 rounded-[40px] border-2 border-dashed border-blue-100">
            <div className="text-6xl mb-6">🚗</div>
            <h3 className="text-2xl font-extrabold text-gray-800">No cars booked... yet!</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              Ready to hit the road? Discover the perfect ride for your next journey.
            </p>
            <Link to="/car-rentals" className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-500/30">
              Find a Car
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarBookingsPage;

