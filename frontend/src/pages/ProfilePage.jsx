import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, Navigate, useParams } from 'react-router-dom';

import AccountNav from '@/components/ui/AccountNav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import PlacesPage from './PlacesPage';
import { useAuth, usePlaces, useCars } from '@/hooks';
import { LogOut, Mail, User, ShieldCheck, Phone, MapPin, Award } from 'lucide-react';
import EditProfileDialog from '@/components/ui/EditProfileDialog';

/* ── Info Row ───────────────────────────── */
const InfoField = ({ icon, label, value }) => (
  <div>
    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{label}</span>
    <div className="flex items-center gap-3 bg-gray-50 py-3 px-4 rounded-xl border border-gray-100">
      <span className="text-gray-400">{icon}</span>
      <p className="text-sm font-medium text-gray-700 truncate">{value}</p>
    </div>
  </div>
);

const ProfilePage = () => {
  const auth = useAuth();
  const { user, logout } = auth;
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (!subpage) subpage = 'profile';

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

  if (!user && !redirect) return <Navigate to={'/login'} />;
  if (redirect) return <Navigate to={redirect} />;

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      <AccountNav />

      {subpage === 'profile' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-sm text-gray-500 mt-1 font-normal">Manage your account and listings.</p>
            </div>
            {/* Stats */}
            <div className="flex gap-3">
              <div className="bg-white border border-gray-100 px-5 py-3 rounded-2xl shadow-sm text-center min-w-[90px]">
                <span className="block text-xs font-semibold text-rose-500 uppercase tracking-wide mb-0.5">Stays</span>
                <span className="text-2xl font-bold text-gray-900">{userPlaces.length}</span>
              </div>
              <div className="bg-white border border-gray-100 px-5 py-3 rounded-2xl shadow-sm text-center min-w-[90px]">
                <span className="block text-xs font-semibold text-blue-500 uppercase tracking-wide mb-0.5">Vehicles</span>
                <span className="text-2xl font-bold text-gray-900">{userCars.length}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Avatar Card */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-5">
                  <div className="h-28 w-28 rounded-full p-[3px] bg-gradient-to-tr from-rose-500 to-orange-400 shadow-lg">
                    <div className="h-full w-full rounded-full overflow-hidden border-4 border-white bg-gray-100">
                      <Avatar className="h-full w-full">
                        <AvatarImage
                          src={user.picture || 'https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png'}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-2xl font-bold bg-rose-500 text-white">
                          {user.name?.slice(0, 1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-emerald-500 h-6 w-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                    <ShieldCheck className="h-3 w-3 text-white" />
                  </div>
                </div>

                <h2 className="font-display text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
                <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-6">
                  <Award className="w-3.5 h-3.5" /> Verified Member
                </div>

                <div className="w-full space-y-3">
                  <EditProfileDialog />
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-xl border border-gray-100 text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="lg:col-span-8 space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h3 className="font-display text-base font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-50">
                  Personal Information
                </h3>

                <div className="grid md:grid-cols-2 gap-5">
                  <InfoField icon={<User className="w-4 h-4" />} label="Full Name" value={user.name} />
                  <InfoField icon={<Mail className="w-4 h-4" />} label="Email Address" value={user.email} />
                  <InfoField icon={<Phone className="w-4 h-4" />} label="Phone" value={user.phone || 'Not set'} />
                  <InfoField icon={<MapPin className="w-4 h-4" />} label="Location" value="India" />
                </div>

                {user.bio && (
                  <div className="mt-6 pt-6 border-t border-gray-50">
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">About</span>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-sm font-normal text-gray-600 leading-relaxed italic">
                      {user.bio}
                    </div>
                  </div>
                )}
              </div>

              {/* Security Banner */}
              <div className="bg-gray-900 rounded-2xl p-7 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 bg-rose-500/10 rounded-full blur-2xl -mr-8 -mt-8" />
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">Security & Data Privacy</h4>
                    <p className="text-gray-400 text-xs font-normal max-w-xs leading-relaxed">
                      Your account is protected with industry-standard encryption.
                    </p>
                  </div>
                  <span className="flex-shrink-0 px-4 py-2 bg-white/10 rounded-lg border border-white/10 text-xs font-medium text-white/70">
                    🔒 Secured
                  </span>
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
