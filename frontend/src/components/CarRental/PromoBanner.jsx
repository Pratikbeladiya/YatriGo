import React from 'react';

const PromoBanner = () => {
  return (
    <div className="mx-auto mt-12 max-w-7xl px-4">
      <div className="flex flex-col items-stretch overflow-hidden rounded-2xl border border-pink-100 bg-gradient-to-r from-white to-pink-50 md:flex-row">
        {/* Left Section */}
        <div className="flex flex-1 items-center gap-6 p-6">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-yellow-400 p-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3659/3659899.png"
                alt="Promo"
                className="h-full w-full object-contain"
              />
            </div>
            {/* Coin accents */}
            <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-yellow-500"></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Promo codes</h3>
            <p className="text-gray-500 text-sm">Enjoy discounts upon discounts</p>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex-[2] border-y border-pink-200 md:border-y-0 md:border-x md:border-dashed p-6">
          <div className="flex h-full flex-col justify-center">
            <span className="mb-2 w-fit rounded bg-pink-500 px-2 py-0.5 text-xs font-bold text-white uppercase">New user</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-pink-600 tracking-tighter">8% Off</span>
              <span className="text-pink-400 font-semibold">Book now and save</span>
            </div>
            <p className="mt-1 text-xs text-gray-400 italic">Valid for 15 days once claimed</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-center bg-pink-50/50 p-6">
          <button className="w-full max-w-[160px] rounded-full bg-pink-600 py-4 font-bold text-white transition-all hover:bg-pink-700 hover:scale-105 active:scale-95 shadow-lg shadow-pink-200">
            Claim
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { icon: 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png', label: 'Best Price' },
          { icon: 'https://cdn-icons-png.flaticon.com/512/3103/3103446.png', label: '24/7 Support' },
          { icon: 'https://cdn-icons-png.flaticon.com/512/1067/1067557.png', label: 'Safe & Secure' },
          { icon: 'https://cdn-icons-png.flaticon.com/512/616/616490.png', label: 'Quick Booking' },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <img src={item.icon} alt={item.label} className="h-10 w-10 opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;
