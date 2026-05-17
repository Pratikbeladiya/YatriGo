import React, { useEffect, useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '@/utils/axios';
import AccountNav from '@/components/ui/AccountNav';
import CarFeatures from '@/components/ui/CarFeatures';
import PhotosUploader from '@/components/ui/PhotosUploader';
import Spinner from '@/components/ui/Spinner';
import { ArrowLeft, Save, Sparkles, MapPin, Info, Tag, Wallet, Car, ShieldCheck } from 'lucide-react';

const CarsFormPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);

  const [formData, setFormData] = useState({
    carName: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    fuelType: 'Petrol',
    transmission: 'Manual',
    seatingCapacity: 4,
    price: 1000,
    location: '',
    city: '',
    state: '',
    description: '',
    features: [],
    hostName: '',
    hostContact: '',
    hostEmail: '',
    pickupAvailability: true,
    insuranceIncluded: false,
    availabilityStatus: true,
  });

  const {
    carName,
    brand,
    model,
    year,
    fuelType,
    transmission,
    seatingCapacity,
    price,
    location,
    description,
    features,
    hostName,
    hostContact,
    hostEmail,
    pickupAvailability,
    insuranceIncluded,
    availabilityStatus
  } = formData;

  const isValidCarData = () => {
    if (!carName.trim()) { toast.error("Car Name is required"); return false; }
    if (!brand.trim()) { toast.error("Brand is required"); return false; }
    if (!location.trim()) { toast.error("Location is required"); return false; }
    if (addedPhotos.length < 1) { toast.error('Upload at least 1 photo'); return false; }
    if (!description.trim()) { toast.error("Description is required"); return false; }
    if (price < 1) { toast.error('Price must be valid'); return false; }
    return true;
  };

  const handleFormData = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && (name === 'pickupAvailability' || name === 'insuranceIncluded' || name === 'availabilityStatus')) {
      setFormData({ ...formData, [name]: checked });
      return;
    }
    if (type === 'checkbox') {
      const currentFeatures = [...features];
      let updatedFeatures = currentFeatures.includes(name)
        ? currentFeatures.filter((f) => f !== name)
        : [...currentFeatures, name];
      setFormData({ ...formData, features: updatedFeatures });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (!id || id === 'new') return;
    setLoading(true);
    axiosInstance.get(`/cars/${id}`)
      .then((response) => {
        const { car } = response.data;
        for (let key in formData) {
          if (car.hasOwnProperty(key)) {
            setFormData((prev) => ({ ...prev, [key]: car[key] }));
          }
        }
        if(car.photos) setAddedPhotos([...car.photos]);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const saveCar = async (e) => {
    e.preventDefault();
    if (!isValidCarData()) return;
    const carData = { ...formData, addedPhotos };
    try {
      if (id && id !== 'new') {
        await axiosInstance.put('/cars/update-car', { id, ...carData });
        toast.success('Vehicle updated');
      } else {
        await axiosInstance.post('/cars', carData);
        toast.success('Vehicle listed successfully');
      }
      setRedirect(true);
    } catch (err) {
      toast.error('Failed to save vehicle');
    }
  };

  if (redirect) return <Navigate to={'/account/cars'} />;
  if (loading) return <Spinner />;

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 font-sans">
      <AccountNav />
      
      <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
           <Link to="/account/cars" className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-blue-500 transition-colors mb-2">
              <ArrowLeft className="w-3 h-3" /> Back to Fleet
           </Link>
           <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-1">{(id && id !== 'new') ? 'Refine Vehicle' : 'Host New Vehicle'}</h1>
           <p className="text-gray-500 text-xs font-medium">List your automobile on the YatriHub elite network.</p>
        </div>
      </div>

      <form onSubmit={saveCar} className="space-y-6">
        {/* Vehicle Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
           <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
              <Car className="w-4 h-4 text-blue-500" />
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Vehicle Details</h2>
           </div>
           
           <div className="grid md:grid-cols-3 gap-6">
              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Car Name</label>
                 <input type="text" name="carName" value={carName} onChange={handleFormData} placeholder="E.g., Tesla Model 3" className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:border-blue-500 focus:outline-none transition-all text-xs font-bold text-gray-700" />
              </div>
              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Brand</label>
                 <input type="text" name="brand" value={brand} onChange={handleFormData} placeholder="E.g., Tesla" className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:border-blue-500 focus:outline-none transition-all text-xs font-bold text-gray-700" />
              </div>
              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Model</label>
                 <input type="text" name="model" value={model} onChange={handleFormData} placeholder="E.g., Performance" className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:border-blue-500 focus:outline-none transition-all text-xs font-bold text-gray-700" />
              </div>
           </div>

           <div className="grid md:grid-cols-4 gap-6 mt-6">
              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Year</label>
                 <input type="number" name="year" value={year} onChange={handleFormData} className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:border-blue-500 focus:outline-none transition-all text-xs font-bold text-gray-700" />
              </div>
              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Fuel Identity</label>
                 <select name="fuelType" value={fuelType} onChange={handleFormData} className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:border-blue-500 focus:outline-none transition-all text-xs font-bold text-gray-700 appearance-none bg-white">
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="EV">EV</option>
                    <option value="Hybrid">Hybrid</option>
                 </select>
              </div>
              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Transmission</label>
                 <select name="transmission" value={transmission} onChange={handleFormData} className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:border-blue-500 focus:outline-none transition-all text-xs font-bold text-gray-700 appearance-none bg-white">
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                 </select>
              </div>
              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Seating</label>
                 <input type="number" name="seatingCapacity" value={seatingCapacity} onChange={handleFormData} className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:border-blue-500 focus:outline-none transition-all text-xs font-bold text-gray-700" />
              </div>
           </div>
        </div>

        {/* Media & Visuals */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
           <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Visual Identity</h2>
           </div>
           <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
        </div>

        {/* Location & Experience */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
           <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
              <MapPin className="w-4 h-4 text-rose-500" />
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Location & Hub</h2>
           </div>
           
           <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Pickup Location</label>
                    <input type="text" name="location" value={location} onChange={handleFormData} placeholder="E.g., Colaba, Mumbai" className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:border-blue-500 focus:outline-none transition-all text-xs font-bold text-gray-700" />
                 </div>
                 <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">City Hub</label>
                    <input type="text" name="city" value={formData.city} onChange={handleFormData} placeholder="Mumbai" className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:border-blue-500 focus:outline-none transition-all text-xs font-bold text-gray-700" />
                 </div>
              </div>

              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Vehicle Description</label>
                 <textarea name="description" value={description} onChange={handleFormData} placeholder="Describe the performance, maintenance, and driving experience..." className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-4 px-5 focus:border-blue-500 focus:outline-none transition-all text-xs font-medium text-gray-600 min-h-[120px]" />
              </div>

              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Included Features</label>
                 <CarFeatures selected={features} handleFormData={handleFormData} />
              </div>
           </div>
        </div>

        {/* Policies & Status */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
           <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Policies & Availability</h2>
           </div>
           
           <div className="grid md:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100/50">
                 <input type="checkbox" name="pickupAvailability" checked={pickupAvailability} onChange={handleFormData} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                 <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Pickup Available</span>
              </label>
              <label className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100/50">
                 <input type="checkbox" name="insuranceIncluded" checked={insuranceIncluded} onChange={handleFormData} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                 <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Insurance Cover</span>
              </label>
              <label className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100/50">
                 <input type="checkbox" name="availabilityStatus" checked={availabilityStatus} onChange={handleFormData} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                 <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Currently Active</span>
              </label>
           </div>
        </div>

        {/* Pricing & Host Contact */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
           <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
              <Wallet className="w-4 h-4 text-emerald-500" />
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Pricing & Contact</h2>
           </div>
           
           <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100/50">
                 <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-black text-blue-500">₹</span>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Daily Rental Rate</span>
                 </div>
                 <input type="number" name="price" value={price} onChange={handleFormData} className="w-full bg-white border border-gray-100 rounded-lg py-3 px-4 focus:border-blue-500 focus:outline-none transition-all text-lg font-black text-gray-900" />
              </div>
              <div className="space-y-4">
                 <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Host Contact</label>
                    <input type="text" name="hostContact" value={hostContact} onChange={handleFormData} placeholder="+91 0000 0000 00" className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-2 px-4 focus:border-blue-500 focus:outline-none transition-all text-xs font-bold" />
                 </div>
                 <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Host Name</label>
                    <input type="text" name="hostName" value={hostName} onChange={handleFormData} placeholder="Full Name" className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-2 px-4 focus:border-blue-500 focus:outline-none transition-all text-xs font-bold" />
                 </div>
              </div>
           </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-6">
           <Link to="/account/cars" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors">Discard Changes</Link>
           <button className="bg-gray-900 hover:bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest py-4 px-12 rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-2">
              <Save className="w-3.5 h-3.5" />
              {(id && id !== 'new') ? 'Update Vehicle' : 'Publish Listing'}
           </button>
        </div>
      </form>
    </div>
  );
};

export default CarsFormPage;
