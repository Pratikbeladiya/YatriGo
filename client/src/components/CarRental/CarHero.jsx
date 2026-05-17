import React, { useState } from 'react';
import { Search, MapPin, Calendar, Settings, Star, SlidersHorizontal, X } from 'lucide-react';
import { useCars } from '../../../hooks';
import { Link } from 'react-router-dom';
import { differenceInDays, format } from 'date-fns';

const CarHero = () => {
  const { cars, searchCars, getCars, loading } = useCars();
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropDate, setDropDate] = useState('');
  const [driverAge, setDriverAge] = useState(25);
  const [differentDrop, setDifferentDrop] = useState(false);
  const [dropLocation, setDropLocation] = useState('');
  const [searched, setSearched] = useState(false);
  const [showAllCars, setShowAllCars] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Filters
  const [fuelType, setFuelType] = useState('All');
  const [transmission, setTransmission] = useState('All');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);

  const days = pickupDate && dropDate
    ? Math.max(1, differenceInDays(new Date(dropDate), new Date(pickupDate)))
    : 0;

  const handleSearch = async (loc = location) => {
    setSearched(true);
    await searchCars(loc, {
      fuelType: fuelType !== 'All' ? fuelType : undefined,
      transmission: transmission !== 'All' ? transmission : undefined,
      brand,
      minPrice,
      maxPrice,
      ratings: minRating > 0 ? minRating : undefined,
    });
    setTimeout(() => {
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }, 100);
  };

  const handleClear = () => {
    setSearched(false);
    setLocation('');
    setFuelType('All');
    setTransmission('All');
    setBrand('');
    setMinPrice('');
    setMaxPrice('');
    setMinRating(0);
    setShowAllCars(false);
    getCars();
  };

  const displayedCars = showAllCars ? cars : cars.slice(0, 8);

  return (
    <div className="bg-gray-50/30">
      {/* Hero */}
      <div className="relative min-h-[350px] w-full overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
          className="h-full w-full absolute inset-0 object-cover brightness-50"
          alt="Car Rental Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
        
        <div className="relative z-10 w-full max-w-6xl px-4 text-center">
          <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                Become a <span className="text-rose-500">YatriGo</span> Host.
              </h2>
            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto font-medium">
              Explore thousands of luxury and adventure vehicles across India.
            </p>
          </div>

          {/* Professional Search Card */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {/* Top Bar */}
              <div className="hidden md:flex items-center justify-between px-6 py-2.5 bg-gray-50/80 border-b border-gray-100">
                <div className="flex items-center gap-6">
                   <label className="flex items-center gap-2 cursor-pointer group">
                      <div onClick={() => setDifferentDrop(v => !v)} className={`w-8 h-4 rounded-full transition-colors flex items-center px-0.5 ${differentDrop ? 'bg-blue-600' : 'bg-gray-300'}`}>
                        <div className={`w-3 h-3 bg-white rounded-full transition-transform ${differentDrop ? 'translate-x-4' : 'translate-x-0'}`} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-blue-600">Different Drop-off</span>
                   </label>
                   <div className="h-4 w-px bg-gray-200" />
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Driver Age</span>
                      <input type="number" value={driverAge} onChange={e => setDriverAge(e.target.value)} className="w-10 bg-transparent text-[10px] font-black text-blue-600 focus:outline-none" />
                   </div>
                </div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Insurance Included</span>
              </div>

              {/* Main Inputs */}
              <div className="flex flex-col md:flex-row gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                <div className="flex flex-[1.5] items-center gap-3 px-5 py-3 hover:bg-blue-50/30 transition-colors group">
                  <MapPin className="text-blue-500 h-4 w-4 flex-shrink-0" />
                  <div className="flex flex-col flex-1 min-w-0 text-left">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Pick-up Location</span>
                    <input
                      type="text"
                      placeholder="Where from?"
                      className="bg-transparent focus:outline-none text-xs font-bold text-gray-700 placeholder-gray-400 w-full"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                </div>

                {differentDrop && (
                  <div className="flex flex-1 items-center gap-3 px-5 py-3 hover:bg-blue-50/30 transition-colors group">
                    <MapPin className="text-rose-500 h-4 w-4 flex-shrink-0" />
                    <div className="flex flex-col flex-1 min-w-0 text-left">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Drop-off Location</span>
                      <input
                        type="text"
                        placeholder="Drop location?"
                        className="bg-transparent focus:outline-none text-xs font-bold text-gray-700 placeholder-gray-400 w-full"
                        value={dropLocation}
                        onChange={e => setDropLocation(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="flex-1 items-center gap-3 px-5 py-3 hover:bg-blue-50/30 transition-colors group flex">
                  <Calendar className="text-blue-500 h-4 w-4 flex-shrink-0" />
                  <div className="flex flex-col flex-1 text-left">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Dates</span>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={e => setPickupDate(e.target.value)}
                      className="bg-transparent focus:outline-none text-xs font-bold text-gray-700 w-full cursor-pointer"
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

      {/* Results Section */}
      <div className="mx-auto max-w-7xl px-4 mt-10 mb-20">
        {!searched ? (
          <div>
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">Available Vehicles</h2>
                  <p className="text-gray-500 text-xs font-medium">Verified cars across major hubs</p>
               </div>
               <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                  {cars.length} Fleet Total
               </div>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-64" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedCars.map(car => (
                  <Link key={car._id} to={`/car/${car._id}`} className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                    <div className="relative h-44 overflow-hidden">
                      <img src={car.photos?.[0] || 'https://via.placeholder.com/400x200'} alt={car.carName} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg shadow-lg">{car.fuelType}</div>
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 text-[10px] font-black text-blue-700 shadow-sm border border-white/20">
                        ₹{car.price.toLocaleString()}/day
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{car.transmission}</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase">{car.city}</span>
                      </div>
                      <h3 className="font-black text-gray-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">{car.brand} {car.carName}</h3>
                      <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">{car.model} · {car.seatingCapacity} Seats</p>
                      
                      <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
                         <span className="text-gray-400 text-[10px] font-medium flex items-center gap-1">
                           <MapPin className="w-2.5 h-2.5 text-rose-500" /> {car.city}
                         </span>
                         <span className="text-blue-600 font-black text-[10px] uppercase tracking-wider">Book →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!showAllCars && cars.length > 8 && (
              <div className="mt-10 text-center">
                <button 
                  onClick={() => setShowAllCars(true)}
                  className="bg-gray-900 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-lg"
                >
                  View All Vehicles
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Desktop Sidebar Filters */}
            <div className="hidden md:block w-60 flex-shrink-0">
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm sticky top-24">
                <h3 className="font-black text-gray-900 text-sm mb-5 pb-3 border-b">Filters</h3>
                
                <div className="mb-6">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Fuel Type</h4>
                  <div className="space-y-2.5">
                    {['All', 'Petrol', 'Diesel', 'Electric'].map(f => (
                      <label key={f} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="fuel"
                          checked={fuelType === f}
                          onChange={() => { setFuelType(f); handleSearch(); }}
                          className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`text-xs font-bold transition-colors ${fuelType === f ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'}`}>{f}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Transmission</h4>
                  <div className="flex gap-2">
                    {['All', 'Manual', 'Auto'].map(t => (
                      <button
                        key={t}
                        onClick={() => { setTransmission(t === 'Auto' ? 'Automatic' : t); handleSearch(); }}
                        className={`flex-1 py-1.5 text-[10px] font-black rounded-lg border transition ${transmission === (t === 'Auto' ? 'Automatic' : t) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-100 text-gray-600 hover:border-blue-500'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Budget / day</h4>
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
                    <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest">Filter Vehicles</h3>
                    <button 
                      onClick={() => setMobileFiltersOpen(false)}
                      className="p-2 rounded-2xl bg-gray-50 border border-gray-100 text-gray-400 hover:text-gray-900"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Fuel Type</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {['All', 'Petrol', 'Diesel', 'Electric'].map(f => (
                          <button
                            key={f}
                            onClick={() => { setFuelType(f); handleSearch(); }}
                            className={`py-2 px-4 rounded-xl border text-[11px] font-black transition ${fuelType === f ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 border-gray-100 text-gray-700'}`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Transmission</h4>
                      <div className="flex gap-2">
                        {['All', 'Manual', 'Automatic'].map(t => (
                          <button
                            key={t}
                            onClick={() => { setTransmission(t); handleSearch(); }}
                            className={`flex-1 py-3 rounded-xl border text-xs font-black transition ${transmission === t ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 border-gray-100 text-gray-700'}`}
                          >
                            {t === 'Automatic' ? 'Auto' : t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Budget Per Day (₹)</h4>
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
                  </div>
                </div>
              </div>
            )}

            {/* Results Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-black text-gray-900">{cars.length} Vehicles in {location || 'India'}</h2>
                <button onClick={handleClear} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Reset</button>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {[1, 2, 3, 4].map(i => <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-64" />)}
                </div>
              ) : (
                <div className="space-y-4">
                  {cars.length > 0 ? cars.map(car => (
                    <Link key={car._id} to={`/car/${car._id}`} className="bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col sm:flex-row hover:shadow-xl transition-all group">
                      <div className="sm:w-64 relative h-44 sm:h-auto">
                        <img src={car.photos?.[0] || 'https://via.placeholder.com/400x200'} alt={car.carName} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <span className="absolute top-3 left-3 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-lg">{car.fuelType}</span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                         <div>
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{car.transmission}</span>
                              <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Available</span>
                            </div>
                            <h3 className="font-black text-base text-gray-900 group-hover:text-blue-600 transition-colors">{car.brand} {car.carName}</h3>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-rose-500" /> {car.location}
                            </p>
                            <div className="mt-3 flex gap-2">
                               <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{car.seatingCapacity} Seats</span>
                               <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{car.model}</span>
                            </div>
                         </div>
                         <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-50">
                            <div>
                               <div className="flex items-center gap-1 mb-0.5">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs font-black text-gray-900">{car.ratings || '4.8'}</span>
                               </div>
                               <p className="text-[10px] text-gray-400 font-medium">Verified Vehicle</p>
                            </div>
                            <div className="text-right">
                               <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Per Day</div>
                               <div className="text-xl font-black text-gray-900">₹{car.price.toLocaleString()}</div>
                               <button className="mt-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-lg hover:bg-blue-700 transition">Rent Now</button>
                            </div>
                         </div>
                      </div>
                    </Link>
                  )) : (
                    <div className="p-16 text-center bg-white rounded-xl border border-gray-100">
                      <div className="text-4xl mb-4 opacity-20">🚗</div>
                      <h3 className="text-lg font-black text-gray-900 mb-1">No vehicles found</h3>
                      <p className="text-gray-400 text-sm mb-4 font-medium">Try different filters or location.</p>
                      <button onClick={handleClear} className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">Clear Search</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarHero;
