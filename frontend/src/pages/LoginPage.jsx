import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import ProfilePage from './ProfilePage';
import { useAuth } from '@/hooks';
import { Mail, Lock, ArrowRight, Plane } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await auth.login(formData);
    setLoading(false);
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

  if (redirect) return <Navigate to={'/'} />;
  if (auth.user) return <ProfilePage />;

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-white to-rose-50/30 pt-28 pb-20">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100/80 p-8 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg mb-5">
              <Plane className="h-7 w-7 text-rose-400" />
            </div>
            <h1 className="font-display text-3xl font-bold text-gray-900 tracking-tight">Welcome back</h1>
            <p className="text-gray-500 text-sm font-normal mt-2">Sign in to continue your journey</p>
          </div>

          <form className="space-y-5" onSubmit={handleFormSubmit}>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Email address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleFormData}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-500/10 rounded-xl py-3.5 pl-11 pr-5 transition-all outline-none text-sm font-medium text-gray-800 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
                <button type="button" className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors">Forgot password?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleFormData}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-500/10 rounded-xl py-3.5 pl-11 pr-5 transition-all outline-none text-sm font-medium text-gray-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-rose-500 active:scale-[0.98] text-white text-sm font-semibold py-3.5 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px grow bg-gray-100" />
            <p className="text-xs font-medium text-gray-400">or continue with</p>
            <div className="h-px grow bg-gray-100" />
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
            <p className="text-gray-500 text-sm">
              New to YatriGo?{' '}
              <Link className="text-rose-500 font-semibold hover:text-rose-600 transition-colors" to={'/register'}>
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
