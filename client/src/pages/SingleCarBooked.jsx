import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AccountNav from '../components/ui/AccountNav';
import AddressLink from '../components/ui/AddressLink';
import BookingDates from '../components/ui/BookingDates';
import CarGallery from '../components/ui/CarGallery';
import Spinner from '../components/ui/Spinner';
import axiosInstance from '../utils/axios';
import { MapPin, ShieldCheck, ArrowLeft, Wallet, Calendar, Car } from 'lucide-react';

const SingleCarBooked = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(false);

  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/car-bookings');
      const filteredBooking = data.booking.find((booking) => booking._id === id);
      setBooking(filteredBooking);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 font-sans">
      <AccountNav />
      {booking?.car ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="mb-8">
              <Link to="/account/bookings" className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-blue-500 transition-colors mb-4">
                 <ArrowLeft className="w-3 h-3" /> All Reservations
              </Link>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight mb-2">{booking?.car?.brand} {booking?.car?.carName}</h1>
              <AddressLink className="block" placeAddress={booking.car?.location} />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
              <div className="lg:col-span-8">
                 <CarGallery car={booking?.car} />
              </div>
              <div className="lg:col-span-4">
                 <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/40 p-8 sticky top-24">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                       <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Rental Receipt</h2>
                       <Car className="w-5 h-5 text-blue-500" />
                    </div>
                    
                    <div className="space-y-6">
                       <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                             <Calendar className="w-3.5 h-3.5 text-blue-500" />
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rental Period</span>
                          </div>
                          <BookingDates booking={booking} className="text-xs font-black text-gray-700 uppercase" />
                       </div>

                       <div className="bg-gray-900 rounded-xl p-6 text-white">
                          <div className="flex items-center gap-2 mb-4 opacity-60">
                             <Wallet className="w-3.5 h-3.5" />
                             <span className="text-[10px] font-black uppercase tracking-widest">Total Investment</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                             <span className="text-3xl font-black italic">₹{booking?.price.toLocaleString()}</span>
                             <span className="text-[10px] font-bold opacity-40 uppercase">INR Full Fleet Access</span>
                          </div>
                       </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
                       <div className="flex items-center gap-3 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                          <ShieldCheck className="w-4 h-4" />
                          Premium Insurance Included
                       </div>
                       <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                          Your vehicle is ready for pickup. Please present your digital ID and booking receipt at the hub.
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      ) : (
        <div className="text-center py-20">
           <h2 className="text-xl font-black text-gray-900">Rental not found</h2>
           <Link to="/account/bookings" className="text-blue-500 font-black uppercase tracking-widest text-xs mt-4 hover:underline inline-block">Back to Bookings</Link>
        </div>
      )}
    </div>
  );
};

export default SingleCarBooked;
