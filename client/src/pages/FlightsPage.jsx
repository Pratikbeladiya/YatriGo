import React from 'react';
import { Plane, Repeat, Search, MapPin, Calendar } from 'lucide-react';

const FlightsPage = () => {
  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Compare and book flights with ease</h1>
        <p className="text-gray-600 text-lg">Discover your next dream destination</p>
      </div>

      {/* Flight Search */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-16">
        <div className="flex gap-6 mb-6">
          <label className="flex items-center gap-2 cursor-pointer font-medium">
            <input type="radio" name="trip" defaultChecked className="text-blue-600 focus:ring-blue-500" />
            Round-trip
          </label>
          <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-500">
            <input type="radio" name="trip" className="text-blue-600 focus:ring-blue-500" />
            One-way
          </label>
          <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-500">
            <input type="radio" name="trip" className="text-blue-600 focus:ring-blue-500" />
            Multi-city
          </label>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600">
                <Plane className="h-5 w-5 -rotate-45" />
              </div>
              <input type="text" placeholder="Where from?" className="w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600">
                <MapPin className="h-5 w-5" />
              </div>
              <input type="text" placeholder="Where to?" className="w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                <Repeat className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                <Calendar className="h-5 w-5" />
              </div>
              <input type="text" placeholder="Departure - Return" className="w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
              <Search className="h-5 w-5" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Popular Routes */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Popular flights near you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { from: 'Mumbai', to: 'Dubai', price: '₹ 18,450', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400' },
            { from: 'Delhi', to: 'Bangkok', price: '₹ 22,120', img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579367?q=80&w=400' },
            { from: 'Bengaluru', to: 'Singapore', price: '₹ 26,800', img: 'https://images.unsplash.com/photo-1525625232717-121ad31862e1?q=80&w=400' },
          ].map((flight, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:shadow-lg transition-all cursor-pointer">
              <img src={flight.img} className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{flight.from} to {flight.to}</h3>
                    <p className="text-sm text-gray-500">Jan 12 — Jan 20</p>
                  </div>
                  <p className="font-bold text-blue-600">{flight.price}</p>
                </div>
                <p className="text-xs text-gray-400 mt-2">Round-trip · Economy</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;
