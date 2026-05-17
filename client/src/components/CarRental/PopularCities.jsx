import React from 'react';

const cities = [
  {
    name: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1522789498260-d261e4b98ddc?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'New Delhi',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Bengaluru',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop',
  },
];

const PopularCities = () => {
  return (
    <div className="mx-auto mt-8 max-w-7xl px-4 pb-20">
      <h2 className="mb-8 text-2xl font-bold text-gray-900">Popular car rental cities</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cities.map((city, index) => (
          <div key={index} className="group relative h-48 cursor-pointer overflow-hidden rounded-xl shadow-lg">
            <img
              src={city.image}
              alt={city.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-6">
              <h3 className="text-2xl font-bold text-white tracking-wide">{city.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCities;
