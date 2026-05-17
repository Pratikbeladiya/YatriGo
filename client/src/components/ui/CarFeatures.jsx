import React from 'react';

const CarFeatures = ({ selected, handleFormData }) => {
  return (
    <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
      <label className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4">
        <input type="checkbox" checked={selected.includes('air_conditioning')} name="air_conditioning" onChange={handleFormData} />
        <span>AC</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4">
        <input type="checkbox" checked={selected.includes('gps')} name="gps" onChange={handleFormData} />
        <span>GPS</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4">
        <input type="checkbox" checked={selected.includes('bluetooth')} name="bluetooth" onChange={handleFormData} />
        <span>Bluetooth</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4">
        <input type="checkbox" checked={selected.includes('usb')} name="usb" onChange={handleFormData} />
        <span>USB Port</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4">
        <input type="checkbox" checked={selected.includes('sunroof')} name="sunroof" onChange={handleFormData} />
        <span>Sunroof</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4">
        <input type="checkbox" checked={selected.includes('child_seat')} name="child_seat" onChange={handleFormData} />
        <span>Child Seat</span>
      </label>
    </div>
  );
};

export default CarFeatures;
