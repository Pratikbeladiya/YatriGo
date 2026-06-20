import React, { useEffect, useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '@/utils/axios';
import AccountNav from '@/components/ui/AccountNav';
import Perks from '@/components/ui/Perks';
import PhotosUploader from '@/components/ui/PhotosUploader';
import Spinner from '@/components/ui/Spinner';
import { ArrowLeft, Save, ImagePlus, Tag, Users, Wallet, Clock, Info } from 'lucide-react';

/* ── Reusable Field Label ─────────────────────────────────────── */
const FieldLabel = ({ children }) => (
  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
    {children}
  </label>
);

/* ── Input style shorthand ─────────────────────────────────────── */
const inputCls =
  'w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/10 transition-all';

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

const PlacesFormPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
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

  const { title, address, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = formData;

  const isValidPlaceData = () => {
    if (title.trim() === '') { toast.error('Title is required'); return false; }
    if (address.trim() === '') { toast.error('Address is required'); return false; }
    if (addedPhotos.length < 5) { toast.error('Upload at least 5 photos'); return false; }
    if (description.trim() === '') { toast.error('Description is required'); return false; }
    if (checkIn.trim() === '') { toast.error('Check-in time is required'); return false; }
    if (checkOut.trim() === '') { toast.error('Check-out time is required'); return false; }
    if (maxGuests < 1) { toast.error('Capacity must be at least 1'); return false; }
    return true;
  };

  const handleFormData = (e) => {
    const { name, value, type } = e.target;
    if (type !== 'checkbox') {
      setFormData({ ...formData, [name]: value });
      return;
    }
    const currentPerks = [...perks];
    const updatedPerks = currentPerks.includes(name)
      ? currentPerks.filter((p) => p !== name)
      : [...currentPerks, name];
    setFormData({ ...formData, perks: updatedPerks });
  };

  useEffect(() => {
    if (!id || id === 'new') return;
    setLoading(true);
    axiosInstance.get(`/places/${id}`).then((response) => {
      const { place } = response.data;
      setFormData(prev => {
        const newData = { ...prev };
        for (let key in newData) {
          if (place[key] !== undefined) newData[key] = place[key];
        }
        return newData;
      });
      setAddedPhotos([...place.photos]);
      setLoading(false);
    });
  }, [id]);

  const savePlace = async (e) => {
    e.preventDefault();
    if (!isValidPlaceData()) return;
    setSaving(true);
    const placeData = { ...formData, addedPhotos };
    try {
      if (id && id !== 'new') {
        await axiosInstance.put('/places/update-place', { id, ...placeData });
        toast.success('Property updated successfully');
      } else {
        await axiosInstance.post('/places/add-places', placeData);
        toast.success('Property published successfully');
      }
      setRedirect(true);
    } catch (err) {
      toast.error('Failed to save property');
    } finally {
      setSaving(false);
    }
  };

  if (redirect) return <Navigate to={'/account/places'} />;
  if (loading) return <Spinner />;

  const isEditing = id && id !== 'new';

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24">
      <AccountNav />

      {/* Page Header */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Link
          to="/account/places"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Listings
        </Link>
        <h1 className="font-display text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Property' : 'List a Property'}
        </h1>
        <p className="text-sm text-gray-500 mt-1 font-normal">
          {isEditing ? 'Update your property details.' : 'Share your space and start earning.'}
        </p>
      </div>

      <form onSubmit={savePlace} className="space-y-5">
        {/* ── Section 1: Basic Info ── */}
        <SectionCard icon={<Info className="w-4 h-4 text-rose-500" />} title="Basic Information">
          <div className="space-y-5">
            <div>
              <FieldLabel>Property Title</FieldLabel>
              <input type="text" name="title" value={title} onChange={handleFormData}
                placeholder="E.g., Sunset View Boutique Villa" className={inputCls} />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <FieldLabel>Street Address</FieldLabel>
                <input type="text" name="address" value={address} onChange={handleFormData}
                  placeholder="Street, area, landmarks..." className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>City</FieldLabel>
                  <input type="text" name="city" value={formData.city} onChange={handleFormData}
                    placeholder="Mumbai" className={inputCls} />
                </div>
                <div>
                  <FieldLabel>Category</FieldLabel>
                  <select name="category" value={formData.category} onChange={handleFormData} className={inputCls + ' cursor-pointer'}>
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
        </SectionCard>

        {/* ── Section 2: Photos ── */}
        <SectionCard icon={<ImagePlus className="w-4 h-4 text-amber-500" />} title="Property Photos">
          <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
        </SectionCard>

        {/* ── Section 3: Details & Amenities ── */}
        <SectionCard icon={<Tag className="w-4 h-4 text-blue-500" />} title="Details & Amenities">
          <div className="space-y-6">
            <div>
              <FieldLabel>Property Description</FieldLabel>
              <textarea value={description} name="description" onChange={handleFormData}
                placeholder="Describe the unique experience your place offers..."
                className={inputCls + ' min-h-[130px] resize-y'} />
            </div>

            <div>
              <FieldLabel>Included Amenities</FieldLabel>
              <Perks selected={perks} handleFormData={handleFormData} />
            </div>

            <div>
              <FieldLabel>Extra Rules & Check-in Info</FieldLabel>
              <textarea value={extraInfo} name="extraInfo" onChange={handleFormData}
                placeholder="House rules, parking info, access instructions..."
                className={inputCls + ' min-h-[90px] resize-y'} />
            </div>
          </div>
        </SectionCard>

        {/* ── Section 4: Pricing & Times ── */}
        <SectionCard icon={<Wallet className="w-4 h-4 text-emerald-500" />} title="Pricing & Availability">
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Max Guests */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-blue-500" />
                <FieldLabel>Max Guests</FieldLabel>
              </div>
              <input type="number" name="maxGuests" value={maxGuests} onChange={handleFormData}
                className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-xl font-bold text-gray-900 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/10 transition-all" />
            </div>

            {/* Price per Night */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base font-bold text-emerald-500">₹</span>
                <FieldLabel>Price per Night</FieldLabel>
              </div>
              <input type="number" name="price" value={price} onChange={handleFormData}
                className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-xl font-bold text-gray-900 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/10 transition-all" />
            </div>

            {/* Check-In */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-indigo-500" />
                <FieldLabel>Check-In Time</FieldLabel>
              </div>
              <input type="text" name="checkIn" value={checkIn} onChange={handleFormData}
                placeholder="e.g. 14:00" className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-xl font-bold text-gray-900 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/10 transition-all" />
            </div>

            {/* Check-Out */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-orange-400" />
                <FieldLabel>Check-Out Time</FieldLabel>
              </div>
              <input type="text" name="checkOut" value={checkOut} onChange={handleFormData}
                placeholder="e.g. 11:00" className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-xl font-bold text-gray-900 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/10 transition-all" />
            </div>
          </div>
        </SectionCard>

        {/* ── Actions ── */}
        <div className="flex items-center justify-between gap-4 pt-2 pb-4">
          <Link to="/account/places" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Discard
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-gray-900 hover:bg-rose-500 text-white text-sm font-semibold py-3.5 px-10 rounded-xl shadow-md transition-all duration-200 active:scale-[0.98] disabled:opacity-60"
          >
            {saving ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <><Save className="w-4 h-4" /> {isEditing ? 'Update Property' : 'Publish Listing'}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
