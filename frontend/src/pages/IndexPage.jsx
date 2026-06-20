import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePlaces, useCars } from '@/hooks';
import { Search, MapPin, Calendar, Users, ChevronRight, Star, Heart, Sparkles, Car, Hotel } from 'lucide-react';

/* ── Premium Components ───────────────────────────────── */

const SectionHeader = ({ title, subtitle, badge }) => (
  <div className="mb-8">
    {badge && (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-rose-600 mb-2">
        <Sparkles className="h-3 w-3" /> {badge}
      </span>
    )}
    <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-tight">
      {title}
    </h2>
    <p className="mt-1 text-gray-500 text-xs font-medium">{subtitle}</p>
  </div>
);

const DiscoverCard = ({ name, img, count, label }) => (
  <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
    <img src={img} alt={name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    <div className="absolute bottom-4 left-4 text-white">
      <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/70 mb-1 block">{label}</span>
      <h3 className="text-sm font-black tracking-tight">{name}</h3>
      <p className="text-[10px] font-medium text-white/60">{count} Hubs</p>
    </div>
  </div>
);

/* ── Main Page ────────────────────────────────────────── */

const IndexPage = () => {
  const { places = [], loading: placesLoading } = usePlaces();
  const { cars = [], loading: carsLoading } = useCars();
  const navigate = useNavigate();

  const [searchTab, setSearchTab] = useState('stays');
  const [location, setLocation] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGlobalSearch = () => {
    if (searchTab === 'stays') {
      navigate(`/hotels?city=${location}`);
    } else {
      navigate(`/car-rentals?city=${location}`);
    }
  };

  const trendingDestinations = [
    { name: 'Mumbai', label: 'Urban', img: 'https://images.unsplash.com/photo-1522789498260-d261e4b98ddc?q=80&w=1000&auto=format&fit=crop', count: 48 },
    { name: 'Goa', label: 'Beach', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop', count: 120 },
    { name: 'Jaipur', label: 'Royal', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000&auto=format&fit=crop', count: 35 },
    { name: 'Bengaluru', label: 'Tech', img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop', count: 62 },
    { name: 'Delhi', label: 'Capital', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop', count: 94 },
  ];

  return (
    <div className="bg-white font-sans overflow-x-hidden pb-20">
      
      {/* ── CINEMATIC COMPACT HERO ── */}
      <section className="relative h-[65vh] w-full flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop" 
            className="h-full w-full object-cover brightness-[0.7]"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />
        </div>

        <div className="relative z-10 w-full max-w-5xl px-4 text-center">
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-lg">
              Explore the <span className="text-rose-500 italic">Uncharted.</span>
            </h1>
            
            <p className="max-w-md mx-auto text-white/90 text-sm font-medium mb-8">
              Handpicked luxury stays and elite rentals across India.
            </p>

            {/* INTEGRATED SEARCH EXPERIENCE */}
            <div className="w-full max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-1.5 border border-gray-100 flex flex-col md:flex-row items-center gap-1">
                <div className="flex-1 w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer group/input rounded-xl">
                  <MapPin className="text-rose-500 h-4 w-4" />
                  <div className="flex flex-col items-start min-w-0">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Location</span>
                    <input 
                      type="text" 
                      placeholder="Where to?"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="bg-transparent focus:outline-none text-xs font-bold text-gray-800 placeholder-gray-400 w-full"
                    />
                  </div>
                </div>
                
                <div className="hidden md:block w-px h-6 bg-gray-100" />

                <div className="flex-1 w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer group/input rounded-xl">
                   <div className="flex bg-gray-100/80 p-0.5 rounded-lg">
                      <button onClick={() => setSearchTab('stays')} className={`px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${searchTab === 'stays' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-400'}`}>Stays</button>
                      <button onClick={() => setSearchTab('cars')} className={`px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${searchTab === 'cars' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}>Cars</button>
                   </div>
                </div>

                <div className="p-1 w-full md:w-auto">
                  <button 
                    onClick={handleGlobalSearch}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-3 px-6 rounded-xl transition-all shadow-lg shadow-rose-500/20 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <Search className="h-3 w-3" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCOVER DESTINATIONS (HIGH DENSITY) ── */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionHeader 
          badge="Curated"
          title="Top Destinations"
          subtitle="Hand-picked hubs across the subcontinent."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {trendingDestinations.map((dest, i) => (
            <div key={dest.name} onClick={() => navigate(`/hotels?city=${dest.name}`)}>
              <DiscoverCard {...dest} />
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED STAYS (Airbnb Density) ── */}
      <section className="py-16 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <SectionHeader 
              badge="Luxury"
              title="Signature Stays"
              subtitle="The finest villas and heritage hotels."
            />
            <Link to="/hotels" className="text-rose-600 font-black uppercase tracking-widest text-[9px] mb-8 flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {placesLoading ? (
              [1, 2, 3, 4].map(n => <div key={n} className="animate-pulse bg-gray-200 rounded-2xl aspect-square" />)
            ) : places.slice(0, 8).map(place => (
              <Link key={place._id} to={`/place/${place._id}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-3">
                  <img src={place.photos?.[0] || 'https://via.placeholder.com/600'} alt={place.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <button className="absolute top-3 right-3 h-7 w-7 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-rose-500 transition-all">
                    <Heart className="h-3.5 w-3.5" />
                  </button>
                  {place.ratings > 0 && (
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-[9px] font-black flex items-center gap-1 shadow-sm">
                      <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" /> {place.ratings}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-black text-gray-900 line-clamp-1 pr-4">{place.title}</h3>
                    <span className="text-xs font-black text-gray-900 shrink-0">₹{place.price.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{place.city || 'India'}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREMIUM RENTALS (Dense Grid) ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader 
            badge="Elite Fleet"
            title="Luxury Rentals"
            subtitle="Drive the extraordinary."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {carsLoading ? (
              [1, 2, 3].map(n => <div key={n} className="animate-pulse bg-gray-100 rounded-2xl h-60" />)
            ) : cars.slice(0, 6).map(car => (
              <Link key={car._id} to={`/car/${car._id}`} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col">
                <div className="relative h-44 overflow-hidden bg-gray-50">
                  <img src={car.photos?.[0] || 'https://via.placeholder.com/600'} alt={car.carName} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-lg">{car.brand}</div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black text-gray-900 shadow-sm border border-white/20">
                    ₹{car.price.toLocaleString()}/day
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors">{car.carName}</h3>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                      <Users className="h-3 w-3" /> {car.seatingCapacity}
                    </div>
                  </div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{car.model} · {car.transmission}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPACT HOSTING PROMO ── */}
      <section className="mx-4 mb-20">
        <div className="max-w-7xl mx-auto bg-gray-900 rounded-[2rem] overflow-hidden relative p-12 md:p-20 text-center">
          <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" className="h-full w-full object-cover" alt="bg" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Host on YatriHub</h2>
            <p className="text-gray-400 text-sm font-medium mb-10 max-w-md mx-auto">
              Join our elite network of hosts and monetize your luxury assets.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/account/places/new" className="bg-white text-gray-900 font-black py-4 px-8 rounded-xl hover:bg-rose-500 hover:text-white transition-all text-xs uppercase tracking-widest shadow-lg w-full sm:w-auto">
                Host Property
              </Link>
              <Link to="/account/cars/new" className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-black py-4 px-8 rounded-xl hover:bg-white/20 transition-all text-xs uppercase tracking-widest shadow-lg w-full sm:w-auto">
                Host a Car
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default IndexPage;
