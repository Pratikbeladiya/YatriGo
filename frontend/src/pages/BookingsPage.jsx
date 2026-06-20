import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from '@/components/ui/AccountNav';
import PlaceImg from '@/components/ui/PlaceImg';
import BookingDates from '@/components/ui/BookingDates';
import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';
import { MapPin, ShieldCheck, ChevronRight, Calendar } from 'lucide-react';

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState('hotels');
  const [hotelBookings, setHotelBookings] = useState([]);
  const [carBookings, setCarBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotelRes = await axiosInstance.get('/bookings');
        const carRes = await axiosInstance.get('/car-bookings');
        setHotelBookings(hotelRes.data.booking);
        setCarBookings(carRes.data.booking); // Fix: The backend returns { booking, success: true }
        setLoading(false);
      } catch (error) {

        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner />;

  const currentBookings = activeTab === 'hotels' ? hotelBookings : carBookings;

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 font-sans">
      <AccountNav />
      
      <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
        <div>
           <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Your Itinerary</h1>
           <p className="text-gray-500 text-xs font-medium">Manage your active and past reservations.</p>
        </div>
        
        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
          <button 
            onClick={() => setActiveTab('hotels')}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'hotels' ? 'bg-white text-rose-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Hotels
          </button>
          <button 
            onClick={() => setActiveTab('cars')}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'cars' ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Rentals
          </button>
        </div>
      </div>

      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {currentBookings?.length > 0 ? (
          currentBookings.map((booking) => (
            <Link
              to={activeTab === 'hotels' ? `/account/bookings/${booking._id}` : `/account/car-bookings/${booking._id}`}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col sm:flex-row hover:shadow-xl transition-all group"
              key={booking._id}
            >
              <div className="sm:w-64 h-44 sm:h-auto overflow-hidden">
                {activeTab === 'hotels' ? (
                  booking?.place?.photos[0] ? (
                    <img src={booking.place.photos[0]} alt={booking.place.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="h-full w-full bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-300 uppercase">No Image</div>
                  )
                ) : (
                  booking?.car?.photos[0] ? (
                    <img src={booking.car.photos[0]} alt={booking.car.carName} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="h-full w-full bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-300 uppercase">No Image</div>
                  )
                )}
              </div>
              
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                   <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">{activeTab === 'hotels' ? 'Stay' : 'Car Rental'}</span>
                      <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Confirmed</span>
                   </div>
                   <h2 className="text-lg font-black text-gray-900 tracking-tight group-hover:text-rose-500 transition-colors">
                      {activeTab === 'hotels' ? booking?.place?.title : `${booking?.car?.brand} ${booking?.car?.carName}`}
                   </h2>
                   <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      {activeTab === 'hotels' ? booking?.place?.address : booking?.car?.location}
                   </p>
                   
                   <div className="mt-4 flex items-center gap-2">
                      <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 flex items-center gap-2">
                         <Calendar className="w-3 h-3 text-blue-500" />
                         <BookingDates booking={booking} className="text-[10px] font-black text-gray-700 uppercase" />
                      </div>
                   </div>
                </div>

                <div className="flex items-end justify-between mt-6 pt-4 border-t border-gray-50">
                   <div className="flex items-center gap-1.5 text-gray-400 text-[9px] font-black uppercase tracking-widest">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      Verified Reservation
                   </div>
                   <div className="text-right">
                      <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Total Amount</p>
                      <p className="text-xl font-black text-gray-900">₹{booking.price.toLocaleString()}</p>
                   </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-4xl mb-4 opacity-20">🧳</div>
            <h3 className="text-lg font-black text-gray-900">No bookings yet</h3>
            <p className="text-gray-400 text-xs font-medium mb-8">Start your journey with YatriHub today.</p>
            <Link to={activeTab === 'hotels' ? '/hotels' : '/car-rentals'} className="bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-rose-500 transition-all shadow-lg">
              Explore Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
