import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { Menu, X, User, Hotel, Car, ShieldCheck, Calendar, Sparkles, Globe, ChevronRight } from 'lucide-react';

export const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = location?.pathname === '/';
  const showScrolledStyle = scrolled || !isHome;
  const currentPath = location?.pathname || '/';

  useEffect(() => {
    setMenuOpen(false);
  }, [location?.pathname]);

  const navLink = (to, label) => {
    const active = currentPath === to;
    return (
      <Link
        to={to}
        className={`relative text-sm font-medium tracking-wide transition-all duration-200 pb-0.5 ${
          active
            ? 'text-rose-500 border-b-2 border-rose-500'
            : showScrolledStyle
              ? 'text-gray-700 hover:text-gray-900'
              : 'text-white/90 hover:text-white'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-8 ${
        showScrolledStyle
          ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100 py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg xmlns="http://www.w3.org/2000/svg" className="relative h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className={`font-display text-xl font-bold tracking-tight ${showScrolledStyle ? 'text-gray-900' : 'text-white'}`}>
              Yatri<span className="text-rose-500">Go</span>
            </span>
            <span className={`text-[9px] font-medium uppercase tracking-[0.25em] mt-0.5 ${showScrolledStyle ? 'text-gray-400' : 'text-white/60'}`}>
              Premium Travel
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLink('/', 'Home')}
          {navLink('/hotels', 'Stays')}
          {navLink('/car-rentals', 'Cars')}
          <Link
            to="/hotels"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
              showScrolledStyle ? 'text-gray-500 hover:text-gray-900' : 'text-white/70 hover:text-white'
            }`}
          >
            <Globe className="h-3.5 w-3.5" /> Explore
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          {!user ? (
            <div className="hidden items-center gap-2 lg:flex">
              <Link
                to="/login"
                className={`text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200 ${
                  showScrolledStyle
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm shadow-rose-500/20 hover:shadow-rose-500/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-4 mr-2">
              <Link
                to="/account/places"
                className={`text-sm font-medium flex items-center gap-1.5 transition-colors duration-200 ${
                  showScrolledStyle ? 'text-gray-500 hover:text-gray-900' : 'text-white/70 hover:text-white'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-rose-400" /> Host
              </Link>
            </div>
          )}

          {/* USER AVATAR */}
          <Link
            to={user ? '/account' : '/login'}
            className={`hidden lg:flex items-center gap-2.5 rounded-full border px-3 py-1.5 transition-all duration-300 ${
              showScrolledStyle
                ? 'bg-white border-gray-200 shadow-sm hover:shadow-md'
                : 'bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/20'
            }`}
          >
            <Menu className={`h-4 w-4 ${showScrolledStyle ? 'text-gray-600' : 'text-white'}`} />
            <div className="h-7 w-7 overflow-hidden rounded-full border-2 border-white shadow-sm">
              {user ? (
                <img
                  src={user?.picture || 'https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png'}
                  className="h-full w-full object-cover"
                  alt="User"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                  <User className="h-3.5 w-3.5 text-gray-500" />
                </div>
              )}
            </div>
          </Link>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 lg:hidden ${
              showScrolledStyle
                ? 'bg-white border-gray-200 text-gray-700 shadow-sm'
                : 'bg-white/10 border-white/20 text-white backdrop-blur-md'
            }`}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 top-0 z-[90] bg-white transition-all duration-500 ease-in-out lg:hidden ${
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 hover:bg-gray-100 transition-all shadow-sm"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col h-full px-8 py-28 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {[
              { to: '/', label: 'Home', icon: <Sparkles className="h-5 w-5 text-rose-400" /> },
              { to: '/hotels', label: 'Luxury Stays', icon: <Hotel className="h-5 w-5 text-blue-400" /> },
              { to: '/car-rentals', label: 'Car Rentals', icon: <Car className="h-5 w-5 text-emerald-400" /> },
              ...(user ? [
                { to: '/account/places', label: 'My Properties', icon: <ShieldCheck className="h-5 w-5 text-purple-400" /> },
                { to: '/account/bookings', label: 'My Bookings', icon: <Calendar className="h-5 w-5 text-orange-400" /> },
              ] : []),
            ].map((item) => {
              const active = currentPath === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-4 py-4 px-4 rounded-2xl transition-all duration-200 ${
                    active
                      ? 'bg-rose-50 text-rose-600'
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${active ? 'bg-rose-100' : 'bg-gray-100'}`}>
                    {item.icon}
                  </div>
                  <span className="text-lg font-semibold">{item.label}</span>
                  <ChevronRight className="ml-auto h-4 w-4 text-gray-300" />
                </Link>
              );
            })}
          </div>

          <div className="mt-auto pt-8 border-t border-gray-100">
            {!user ? (
              <div className="grid grid-cols-2 gap-3">
                <Link to="/login" className="flex items-center justify-center py-4 rounded-2xl bg-gray-900 text-white font-semibold text-sm">Sign In</Link>
                <Link to="/register" className="flex items-center justify-center py-4 rounded-2xl bg-rose-500 text-white font-semibold text-sm">Join Now</Link>
              </div>
            ) : (
              <Link to="/account" className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img src={user?.picture || 'https://via.placeholder.com/100'} className="h-full w-full object-cover" alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs font-medium text-gray-500">View Profile</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
