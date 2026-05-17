import { Link, useLocation } from 'react-router-dom';
import { User, Calendar, Home, Car, ShieldCheck } from 'lucide-react';

const AccountNav = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[2];

  if (subpage === undefined) {
    subpage = 'profile';
  }

  const linkClasses = (type = null) => {
    const active = type === subpage;
    return `flex items-center gap-2 py-2.5 px-6 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
      active 
        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20 scale-105' 
        : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50 hover:text-gray-900 shadow-sm'
    }`;
  };

  return (
    <nav className="mt-28 mb-12 flex flex-wrap w-full justify-center gap-4 px-4">
      <Link className={linkClasses('profile')} to={'/account'}>
        <User className="w-4 h-4" />
        Profile
      </Link>
      <Link className={linkClasses('bookings')} to={'/account/bookings'}>
        <Calendar className="w-4 h-4" />
        Bookings
      </Link>
      <Link className={linkClasses('places')} to={'/account/places'}>
        <Home className="w-4 h-4" />
        Properties
      </Link>
      <Link className={linkClasses('cars')} to={'/account/cars'}>
        <Car className="w-4 h-4" />
        Vehicles
      </Link>
    </nav>
  );
};

export default AccountNav;
