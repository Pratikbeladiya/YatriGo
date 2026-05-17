import React, { useEffect, useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '@/utils/axios';
import AccountNav from '@/components/ui/AccountNav';
import Perks from '@/components/ui/Perks';
import PhotosUploader from '@/components/ui/PhotosUploader';
import Spinner from '@/components/ui/Spinner';
import { ArrowLeft, Save, Sparkles, MapPin, Info, Tag, Users, Wallet } from 'lucide-react';

const PlacesFormPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    category: 'Hotel',
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuests: 10,
    price: 500,
  });

  const {
    title,
    address,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = formData;

  const isValidPlaceData = () => {
    if (title.trim() === '') {
      toast.error("Title is required");
      return false;
    } else if (address.trim() === '') {
      toast.error("Address is required");
      return false;
    } else if (addedPhotos.length < 5) {
      toast.error('Upload at least 5 high-quality photos');
      return false;
    } else if (description.trim() === '') {
      toast.error("Description is required");
      return false;
    } else if (maxGuests < 1) {
      toast.error('Capacity must be at least 1 guest');
      return false;
    }
    return true;
  };

  const handleFormData = (e) => {
    const { name, value, type } = e.target;
    if (type !== 'checkbox') {
      setFormData({ ...formData, [name]: value });
      return;
    }
    if (type === 'checkbox') {
      const currentPerks = [...perks];
      let updatedPerks = [];
      if (currentPerks.includes(name)) {
        updatedPerks = currentPerks.filter((perk) => perk !== name);
      } else {
        updatedPerks = [...currentPerks, name];
      }
      setFormData({ ...formData, perks: updatedPerks });
    }
  };

  useEffect(() => {
    if (!id || id === 'new') return;
    setLoading(true);
    axiosInstance.get(`/places/${id}`).then((response) => {
      const { place } = response.data;
      for (let key in formData) {
        if (place.hasOwnProperty(key)) {
          setFormData((prev) => ({ ...prev, [key]: place[key] }));
        }
      }
      setAddedPhotos([...place.photos]);
      setLoading(false);
    });
  }, [id]);

  const savePlace = async (e) => {
    e.preventDefault();
    if (!isValidPlaceData()) return;
    const placeData = { ...formData, addedPhotos };
    try {
      if (id && id !== 'new') {
        await axiosInstance.put('/places/update-place', { id, ...placeData });
        toast.success('Property updated');
      } else {
        await axiosInstance.post('/places/add-places', placeData);
        toast.success('Property listed successfully');
      }
      setRedirect(true);
    } catch (err) {
      toast.error('Failed to save property');
    }
  };

  if (redirect) return <Navigate to={'/account/places'} />;
  if (loading) return <Spinner />;

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 font-sans">
      <AccountNav />
      
      <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
           <Link to="/account/places" className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-rose-500 transition-colors mb-2">
              <ArrowLeft className="w-3 h-3" /> Back to Listings
           </Link>
           <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-1">{(id && id !== 'new') ? 'Refine Listing' : 'Host New Property'}</h1>
           <p className="text-gray-500 text-xs font-medium">Share your space with the YatriHub community.</p>
        </div>
      </div>

      <form onSubmit={savePlace} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
           <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
              <Info className="w-4 h-4 text-rose-500" />
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Basic Information</h2>
           </div>
           
           <div className="space-y-6">
              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Property Title</label>
                 <input
                   type="text"
                   name="title"
                   value={title}
                   onChange={handleFormData}
                   placeholder="E.g., Sunset View Boutique Villa"
                   className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:border-rose-500 focus:outline-none transition-all text-xs font-bold text-gray-700"
                 />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={address}
                      onChange={handleFormData}
                      placeholder="Street, area, landmarks..."
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:border-rose-500 focus:outline-none transition-all text-xs font-bold text-gray-700"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">City</label>
                       <input
                         type="text"
                         name="city"
                         value={formData.city}
                         onChange={handleFormData}
                         placeholder="City"
                         className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:border-rose-500 focus:outline-none transition-all text-xs font-bold text-gray-700"
                       />
                    </div>
                    <div>
                       <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Category</label>
                       <select
                         name="category"
                         value={formData.category}
                         onChange={handleFormData}
                         className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:border-rose-500 focus:outline-none transition-all text-xs font-bold text-gray-700 appearance-none cursor-pointer"
                       >
                         <option value="Hotel">Hotel</option>
                         <option value="Resort">Resort</option>
                         <option value="Villa">Villa</option>
                         <option value="Apartment">Apartment</option>
                         <option value="Homestay">Homestay</option>
                       </select>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Media & Visuals */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
           <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Visual Identity</h2>
           </div>
           <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
        </div>

        {/* Experience Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
           <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
              <Tag className="w-4 h-4 text-blue-500" />
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Experience & Amenities</h2>
           </div>
           
           <div className="space-y-8">
              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Description</label>
                 <textarea
                   value={description}
                   name="description"
                   onChange={handleFormData}
                   placeholder="Describe the unique experience your place offers..."
                   className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-4 px-5 focus:border-rose-500 focus:outline-none transition-all text-xs font-medium text-gray-600 min-h-[120px]"
                 />
              </div>

              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Select Included Amenities</label>
                 <Perks selected={perks} handleFormData={handleFormData} />
              </div>

              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Extra Rules / Check-in Info</label>
                 <textarea
                   value={extraInfo}
                   name="extraInfo"
                   onChange={handleFormData}
                   placeholder="Rules, check-in instructions, parking, etc."
                   className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-4 px-5 focus:border-rose-500 focus:outline-none transition-all text-xs font-medium text-gray-600 min-h-[80px]"
                 />
              </div>
           </div>
        </div>

        {/* Capacity & Pricing */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
           <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
              <Wallet className="w-4 h-4 text-emerald-500" />
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Pricing & Capacity</h2>
           </div>
           
           <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100/50">
                 <div className="flex items-center gap-2 mb-4">
                    <Users className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Max Capacity</span>
                 </div>
                 <input
                   type="number"
                   name="maxGuests"
                   value={maxGuests}
                   onChange={handleFormData}
                   className="w-full bg-white border border-gray-100 rounded-lg py-3 px-4 focus:border-rose-500 focus:outline-none transition-all text-lg font-black text-gray-900"
                 />
              </div>
              
              <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100/50">
                 <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-black text-emerald-500">₹</span>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Price per Night</span>
                 </div>
                 <input
                   type="number"
                   name="price"
                   value={price}
                   onChange={handleFormData}
                   className="w-full bg-white border border-gray-100 rounded-lg py-3 px-4 focus:border-rose-500 focus:outline-none transition-all text-lg font-black text-gray-900"
                 />
              </div>
           </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-6">
           <Link to="/account/places" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors">Discard Changes</Link>
           <button className="bg-gray-900 hover:bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest py-4 px-12 rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-2">
              <Save className="w-3.5 h-3.5" />
              {(id && id !== 'new') ? 'Update Property' : 'Publish Listing'}
           </button>
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
