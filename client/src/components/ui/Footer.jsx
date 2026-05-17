import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, ShieldCheck, Globe, ChevronRight } from 'lucide-react';

const FooterLink = ({ to, children }) => (
  <Link to={to} className="group flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-all duration-300 text-sm font-medium">
    <span className="h-[1px] w-0 bg-rose-500 transition-all duration-300 group-hover:w-3" />
    {children}
  </Link>
);

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <footer>
      {/* ── NEWSLETTER SECTION ── */}
      <div className="border-b border-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="rounded-[3rem] bg-gray-900 p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-rose-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
                  Join our <span className="text-rose-500">Elite</span> travel circle.
                </h3>
                <p className="text-gray-400 text-lg font-medium">
                  Exclusive deals, handpicked destinations, and travel inspiration delivered to your inbox.
                </p>
              </div>
              <div className="w-full max-w-md">
                <div className="flex p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-transparent px-6 py-3 text-white placeholder-white/40 outline-none font-bold text-sm"
                  />
                  <button
                    className="bg-rose-500 hover:bg-rose-600 text-white font-black py-3 px-8 rounded-2xl transition-all shadow-xl shadow-rose-500/20 active:scale-95 flex items-center gap-2"
                  >
                    Subscribe <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-4 text-[10px] text-gray-500 text-center lg:text-left font-bold uppercase tracking-widest px-4">
                  By subscribing, you agree to our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 shadow-xl group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                </svg>
              </div>
              <span className="text-3xl font-black tracking-tighter">
                Yatri<span className="text-rose-500">Go</span>
              </span>
            </Link>
            <p className="mt-8 text-lg text-gray-500 font-medium leading-relaxed max-w-sm">
              The world's most trusted platform for premium stays and flexible automotive rentals. 
              Elevating your travel experience since 2024.
            </p>
            <div className="mt-10 flex gap-4">
              {[
                { icon: <Facebook className="h-5 w-5" />, label: 'Facebook' },
                { icon: <Twitter className="h-5 w-5" />, label: 'Twitter' },
                { icon: <Instagram className="h-5 w-5" />, label: 'Instagram' },
                { icon: <Linkedin className="h-5 w-5" />, label: 'Linkedin' },
              ].map((item, i) => (
                <button key={i} className="h-12 w-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  {item.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-gray-900">Explore</h4>
            <ul className="flex flex-col gap-4">
              <li><FooterLink to="/">Experiences</FooterLink></li>
              <li><FooterLink to="/hotels">Luxury Stays</FooterLink></li>
              <li><FooterLink to="/car-rentals">Elite Fleet</FooterLink></li>
              <li><FooterLink to="/account/bookings">My Itinerary</FooterLink></li>
              <li><FooterLink to="/account">Member Club</FooterLink></li>
            </ul>
          </div>

          {/* Hosting */}
          <div className="lg:col-span-2">
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-gray-900">Hosting</h4>
            <ul className="flex flex-col gap-4">
              <li><FooterLink to="/account/places/new">Host Property</FooterLink></li>
              <li><FooterLink to="/account/cars/new">List a Vehicle</FooterLink></li>
              <li><FooterLink to="/account/places">Property Management</FooterLink></li>
              <li><FooterLink to="/account/cars">Fleet Management</FooterLink></li>
              <li><FooterLink to="/register">Join the Network</FooterLink></li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="lg:col-span-4">
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-gray-900">Direct Support</h4>
            <div className="space-y-6">
              <a href="mailto:concierge@yatrigo.com" className="flex items-center gap-4 group p-4 rounded-3xl bg-gray-50 border border-transparent hover:border-rose-100 hover:bg-rose-50/50 transition-all">
                <div className="h-10 w-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-rose-500 shadow-sm">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Us</p>
                  <p className="text-sm font-bold text-gray-800">concierge@yatrigo.com</p>
                </div>
              </a>
              <a href="tel:+911800000000" className="flex items-center gap-4 group p-4 rounded-3xl bg-gray-50 border border-transparent hover:border-blue-100 hover:bg-blue-50/50 transition-all">
                <div className="h-10 w-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-blue-500 shadow-sm">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Call Support</p>
                  <p className="text-sm font-bold text-gray-800">1800-ELITE-TRAVEL</p>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 rounded-3xl bg-gray-50/50 border border-transparent">
                 <MapPin className="h-5 w-5 text-gray-400 ml-2" />
                 <p className="text-sm font-bold text-gray-600">Global Headquarters, Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              © {new Date().getFullYear()} YatriGo Infinite Experience. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
               <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3" /> PCI DSS Certified</span>
               <span className="h-1 w-1 rounded-full bg-gray-300" />
               <span className="flex items-center gap-1.5"><Globe className="h-3 w-3" /> GDPR Compliant</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['Privacy Policy', 'Terms of Service', 'Safety Policy', 'Cookie Settings'].map(link => (
              <button key={link} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-rose-500 transition-colors">
                {link}
              </button>
            ))}
            <div className="hidden md:flex items-center gap-3 pl-8 border-l border-gray-200">
              <span className="text-[11px] font-black uppercase tracking-widest text-gray-800 flex items-center gap-2 cursor-pointer hover:text-rose-500">
                <Globe className="h-3.5 w-3.5" /> English (IN)
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest text-gray-800 cursor-pointer hover:text-rose-500">
                ₹ INR
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
