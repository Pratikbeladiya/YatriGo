import { Link, useLocation } from 'react-router-dom';
import { User, Calendar, Home, Car } from 'lucide-react';

const AccountNav = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[2];

  if (subpage === undefined) {
    subpage = 'profile';
  }

  const links = [
    { type: 'profile', to: '/account', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { type: 'bookings', to: '/account/bookings', label: 'Bookings', icon: <Calendar className="w-4 h-4" /> },
    { type: 'places', to: '/account/places', label: 'Properties', icon: <Home className="w-4 h-4" /> },
    { type: 'cars', to: '/account/cars', label: 'Vehicles', icon: <Car className="w-4 h-4" /> },
  ];

  return (
    <nav className="mt-28 mb-10 flex flex-wrap w-full justify-center gap-3 px-4">
      {links.map(({ type, to, label, icon }) => {
        const active = type === subpage;
        return (
          <Link
            key={type}
            className={`flex items-center gap-2 py-2.5 px-5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
              active
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 shadow-sm'
            }`}
            to={to}
          >
            {icon}
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default AccountNav;
