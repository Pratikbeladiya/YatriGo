import React, { useEffect, useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '@/utils/axios';
import AccountNav from '@/components/ui/AccountNav';
import CarFeatures from '@/components/ui/CarFeatures';
import PhotosUploader from '@/components/ui/PhotosUploader';
import Spinner from '@/components/ui/Spinner';
import { ArrowLeft, Save, ImagePlus, MapPin, Car, ShieldCheck, Wallet } from 'lucide-react';

/* ── Reusable Field Label ─────────────────────────────────────── */
const FieldLabel = ({ children, className = '' }) => (
  <label className={`block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ${className}`}>
    {children}
  </label>
);

/* ── Input style shorthand ─────────────────────────────────────── */
const inputCls =
  'w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 transition-all';

/* ── Section Card ─────────────────────────────────────────────── */
const SectionCard = ({ icon, title, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-8 py-5 border-b border-gray-50">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 border border-gray-100">
        {icon}
      </div>
      <h2 className="font-display text-base font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="p-8">{children}</div>
  </div>
);

const CarsFormPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
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
    carName, brand, model, year, fuelType, transmission,
    seatingCapacity, price, location, description, features,
    hostName, hostContact, hostEmail, pickupAvailability, insuranceIncluded, availabilityStatus,
  } = formData;

  const isValidCarData = () => {
    if (!carName.trim()) { toast.error('Car Name is required'); return false; }
    if (!brand.trim()) { toast.error('Brand is required'); return false; }
    if (!location.trim()) { toast.error('Location is required'); return false; }
    if (addedPhotos.length < 1) { toast.error('Upload at least 1 photo'); return false; }
    if (!description.trim()) { toast.error('Description is required'); return false; }
    if (price < 1) { toast.error('Price must be valid'); return false; }
    return true;
  };

  const handleFormData = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && ['pickupAvailability', 'insuranceIncluded', 'availabilityStatus'].includes(name)) {
      setFormData({ ...formData, [name]: checked });
      return;
    }
    if (type === 'checkbox') {
      const current = [...features];
      const updated = current.includes(name)
        ? current.filter((f) => f !== name)
        : [...current, name];
      setFormData({ ...formData, features: updated });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (!id || id === 'new') return;
    setLoading(true);
    axiosInstance.get(`/cars/${id}`)
      .then(({ data }) => {
        const { car } = data;
        setFormData(prev => {
          const newData = { ...prev };
          for (let key in newData) {
            if (car[key] !== undefined) newData[key] = car[key];
          }
          return newData;
        });
        if (car.photos) setAddedPhotos([...car.photos]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const saveCar = async (e) => {
    e.preventDefault();
    if (!isValidCarData()) return;
    setSaving(true);
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
    } finally {
      setSaving(false);
    }
  };

  if (redirect) return <Navigate to={'/account/cars'} />;
  if (loading) return <Spinner />;

  const isEditing = id && id !== 'new';

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24">
      <AccountNav />

      {/* Page Header */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Link
          to="/account/cars"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Fleet
        </Link>
        <h1 className="font-display text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Vehicle' : 'List a Vehicle'}
        </h1>
        <p className="text-sm text-gray-500 mt-1 font-normal">
          {isEditing ? 'Update your vehicle details.' : 'Add your car to the YatriGo fleet.'}
        </p>
      </div>

      <form onSubmit={saveCar} className="space-y-5">
        {/* ── Section 1: Vehicle Details ── */}
        <SectionCard icon={<Car className="w-4 h-4 text-blue-500" />} title="Vehicle Details">
          <div className="space-y-5">
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <FieldLabel>Car Name</FieldLabel>
                <input type="text" name="carName" value={carName} onChange={handleFormData}
                  placeholder="Tesla Model 3" className={inputCls} />
              </div>
              <div>
                <FieldLabel>Brand</FieldLabel>
                <input type="text" name="brand" value={brand} onChange={handleFormData}
                  placeholder="Tesla" className={inputCls} />
              </div>
              <div>
                <FieldLabel>Model</FieldLabel>
                <input type="text" name="model" value={model} onChange={handleFormData}
                  placeholder="Performance" className={inputCls} />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-5">
              <div>
                <FieldLabel>Year</FieldLabel>
                <input type="number" name="year" value={year} onChange={handleFormData} className={inputCls} />
              </div>
              <div>
                <FieldLabel>Fuel Type</FieldLabel>
                <select name="fuelType" value={fuelType} onChange={handleFormData} className={inputCls + ' cursor-pointer'}>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="EV">EV</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <FieldLabel>Transmission</FieldLabel>
                <select name="transmission" value={transmission} onChange={handleFormData} className={inputCls + ' cursor-pointer'}>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
              <div>
                <FieldLabel>Seats</FieldLabel>
                <input type="number" name="seatingCapacity" value={seatingCapacity} onChange={handleFormData} className={inputCls} />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ── Section 2: Photos ── */}
        <SectionCard icon={<ImagePlus className="w-4 h-4 text-amber-500" />} title="Vehicle Photos">
          <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
        </SectionCard>

        {/* ── Section 3: Location & Description ── */}
        <SectionCard icon={<MapPin className="w-4 h-4 text-rose-500" />} title="Location & Description">
          <div className="space-y-5">
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <FieldLabel>Pickup Location</FieldLabel>
                <input type="text" name="location" value={location} onChange={handleFormData}
                  placeholder="Colaba, Mumbai" className={inputCls} />
              </div>
              <div>
                <FieldLabel>City</FieldLabel>
                <input type="text" name="city" value={formData.city} onChange={handleFormData}
                  placeholder="Mumbai" className={inputCls} />
              </div>
              <div>
                <FieldLabel>State</FieldLabel>
                <input type="text" name="state" value={formData.state} onChange={handleFormData}
                  placeholder="Maharashtra" className={inputCls} />
              </div>
            </div>

            <div>
              <FieldLabel>Vehicle Description</FieldLabel>
              <textarea name="description" value={description} onChange={handleFormData}
                placeholder="Describe the driving experience, condition, and included extras..."
                className={inputCls + ' min-h-[120px] resize-y'} />
            </div>

            <div>
              <FieldLabel>Included Features</FieldLabel>
              <CarFeatures selected={features} handleFormData={handleFormData} />
            </div>
          </div>
        </SectionCard>

        {/* ── Section 4: Policies & Status ── */}
        <SectionCard icon={<ShieldCheck className="w-4 h-4 text-emerald-500" />} title="Policies & Availability">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: 'pickupAvailability', label: 'Pickup Available', checked: pickupAvailability },
              { name: 'insuranceIncluded', label: 'Insurance Included', checked: insuranceIncluded },
              { name: 'availabilityStatus', label: 'Currently Active', checked: availabilityStatus },
            ].map(({ name, label, checked }) => (
              <label key={name} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name={name}
                  checked={checked}
                  onChange={handleFormData}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </SectionCard>

        {/* ── Section 5: Pricing & Host Contact ── */}
        <SectionCard icon={<Wallet className="w-4 h-4 text-emerald-500" />} title="Pricing & Host Contact">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base font-bold text-blue-500">₹</span>
                <FieldLabel>Daily Rental Rate</FieldLabel>
              </div>
              <input type="number" name="price" value={price} onChange={handleFormData}
                className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-xl font-bold text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 transition-all" />
            </div>

            {/* Host Contact */}
            <div className="space-y-4">
              <div>
                <FieldLabel>Host Name</FieldLabel>
                <input type="text" name="hostName" value={hostName} onChange={handleFormData}
                  placeholder="Full Name" className={inputCls} />
              </div>
              <div>
                <FieldLabel>Host Contact</FieldLabel>
                <input type="tel" name="hostContact" value={hostContact} onChange={handleFormData}
                  placeholder="+91 00000 00000" className={inputCls} />
              </div>
              <div>
                <FieldLabel>Host Email</FieldLabel>
                <input type="email" name="hostEmail" value={hostEmail} onChange={handleFormData}
                  placeholder="host@example.com" className={inputCls} />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ── Actions ── */}
        <div className="flex items-center justify-between gap-4 pt-2 pb-4">
          <Link to="/account/cars" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Discard
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-gray-900 hover:bg-blue-600 text-white text-sm font-semibold py-3.5 px-10 rounded-xl shadow-md transition-all duration-200 active:scale-[0.98] disabled:opacity-60"
          >
            {saving ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <><Save className="w-4 h-4" /> {isEditing ? 'Update Vehicle' : 'Publish Listing'}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarsFormPage;
