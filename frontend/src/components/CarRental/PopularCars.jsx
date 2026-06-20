import React, { useState } from 'react';
import { Users, ChevronRight, Settings, Car } from 'lucide-react';
import { useCars } from '@/hooks';
import { Link } from 'react-router-dom';
import Spinner from '@/components/ui/Spinner';

const PopularCars = () => {
  const { cars, loading } = useCars();
  const [showAllCars, setShowAllCars] = useState(false);

  if (loading) return <Spinner />;

  const displayedCars = showAllCars ? cars : cars.slice(0, 8);

  return (
    <div className="mx-auto mt-16 max-w-7xl px-4 pb-12 font-sans">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Available Vehicles</h2>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Verified cars across major hubs</p>
        </div>
        <div className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md">
          {cars.length} Vehicles
        </div>
      </div>

      {cars.length === 0 ? (
        <div className="text-center bg-gray-50 rounded-2xl border border-gray-100 py-16">
          <Car className="h-8 w-8 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-black text-gray-900">No vehicles found</h3>
          <p className="text-xs font-medium text-gray-500 mt-1">Host a vehicle to see it here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayedCars.map((car) => (
            <div key={car._id} className="group overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-xl flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 flex-shrink-0">
                <span className="absolute top-3 left-3 z-10 rounded-md bg-blue-600 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-white shadow-sm">
                  {car.fuelType}
                </span>
                <img
                  src={car.photos?.[0] || 'https://via.placeholder.com/400'}
                  alt={car.carName}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{car.brand} {car.carName}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 mb-3">{car.model} • {car.year}</p>

                  <div className="mb-4 flex items-center gap-3 text-[10px] font-bold text-gray-500 bg-gray-50 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5" title="Seating Capacity">
                      <Users className="h-3.5 w-3.5 text-gray-400" /> {car.seatingCapacity} Seats
                    </div>
                    <div className="w-px h-3 bg-gray-200" />
                    <div className="flex items-center gap-1.5" title="Transmission">
                      <Settings className="h-3.5 w-3.5 text-gray-400" /> {car.transmission}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                  <div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 block mb-0.5">Per Day</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-black text-gray-900">₹{car.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <Link to={`/car/${car._id}`}>
                    <button className="rounded-xl bg-gray-900 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-white transition-all hover:bg-blue-600 active:scale-95 shadow-sm">
                      View Deal
                    </button>
                  </Link>
                </div>
              </div>
            </div>
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
  );
};

export default PopularCars;
