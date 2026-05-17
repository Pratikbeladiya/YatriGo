import React from 'react';
import { Link } from 'react-router-dom';
import PlaceImg from './PlaceImg';
import { Trash2, MapPin, ChevronRight, Star } from 'lucide-react';

const InfoCard = ({ place, onDelete }) => {
  return (
    <div className="relative group animate-in fade-in duration-500">
      <Link
        to={`/account/places/${place._id}`}
        className="flex cursor-pointer flex-col sm:flex-row gap-6 rounded-xl bg-white p-4 border border-gray-100 transition-all hover:shadow-xl group"
        key={place._id}
      >
        <div className="sm:w-48 h-32 sm:h-auto shrink-0 overflow-hidden rounded-lg">
          <PlaceImg place={place} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex justify-between items-start mb-1">
              <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">{place.category}</span>
              <div className="flex items-center gap-1">
                 <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                 <span className="text-[10px] font-black text-gray-900">{place.ratings || '4.8'}</span>
              </div>
            </div>
            <h2 className="text-base font-black text-gray-900 tracking-tight group-hover:text-rose-500 transition-colors">{place.title}</h2>
            <p className="line-clamp-2 mt-1.5 text-xs text-gray-500 font-medium leading-relaxed max-w-2xl">{place.description}</p>
          </div>
          <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-50">
             <div className="flex items-center gap-1 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                <MapPin className="w-3 h-3 text-rose-500" /> {place.city || 'India'}
             </div>
             <div className="flex items-center gap-1 text-[10px] font-black text-gray-900 uppercase tracking-widest">
                ₹{place.price.toLocaleString()} <span className="text-gray-400 font-bold">/ night</span>
             </div>
          </div>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete(place._id);
        }}
        className="absolute top-6 right-6 p-2 bg-white/90 backdrop-blur-md text-rose-500 rounded-lg shadow-sm border border-gray-100 hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 active:scale-90"
        title="Delete Property"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default InfoCard;
