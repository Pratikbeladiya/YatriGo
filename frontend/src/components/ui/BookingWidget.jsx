import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { differenceInDays } from 'date-fns';
import { toast } from 'react-toastify';
import { ShieldCheck, CreditCard } from 'lucide-react';

import { useAuth } from '@/hooks';
import axiosInstance from '@/utils/axios';
import DatePickerWithRange from './DatePickerWithRange';

const BookingWidget = ({ place }) => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [bookingData, setBookingData] = useState({
    noOfGuests: 1,
    name: '',
    phone: '',
  });
  const [redirect, setRedirect] = useState('');
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();

  const { noOfGuests, name, phone } = bookingData;
  const { _id: id, price } = place;

  useEffect(() => {
    if (user) {
      setBookingData((prev) => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const numberOfNights =
    dateRange.from && dateRange.to
      ? differenceInDays(
          new Date(dateRange.to).setHours(0, 0, 0, 0),
          new Date(dateRange.from).setHours(0, 0, 0, 0),
        )
      : 0;

  const totalAmount = numberOfNights * price;

  // handle booking form
  const handleBookingData = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const initPayment = (data) => {
    if (data.is_mock) {
      const simulateSuccess = window.confirm(
        `[Dev Sandbox Mode - No Active Keys Found]\n\nDo you want to simulate a successful payment of ₹${totalAmount.toLocaleString()}?`
      );
      if (simulateSuccess) {
        const mockVerify = async () => {
          try {
            const verifyUrl = '/razorpay/verify';
            const { data: verifyData } = await axiosInstance.post(verifyUrl, {
              razorpayPaymentId: `pay_mock_${Math.random().toString(36).substring(2, 15)}`,
              razorpayOrderId: data.id,
              razorpaySignature: 'mock_signature',
              bookingData: {
                place: id,
                checkIn: dateRange.from,
                checkOut: dateRange.to,
                noOfGuests,
                name,
                phone,
                price: totalAmount,
              }
            });

            if (verifyData.success) {
              toast.success('Payment successful (Sandbox)! Booking confirmed.');
              setRedirect(`/account/bookings/${verifyData.booking._id}`);
            }
          } catch (error) {
            toast.error('Payment verification failed.');
            setProcessing(false);
          }
        };
        mockVerify();
      } else {
        setProcessing(false);
        toast.info('Payment cancelled');
      }
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YOURKEY',
      amount: data.amount,
      currency: data.currency,
      name: 'YatriHub Premium',
      description: `Booking for ${place.title}`,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = '/razorpay/verify';
          const { data: verifyData } = await axiosInstance.post(verifyUrl, {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            bookingData: {
              place: id,
              checkIn: dateRange.from,
              checkOut: dateRange.to,
              noOfGuests,
              name,
              phone,
              price: totalAmount,
            }
          });

          if (verifyData.success) {
            toast.success('Payment successful! Booking confirmed.');
            setRedirect(`/account/bookings/${verifyData.booking._id}`);
          }
        } catch (error) {
          toast.error('Payment verification failed. Please contact support.');
          setProcessing(false);
        }
      },
      prefill: {
        name: name,
        contact: phone,
        email: user?.email || '',
      },
      theme: {
        color: '#F5385D',
      },
      modal: {
        ondismiss: function () {
          setProcessing(false);
          toast.info('Payment cancelled');
        }
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      toast.error(response.error.description);
      setProcessing(false);
    });
    rzp1.open();
  };

  const handleBooking = async () => {
    if (!user) {
      return setRedirect(`/login`);
    }

    // BOOKING DATA VALIDATION
    if (numberOfNights < 1) {
      return toast.error('Please select valid dates');
    } else if (noOfGuests < 1) {
      return toast.error("No. of guests can't be less than 1");
    } else if (noOfGuests > place.maxGuests) {
      return toast.error(`Allowed max. no. of guests: ${place.maxGuests}`);
    } else if (name.trim() === '') {
      return toast.error("Name can't be empty");
    } else if (phone.trim() === '') {
      return toast.error("Phone can't be empty");
    }

    setProcessing(true);
    try {
      const { data } = await axiosInstance.post('/razorpay/order', {
        amount: totalAmount,
      });
      if (data.success) {
        initPayment(data.order);
      } else {
        toast.error('Unable to initiate payment');
        setProcessing(false);
      }
    } catch (error) {
      toast.error('Something went wrong with the payment gateway!');
      setProcessing(false);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl border border-gray-100 flex flex-col gap-4">
      <div className="flex items-end gap-2 border-b border-gray-100 pb-4">
        <span className="text-2xl font-black text-gray-900">₹{place.price.toLocaleString()}</span>
        <span className="text-sm font-bold text-gray-400 mb-1">night</span>
      </div>

      <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="flex w-full bg-gray-50/50">
          <DatePickerWithRange setDateRange={setDateRange} />
        </div>
        <div className="border-t border-gray-200 py-3 px-4 bg-white">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Guests</label>
          <input
            type="number"
            name="noOfGuests"
            placeholder={`Max. guests: ${place.maxGuests}`}
            min={1}
            max={place.maxGuests}
            value={noOfGuests}
            onChange={handleBookingData}
            className="w-full focus:outline-none text-sm font-bold text-gray-900"
          />
        </div>
        <div className="border-t border-gray-200 py-3 px-4 bg-white">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Full Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleBookingData}
            placeholder="John Doe"
            className="w-full focus:outline-none text-sm font-bold text-gray-900"
          />
        </div>
        <div className="border-t border-gray-200 py-3 px-4 bg-white">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={handleBookingData}
            placeholder="+91 9876543210"
            className="w-full focus:outline-none text-sm font-bold text-gray-900"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <button 
          onClick={handleBooking} 
          disabled={processing || numberOfNights < 1}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg ${
            processing || numberOfNights < 1 
              ? 'bg-gray-300 shadow-none cursor-not-allowed' 
              : 'bg-rose-600 hover:bg-rose-700 hover:-translate-y-1 shadow-rose-500/30'
          }`}
        >
          {processing ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </span>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              Pay Securely • {numberOfNights > 0 ? `₹${totalAmount.toLocaleString()}` : 'Select Dates'}
            </>
          )}
        </button>
        <p className="text-center text-[10px] font-bold text-gray-400 flex items-center justify-center gap-1">
          <CreditCard className="h-3 w-3" /> Secure Razorpay Checkout
        </p>
      </div>

      {numberOfNights > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
          <div className="flex justify-between text-sm text-gray-500 font-medium">
            <span>₹{place.price.toLocaleString()} x {numberOfNights} nights</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-50">
            <span>Total</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingWidget;
