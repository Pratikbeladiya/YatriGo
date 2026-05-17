import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { Search, Menu, X, User, LogIn, UserPlus, Home, Hotel, Car, ShieldCheck, Heart, Sparkles, Globe, ChevronRight } from 'lucide-react';

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
        className={`group relative flex items-center gap-2 text-[13px] font-black uppercase tracking-widest transition-all duration-300 hover:text-rose-500 ${
          active ? 'text-rose-500' : 'text-gray-800'
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full bg-rose-500 transition-all duration-300 scale-0 group-hover:scale-100 ${active ? 'scale-100' : ''}`} />
        {label}
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-8 py-4 ${
        showScrolledStyle
          ? 'bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-gray-100/50 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* LOGO AREA */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-900 shadow-xl group-hover:scale-110 transition-transform duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <svg xmlns="http://www.w3.org/2000/svg" className="relative h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl font-black tracking-tighter leading-none ${showScrolledStyle ? 'text-gray-900' : 'text-white'}`}>
              Yatri<span className="text-rose-500">Go</span>
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-[0.3em] mt-0.5 opacity-60 ${showScrolledStyle ? 'text-gray-500' : 'text-white/70'}`}>Premium Travel Hub</span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className={`hidden items-center gap-10 lg:flex ${showScrolledStyle ? 'bg-gray-50/50' : 'bg-white/10'} backdrop-blur-md px-8 py-3 rounded-full border border-white/20 shadow-sm`}>
          {navLink('/', 'Home')}
          {navLink('/hotels', 'Stays')}
          {navLink('/car-rentals', 'Cars')}
          <div className="h-4 w-[1px] bg-gray-300 mx-2" />
          <Link to="/hotels" className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-2 ${showScrolledStyle ? 'text-gray-400' : 'text-white/60'} hover:text-rose-500 transition-colors`}>
            <Globe className="h-3.5 w-3.5" /> Explore
          </Link>
        </nav>

        {/* ACTION AREA */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="hidden items-center gap-3 lg:flex">
              <Link to="/login" className={`text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 ${showScrolledStyle ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
                Sign In
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-rose-600 to-orange-500 text-white text-xs font-black uppercase tracking-widest px-7 py-3 rounded-full shadow-lg shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all">
                Join Now
              </Link>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-6 mr-4">
               <Link to="/account/places" className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${showScrolledStyle ? 'text-gray-500' : 'text-white/70'} hover:text-rose-500 transition-colors`}>
                 <Sparkles className="h-3.5 w-3.5" /> Start Hosting
               </Link>
            </div>
          )}

          {/* USER MENU TOGGLE */}
          <Link
            to={user ? '/account' : '/login'}
            className={`hidden lg:flex items-center gap-3 rounded-full border p-1.5 transition-all duration-300 ${
              showScrolledStyle 
                ? 'bg-white border-gray-100 shadow-sm hover:shadow-xl' 
                : 'bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/20 shadow-none'
            }`}
          >
            <div className="flex items-center gap-3 pl-2.5">
               <Menu className={`h-4 w-4 ${showScrolledStyle ? 'text-gray-600' : 'text-white'}`} />
               <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-sm ring-2 ring-gray-100/50">
                  {user ? (
                    <img
                      src={user?.picture || 'https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png'}
                      className="h-full w-full object-cover"
                      alt="User Avatar"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                  )}
               </div>
            </div>
          </Link>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300 lg:hidden ${
              showScrolledStyle 
                ? 'bg-white border-gray-100 text-gray-800' 
                : 'bg-white/10 border-white/20 text-white backdrop-blur-md'
            }`}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 top-0 z-[90] bg-white transition-all duration-500 ease-in-out lg:hidden ${
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 p-3 rounded-2xl bg-gray-50 border border-gray-100 text-gray-700 hover:bg-gray-100 active:scale-95 transition-all shadow-sm"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex flex-col h-full px-8 py-32 overflow-y-auto">
          <div className="flex flex-col gap-6">
            {[
              { to: '/', label: 'The Experience', icon: <Sparkles className="h-5 w-5" /> },
              { to: '/hotels', label: 'Luxury Stays', icon: <Hotel className="h-5 w-5" /> },
              { to: '/car-rentals', label: 'Elite Fleet', icon: <Car className="h-5 w-5" /> },
              ...(user ? [
                { to: '/account/places', label: 'Manage Hosting', icon: <ShieldCheck className="h-5 w-5" /> },
                { to: '/account/bookings', label: 'Your Itinerary', icon: <Heart className="h-5 w-5" /> }
              ] : []),
            ].map((item) => {
              const active = currentPath === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-4 py-4 border-b border-gray-50 transition-all ${
                    active ? 'text-rose-500 translate-x-4' : 'text-gray-900 hover:translate-x-2'
                  }`}
                >
                  <div className={`p-3 rounded-2xl ${active ? 'bg-rose-50' : 'bg-gray-50'}`}>
                    {item.icon}
                  </div>
                  <span className="text-2xl font-black tracking-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-auto pt-12">
            {!user ? (
              <div className="grid grid-cols-2 gap-4">
                <Link to="/login" className="flex items-center justify-center py-5 rounded-3xl bg-gray-900 text-white font-black uppercase tracking-widest text-xs">Login</Link>
                <Link to="/register" className="flex items-center justify-center py-5 rounded-3xl bg-rose-500 text-white font-black uppercase tracking-widest text-xs">Join Now</Link>
              </div>
            ) : (
              <Link to="/account" className="flex items-center justify-between p-6 rounded-[2rem] bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                     <img src={user?.picture || 'https://via.placeholder.com/100'} className="h-full w-full object-cover" alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">{user?.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Elite Member</p>
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
