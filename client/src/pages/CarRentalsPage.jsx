import React from 'react';
import CarHero from '../components/CarRental/CarHero';

const CarRentalsPage = () => {
  return (
    <div className="pt-20 pb-20 font-sans bg-gray-50/30">
      <CarHero />
      
      <div className="px-4 max-w-7xl mx-auto mt-10">
        <div className="flex flex-col gap-10 mb-16">
          {/* Trending Locations */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Explore by City</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {[
                { name: 'New Delhi', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop', label: 'Business Hub' },
                { name: 'Mumbai', img: 'https://images.unsplash.com/photo-1522789498260-d261e4b98ddc?q=80&w=1000&auto=format&fit=crop', label: 'Financial Capital' },
                { name: 'Bengaluru', img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop', label: 'Tech City' },
                { name: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop', label: 'Beach Drive' },
                { name: 'Pune', img: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?q=80&w=1000&auto=format&fit=crop', label: 'Cultural Center' },
              ].map((city) => (
                <div key={city.name} className="group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition">
                    <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="font-black text-sm">{city.name}</h3>
                      <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest mt-0.5">{city.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Browse by Car Category */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Explore by Class</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {[
                { name: 'Luxury Sedans', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop', label: 'Premium Comfort' },
                { name: 'Adventure SUVs', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop', label: 'Off-Road Ready' },
                { name: 'Electric', img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000&auto=format&fit=crop', label: 'Eco-Friendly' },
                { name: 'Convertibles', img: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1000&auto=format&fit=crop', label: 'Open Air' },
                { name: 'Economy', img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c15d?q=80&w=1000&auto=format&fit=crop', label: 'Daily Driver' },
              ].map((type) => (
                <div key={type.name} className="group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition">
                    <img src={type.img} alt={type.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="font-black text-sm">{type.name}</h3>
                      <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest mt-0.5">{type.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CarRentalsPage;
