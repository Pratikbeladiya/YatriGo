import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, Navigate, useParams } from 'react-router-dom';

import AccountNav from '@/components/ui/AccountNav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import PlacesPage from './PlacesPage';
import { useAuth, usePlaces, useCars } from '../../hooks';
import { LogOut, Mail, PenSquare, User, ShieldCheck, Sparkles, MapPin, Phone } from 'lucide-react';
import EditProfileDialog from '@/components/ui/EditProfileDialog';

const ProfilePage = () => {
  const auth = useAuth();
  const { user, logout } = auth;
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (!subpage) {
    subpage = 'profile';
  }

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success(response.message);
      setRedirect('/');
    } else {
      toast.error(response.message);
    }
  };

  const { places } = usePlaces();
  const { cars } = useCars();

  const userPlaces = user ? places.filter(p => p.owner === user._id) : [];
  const userCars = user ? cars.filter(c => c.owner === user._id) : [];

  if (!user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 font-sans">
      <AccountNav />
      
      {subpage === 'profile' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
             <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Account Overview</h1>
                <p className="text-gray-500 text-xs font-medium">Manage your YatriHub profile and assets.</p>
             </div>
             <div className="flex gap-3">
                <div className="bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm flex flex-col items-center min-w-[90px]">
                   <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-0.5">Stays</span>
                   <span className="text-base font-black text-gray-900">{userPlaces.length}</span>
                </div>
                <div className="bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm flex flex-col items-center min-w-[90px]">
                   <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-0.5">Vehicles</span>
                   <span className="text-base font-black text-gray-900">{userCars.length}</span>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* User Card */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="h-32 w-32 rounded-full p-1 bg-gradient-to-tr from-rose-500 to-orange-400 shadow-lg">
                    <div className="h-full w-full rounded-full overflow-hidden border-4 border-white bg-gray-50">
                       <Avatar className="h-full w-full">
                        {user.picture ? (
                          <AvatarImage src={user.picture} className="object-cover" />
                        ) : (
                          <AvatarImage src="https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png" className="object-cover" />
                        )}
                        <AvatarFallback className="text-2xl font-black bg-rose-500 text-white">
                          {user.name?.slice(0, 1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-emerald-500 h-7 w-7 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                    <ShieldCheck className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>

                <h2 className="text-xl font-black text-gray-900 mb-1">{user.name}</h2>
                <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-6">Verified Member</div>
                
                <div className="w-full space-y-3">
                   <EditProfileDialog />
                   <button onClick={handleLogout} className="w-full py-3 rounded-xl border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all flex items-center justify-center gap-2">
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                   </button>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">
                 <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                    <h3 className="text-base font-black text-gray-900 tracking-tight">Identity Information</h3>
                    <Sparkles className="w-4 h-4 text-rose-500 opacity-20" />
                 </div>

                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                       <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Full Name</span>
                       <div className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100/50">
                          <User className="w-3.5 h-3.5 text-rose-500" />
                          <p className="text-xs font-black text-gray-700">{user.name}</p>
                       </div>
                    </div>
                    <div className="space-y-1.5">
                       <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Email Identity</span>
                       <div className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100/50">
                          <Mail className="w-3.5 h-3.5 text-blue-500" />
                          <p className="text-xs font-black text-gray-700 truncate">{user.email}</p>
                       </div>
                    </div>
                    <div className="space-y-1.5">
                       <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Contact Number</span>
                       <div className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100/50">
                          <Phone className="w-3.5 h-3.5 text-emerald-500" />
                          <p className="text-xs font-black text-gray-700">{user.phone || '+91 0000 0000 00'}</p>
                       </div>
                    </div>
                    <div className="space-y-1.5">
                       <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Location Hub</span>
                       <div className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100/50">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          <p className="text-xs font-black text-gray-700">India, Mumbai</p>
                       </div>
                    </div>
                 </div>

                 <div className="mt-8 pt-8 border-t border-gray-50">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Traveler Bio</span>
                    <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100/50 italic text-xs font-medium text-gray-500 leading-relaxed">
                       {user.bio || "Crafting experiences and exploring the unseen. Join me on my next journey via YatriHub."}
                    </div>
                 </div>
              </div>

              {/* Security Banner */}
              <div className="bg-gray-900 rounded-2xl p-8 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 h-40 w-40 bg-rose-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-rose-500/20 transition-all duration-700" />
                 <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                       <h4 className="text-white font-black text-sm mb-1 tracking-tight">Security & Encryption</h4>
                       <p className="text-gray-400 text-[10px] font-medium max-w-sm">Your data is protected by industry-standard end-to-end encryption protocols.</p>
                    </div>
                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/60">Tier 1 Secured</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
