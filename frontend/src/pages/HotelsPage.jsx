import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Heart, ChevronRight, Star, TrendingUp, Award, SlidersHorizontal, X } from 'lucide-react';
import { usePlaces } from '@/hooks';
import { Link } from 'react-router-dom';
import Spinner from '@/components/ui/Spinner';
import { differenceInDays } from 'date-fns';

const HotelsPage = () => {
  const { places, loading, searchPlaces, getPlaces } = usePlaces();
  const [searchLocation, setSearchLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [isSearched, setIsSearched] = useState(false);
  const [showAllPlaces, setShowAllPlaces] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleSearch = async (loc = searchLocation) => {
    setIsSearched(true);
    await searchPlaces(loc, {
      category: category !== 'All' ? category : undefined,
      minPrice,
      maxPrice,
      ratings: minRating > 0 ? minRating : undefined,
      guests
    });
    setTimeout(() => {
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }, 100);
  };

  const handleCityClick = (city) => {
    setSearchLocation(city);
    handleSearch(city);
  };

  const handleClear = () => {
    setSearchLocation('');
    setCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setMinRating(0);
    setIsSearched(false);
    setShowAllPlaces(false);
    getPlaces();
  };

  const getCityCount = (cityName) => {
    return places.filter(p =>
      p.address?.toLowerCase().includes(cityName.toLowerCase()) ||
      p.title?.toLowerCase().includes(cityName.toLowerCase())
    ).length;
  };

  const trendingDestinations = [
    { name: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Jaipur', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Udaipur', img: 'https://images.unsplash.com/photo-1615836245337-f839dffdbac3?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Agra', img: 'https://images.unsplash.com/photo-1564507592208-028f8101bae2?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Shimla', img: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1000&auto=format&fit=crop' },
  ];

  const popularCities = [
    { name: 'Mumbai', img: 'https://images.unsplash.com/photo-1522789498260-d261e4b98ddc?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Delhi', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Bengaluru', img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Hyderabad', img: 'https://images.unsplash.com/photo-1588665799799-a3597b69c47e?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Chennai', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000&auto=format&fit=crop' },
  ];

  const bestPlaces = [
    { name: 'Kerala', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Manali', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Rishikesh', img: 'https://images.unsplash.com/photo-1605649487212-4d43b23ce40f?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Varanasi', img: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Darjeeling', img: 'https://images.unsplash.com/photo-1544070014-a91d2c679a61?q=80&w=1000&auto=format&fit=crop' },
  ];

  if (loading && places.length === 0) return <Spinner />;

  const displayedPlaces = showAllPlaces ? places : places.slice(0, 8);

  return (
    <div className="pt-20 pb-20 font-sans bg-gray-50/30">
      {/* ── PREMIUM HERO SEARCH SECTION ── */}
      <div className="relative min-h-[350px] w-full overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop"
          className="h-full w-full absolute inset-0 object-cover brightness-50 transition-all duration-1000"
          alt="Luxury Stay Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center w-full pt-8 pb-10">
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-3">
              Your Perfect <span className="text-blue-400 italic">Stay.</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto font-medium">
              Explore handpicked hotels, villas, and resorts in {searchLocation || 'India'}.
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="hidden md:flex items-center justify-between px-6 py-2.5 bg-gray-50/80 border-b border-gray-100">
                <div className="flex items-center gap-5">
                  {['All', 'Hotel', 'Resort', 'Villa', 'Apartment', 'Homestay'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={category === cat}
                        onChange={() => setCategory(cat)}
                        className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`text-[11px] font-black uppercase tracking-wider transition-colors ${category === cat ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`}>{cat === 'All' ? 'All Stays' : cat}</span>
                    </label>
                  ))}
                </div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Verified Properties Only</span>
              </div>

              <div className="flex flex-col md:flex-row gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                <div className="flex flex-[1.5] items-center gap-3 px-5 py-3 hover:bg-blue-50/30 transition-colors group">
                  <MapPin className="text-blue-500 h-4 w-4 flex-shrink-0" />
                  <div className="flex flex-col flex-1 min-w-0 text-left">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Destination</span>
                    <input
                      type="text"
                      placeholder="Where to?"
                      className="bg-transparent focus:outline-none text-xs font-bold text-gray-700 placeholder-gray-400 w-full"
                      value={searchLocation}
                      onChange={e => setSearchLocation(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                </div>

                <div className="flex-1 items-center gap-3 px-5 py-3 hover:bg-blue-50/30 transition-colors group flex">
                  <Calendar className="text-blue-500 h-4 w-4 flex-shrink-0" />
                  <div className="flex flex-col flex-1 text-left">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Dates</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="date"
                        value={checkIn}
                        onChange={e => setCheckIn(e.target.value)}
                        className="bg-transparent focus:outline-none text-xs font-bold text-gray-700 w-full cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 items-center gap-3 px-5 py-3 hover:bg-blue-50/30 transition-colors group flex">
                  <Users className="text-blue-500 h-4 w-4 flex-shrink-0" />
                  <div className="flex flex-col flex-1 text-left">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Travelers</span>
                    <input
                      type="number"
                      min={1}
                      value={guests}
                      onChange={e => setGuests(e.target.value)}
                      className="bg-transparent focus:outline-none text-xs font-bold text-gray-700 w-full"
                    />
                  </div>
                </div>

                <div className="p-2 flex items-center">
                  <button
                    onClick={() => handleSearch()}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 text-xs uppercase tracking-widest flex items-center gap-2"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 max-w-7xl mx-auto mt-10">
        {!isSearched ? (
          <>
            {/* CATEGORY EXPLORATION - ROW BY ROW */}
            <div className="flex flex-col gap-10 mb-16">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-rose-500" />
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">Trending Destinations</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {trendingDestinations.map(({ name, img }) => (
                    <div key={name} onClick={() => handleCityClick(name)} className="group cursor-pointer">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition">
                        <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 text-white">
                          <h3 className="font-black text-sm">{name}</h3>
                          <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest mt-0.5">Explore Deals</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">Popular Cities</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {popularCities.map(({ name, img }) => (
                    <div key={name} onClick={() => handleCityClick(name)} className="group cursor-pointer">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition">
                        <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 text-white">
                          <h3 className="font-black text-sm">{name}</h3>
                          <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest mt-0.5">Business & Leisure</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">Best in India</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {bestPlaces.map(({ name, img }) => (
                    <div key={name} onClick={() => handleCityClick(name)} className="group cursor-pointer">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition">
                        <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 text-white">
                          <h3 className="font-black text-sm">{name}</h3>
                          <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest mt-0.5">Top Experiences</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section className="mb-20">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">Top Rated Properties</h2>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Loved by our premium community</p>
                </div>
                <div className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md">
                  {places.length} Listings
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {displayedPlaces.map(place => (
                  <Link key={place._id} to={`/place/${place._id}`} className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <img src={place.photos?.[0] || 'https://via.placeholder.com/400'} alt={place.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg text-[9px] font-black text-gray-900 flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" /> {place.ratings || '4.8'}
                      </div>
                      <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-lg text-[10px] font-black">
                        ₹{place.price?.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 pr-2">{place.title}</h3>
                        <span className="text-[10px] font-bold text-gray-400 uppercase shrink-0">{place.city}</span>
                      </div>
                      <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mb-2 block">{place.category}</span>

                      <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3">
                        <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-rose-500" /> Location
                        </span>
                        <span className="text-blue-600 font-black text-[9px] uppercase tracking-widest">Details →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {!showAllPlaces && places.length > 8 && (
                <div className="mt-10 text-center">
                  <button
                    onClick={() => setShowAllPlaces(true)}
                    className="bg-gray-900 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-lg"
                  >
                    View All Properties
                  </button>
                </div>
              )}
            </section>
          </>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Desktop Sidebar Filters */}
            <div className="hidden md:block w-60 flex-shrink-0">
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm sticky top-24">
                <h3 className="font-black text-gray-900 text-sm mb-5 pb-3 border-b">Filters</h3>

                <div className="mb-6">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Type</h4>
                  <div className="space-y-2.5">
                    {['All', 'Hotel', 'Resort', 'Villa', 'Apartment', 'Homestay'].map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="sidebarCategory"
                          checked={category === cat}
                          onChange={() => { setCategory(cat); handleSearch(); }}
                          className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`text-xs font-bold transition-colors ${category === cat ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'}`}>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Budget (₹)</h4>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={e => setMinPrice(e.target.value)}
                      className="border border-gray-100 rounded-lg p-2 text-xs font-bold focus:ring-1 focus:ring-blue-500 outline-none w-full"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={e => setMaxPrice(e.target.value)}
                      className="border border-gray-100 rounded-lg p-2 text-xs font-bold focus:ring-1 focus:ring-blue-500 outline-none w-full"
                    />
                  </div>
                  <button onClick={() => handleSearch()} className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition hover:bg-blue-600 hover:text-white">Apply</button>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Rating</h4>
                  <div className="flex gap-1.5">
                    {[3, 4, 5].map(star => (
                      <button key={star} onClick={() => { setMinRating(star); handleSearch(); }}
                        className={`flex-1 py-1.5 rounded-lg border text-[10px] font-black transition ${minRating === star ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-100 text-gray-600 hover:border-blue-500'}`}
                      >
                        {star}+ ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Floating Filters Trigger */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden animate-bounce">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="bg-gray-900 text-white shadow-2xl rounded-full px-8 py-3.5 flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-blue-600 active:scale-95 transition-all"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>

            {/* Mobile Fullscreen Filter Drawer (Bottom Sheet) */}
            {mobileFiltersOpen && (
              <div 
                className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-end justify-center md:hidden"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <div 
                  className="bg-white w-full rounded-t-[2.5rem] p-6 space-y-6 max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-300"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest">Filter Stays</h3>
                    <button 
                      onClick={() => setMobileFiltersOpen(false)}
                      className="p-2 rounded-2xl bg-gray-50 border border-gray-100 text-gray-400 hover:text-gray-900"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Type of Stay</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {['All', 'Hotel', 'Resort', 'Villa', 'Apartment', 'Homestay'].map(cat => (
                          <button
                            key={cat}
                            onClick={() => { setCategory(cat); handleSearch(); }}
                            className={`py-2 px-4 rounded-xl border text-[11px] font-black transition ${category === cat ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 border-gray-100 text-gray-700'}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Budget Per Night (₹)</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          placeholder="Min"
                          value={minPrice}
                          onChange={e => setMinPrice(e.target.value)}
                          className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs font-bold focus:ring-1 focus:ring-blue-500 outline-none w-full"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={maxPrice}
                          onChange={e => setMaxPrice(e.target.value)}
                          className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs font-bold focus:ring-1 focus:ring-blue-500 outline-none w-full"
                        />
                      </div>
                      <button 
                        onClick={() => { handleSearch(); setMobileFiltersOpen(false); }}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest transition shadow-lg mt-3"
                      >
                        Apply Filters
                      </button>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Community Rating</h4>
                      <div className="flex gap-2">
                        {[3, 4, 5].map(star => (
                          <button 
                            key={star} 
                            onClick={() => { setMinRating(star); handleSearch(); }}
                            className={`flex-1 py-3 rounded-xl border text-xs font-black transition ${minRating === star ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 border-gray-100 text-gray-700'}`}
                          >
                            {star}+ ★
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-black text-gray-900">{places.length} Stays in {searchLocation || 'India'}</h2>
                <button onClick={handleClear} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Reset</button>
              </div>

              <div className="space-y-4">
                {places.length > 0 ? places.map(place => (
                  <Link key={place._id} to={`/place/${place._id}`} className="bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col sm:flex-row hover:shadow-xl transition-all group">
                    <div className="sm:w-64 relative h-44 sm:h-auto">
                      <img src={place.photos?.[0] || 'https://via.placeholder.com/400'} alt={place.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <button className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur rounded-full text-gray-400 hover:text-rose-500 shadow-sm">
                        <Heart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{place.category}</span>
                          <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Available</span>
                        </div>
                        <h3 className="font-black text-base text-gray-900 group-hover:text-blue-600 transition-colors">{place.title}</h3>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-500" /> {place.address}
                        </p>
                        <div className="mt-3 flex gap-2">
                          <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Free WiFi</span>
                          <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Breakfast</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-50">
                        <div>
                          <div className="flex items-center gap-1 mb-0.5">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-black text-gray-900">{place.ratings || '4.8'}</span>
                            <span className="text-[10px] text-gray-400 font-medium">(42 reviews)</span>
                          </div>
                          <p className="text-[10px] text-gray-400 font-medium">Verified Property</p>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Per Night</div>
                          <div className="text-xl font-black text-gray-900">₹{place.price?.toLocaleString()}</div>
                          <button className="mt-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-lg hover:bg-blue-700 transition">Book Now</button>
                        </div>
                      </div>
                    </div>
                  </Link>
                )) : (
                  <div className="p-16 text-center bg-white rounded-xl border border-gray-100">
                    <div className="text-4xl mb-4 opacity-20">🏝️</div>
                    <h3 className="text-lg font-black text-gray-900 mb-1">No stays found</h3>
                    <p className="text-gray-400 text-sm mb-4 font-medium">Try different filters or city name.</p>
                    <button onClick={handleClear} className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">Clear Search</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsPage;
