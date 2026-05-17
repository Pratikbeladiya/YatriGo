import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../hooks';
import { User, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [redirect, setRedirect] = useState(false);
  const auth = useAuth();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await auth.register(formData);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  };

  const handleGoogleLogin = async (credential) => {
    const response = await auth.googleLogin(credential);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gray-50/30 font-sans pt-28 pb-20">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-100 p-8 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 shadow-lg mb-4">
               <Sparkles className="h-6 w-6 text-rose-500" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Join YatriGo</h1>
            <p className="text-gray-400 text-xs font-medium mt-1">Start your infinite travel experience</p>
          </div>

          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div className="space-y-1.5">
               <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Identity Name</label>
               <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleFormData}
                    className="w-full bg-gray-50 border border-gray-100 focus:border-rose-500 focus:bg-white rounded-xl py-3 pl-11 pr-5 transition-all outline-none text-xs font-bold text-gray-700 shadow-sm"
                  />
               </div>
            </div>

            <div className="space-y-1.5">
               <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Hub</label>
               <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleFormData}
                    className="w-full bg-gray-50 border border-gray-100 focus:border-rose-500 focus:bg-white rounded-xl py-3 pl-11 pr-5 transition-all outline-none text-xs font-bold text-gray-700 shadow-sm"
                  />
               </div>
            </div>
            
            <div className="space-y-1.5">
               <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Secret Key</label>
               <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleFormData}
                    className="w-full bg-gray-50 border border-gray-100 focus:border-rose-500 focus:bg-white rounded-xl py-3 pl-11 pr-5 transition-all outline-none text-xs font-bold text-gray-700 shadow-sm"
                  />
               </div>
            </div>

            <button className="w-full bg-gray-900 hover:bg-rose-500 active:scale-[0.98] text-white text-[10px] font-black uppercase tracking-widest py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2">
              Create Account <ArrowRight className="h-3 w-3" />
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px grow bg-gray-100"></div>
            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Alternative Join</p>
            <div className="h-px grow bg-gray-100"></div>
          </div>

          <div className="flex justify-center mb-6">
            <GoogleLogin
              onSuccess={(credentialResponse) => handleGoogleLogin(credentialResponse.credential)}
              onError={() => console.log('Login Failed')}
              theme="outline"
              shape="pill"
              width="100%"
            />
          </div>

          <div className="text-center pt-6 border-t border-gray-50">
            <p className="text-gray-400 text-xs font-medium">
              Already in the circle?{' '}
              <Link className="text-rose-500 font-black uppercase tracking-tighter hover:underline" to={'/login'}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
