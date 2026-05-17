import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '@/utils/axios';
import Spinner from '@/components/ui/Spinner';
import AddressLink from '@/components/ui/AddressLink';
import CarBookingWidget from '@/components/ui/CarBookingWidget';
import CarGallery from '@/components/ui/CarGallery';

const CarPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const getCar = async () => {
      try {
        const { data } = await axiosInstance.get(`/cars/${id}`);
        setCar(data.car);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getCar();
  }, [id]);

  if (loading) return <Spinner />;
  if (!car) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 tracking-tight">{car.brand} {car.carName}</h1>
      
      <AddressLink placeAddress={car.location} />
      <div className="mt-6">
        <CarGallery car={car} />
      </div>

      <div className="mt-8 mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr] items-start">
        <div className="">
          <div className="my-4">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-gray-700 leading-relaxed">{car.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 my-8 p-6 bg-gray-50 rounded-2xl">
            <div>
              <p className="text-gray-500">Model</p>
              <p className="font-semibold">{car.model} ({car.year})</p>
            </div>
            <div>
              <p className="text-gray-500">Fuel Type</p>
              <p className="font-semibold">{car.fuelType}</p>
            </div>
            <div>
              <p className="text-gray-500">Transmission</p>
              <p className="font-semibold">{car.transmission}</p>
            </div>
            <div>
              <p className="text-gray-500">Seats</p>
              <p className="font-semibold">{car.seatingCapacity} Passengers</p>
            </div>
          </div>

          <div className="my-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="flex flex-wrap gap-2">
              {car.features?.map((feature) => (
                <span key={feature} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {feature.replace('_', ' ').toUpperCase()}
                </span>
              ))}
            </div>
          </div>

        </div>
        
        <div>
          <CarBookingWidget car={car} />
        </div>
      </div>
      
      <div className="-mx-8 border-t bg-white px-8 py-8">
        <div>
          <h2 className="mt-4 text-2xl font-semibold">Host Information</h2>
        </div>
        <div className="mb-4 mt-4 grid gap-4 sm:grid-cols-2">
          <div className="p-4 border rounded-xl bg-gray-50">
            <p className="text-gray-500 text-sm">Host Name</p>
            <p className="font-semibold text-lg">{car.hostName}</p>
          </div>
          <div className="p-4 border rounded-xl bg-gray-50">
            <p className="text-gray-500 text-sm">Contact Details</p>
            <p className="font-semibold">{car.hostContact}</p>
            <p className="text-blue-600">{car.hostEmail}</p>
          </div>
        </div>
        
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Policies</h2>
            <ul className="list-disc pl-5 text-gray-700">
                {car.pickupAvailability && <li>Pickup is available for this car.</li>}
                {car.insuranceIncluded && <li>Insurance is included in the rental price.</li>}
                {car.availabilityStatus ? <li>Car is currently available for booking.</li> : <li className="text-red-500">Car is temporarily unavailable.</li>}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default CarPage;
