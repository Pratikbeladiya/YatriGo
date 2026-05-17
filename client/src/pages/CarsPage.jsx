import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '@/utils/axios';
import AccountNav from '@/components/ui/AccountNav';
import Spinner from '@/components/ui/Spinner';
import { toast } from 'react-toastify';
import { Plus, Trash2, MapPin, Star } from 'lucide-react';

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    try {
      const { data } = await axiosInstance.get('cars/user-cars');
      setCars(data);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    try {
      await axiosInstance.delete(`/cars/${id}`);
      setCars(cars.filter((car) => car._id !== id));
      toast.success('Car deleted successfully');
    } catch (error) {

      toast.error('Failed to delete car');
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 font-sans">
      <AccountNav />
      
      <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
           <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-1">My Vehicles</h1>
           <p className="text-gray-500 text-xs font-medium">Manage your fleet and monitor rental performance.</p>
        </div>
        <Link
          className="inline-flex items-center gap-2 rounded-xl bg-gray-900 py-3 px-6 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
          to={'/account/cars/new'}
        >
          <Plus className="h-4 w-4" />
          Add New Vehicle
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car._id} className="relative group">
              <Link to={`/account/cars/${car._id}`} className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col hover:shadow-xl transition-all h-full">
                {car.photos?.[0] && (
                  <div className="relative h-40 w-full overflow-hidden rounded-lg mb-3">
                    <img src={car.photos[0]} alt={car.carName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md shadow-sm">{car.brand}</div>
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-0.5">
                       <h2 className="text-sm font-black text-gray-900 tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">{car.carName}</h2>
                       <div className="flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-[10px] font-black text-gray-900">{car.ratings || '4.8'}</span>
                       </div>
                    </div>
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-3">{car.model} · {car.year}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="text-[10px] font-black text-gray-900 uppercase">
                       ₹{car.price.toLocaleString()} <span className="text-gray-400 font-bold">/ day</span>
                    </div>
                    <MapPin className="w-3 h-3 text-rose-500 opacity-40" />
                  </div>
                </div>
              </Link>
              <button
                onClick={(e) => handleDelete(e, car._id)}
                className="absolute top-5 right-5 p-2 bg-white/90 backdrop-blur-md text-rose-500 rounded-lg shadow-sm border border-gray-100 hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 active:scale-90"
                title="Delete Car"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-4xl mb-4 opacity-20">🚘</div>
            <h3 className="text-lg font-black text-gray-900">No vehicles listed yet</h3>
            <p className="text-gray-400 text-xs font-medium mb-8">Monetize your ride. Start hosting on YatriHub.</p>
            <Link to="/account/cars/new" className="bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-blue-600 transition-all shadow-lg">
              List Your Car
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarsPage;
