import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '@/utils/axios';
import AccountNav from '@/components/ui/AccountNav';
import InfoCard from '@/components/ui/InfoCard';
import Spinner from '@/components/ui/Spinner';
import { toast } from 'react-toastify';
import { Plus, Home } from 'lucide-react';

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlaces();
  }, []);

  const getPlaces = async () => {
    try {
      const { data } = await axiosInstance.get('places/user-places');
      setPlaces(data);
      setLoading(false);
    } catch (error) {

      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      await axiosInstance.delete(`/places/${id}`);
      setPlaces(places.filter((p) => p._id !== id));
      toast.success('Property deleted successfully');
    } catch (error) {

      toast.error('Failed to delete property');
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
           <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-1">My Hosted Stays</h1>
           <p className="text-gray-500 text-xs font-medium">Manage your properties and active hotel listings.</p>
        </div>
        <Link
          className="inline-flex items-center gap-2 rounded-xl bg-gray-900 py-3 px-6 text-white text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 transition-all shadow-lg"
          to={'/account/places/new'}
        >
          <Plus className="h-4 w-4" />
          Add New Property
        </Link>
      </div>

      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {places.length > 0 ? (
          places.map((place) => <InfoCard place={place} key={place._id} onDelete={handleDelete} />)
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-4xl mb-4 opacity-20">🏨</div>
            <h3 className="text-lg font-black text-gray-900">No properties hosted yet</h3>
            <p className="text-gray-400 text-xs font-medium mb-8">Ready to welcome guests? List your space on YatriHub.</p>
            <Link to="/account/places/new" className="bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-rose-500 transition-all shadow-lg">
              Start Hosting
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesPage;
