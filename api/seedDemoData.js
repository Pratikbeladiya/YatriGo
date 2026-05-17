require('dotenv').config();
const mongoose = require('mongoose');
const connectWithDB = require('./config/db');
const Place = require('./models/Place');
const Car = require('./models/Car');
const User = require('./models/User');

const cities = [
  { name: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Surat', state: 'Gujarat' },
  { name: 'Vadodara', state: 'Gujarat' },
  { name: 'Rajkot', state: 'Gujarat' },
  { name: 'Mumbai', state: 'Maharashtra' },
  { name: 'Pune', state: 'Maharashtra' },
  { name: 'Delhi', state: 'Delhi' },
  { name: 'Jaipur', state: 'Rajasthan' },
  { name: 'Udaipur', state: 'Rajasthan' },
  { name: 'Goa', state: 'Goa' },
  { name: 'Bengaluru', state: 'Karnataka' },
  { name: 'Hyderabad', state: 'Telangana' },
  { name: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Kolkata', state: 'West Bengal' },
  { name: 'Shimla', state: 'Himachal Pradesh' },
  { name: 'Manali', state: 'Himachal Pradesh' },
  { name: 'Ooty', state: 'Tamil Nadu' },
  { name: 'Kochi', state: 'Kerala' },
  { name: 'Munnar', state: 'Kerala' },
  { name: 'Srinagar', state: 'Jammu & Kashmir' },
  { name: 'Rishikesh', state: 'Uttarakhand' },
  { name: 'Darjeeling', state: 'West Bengal' },
  { name: 'Chandigarh', state: 'Chandigarh' },
  { name: 'Agra', state: 'Uttar Pradesh' },
  { name: 'Varanasi', state: 'Uttar Pradesh' },
  { name: 'Amritsar', state: 'Punjab' },
  { name: 'Jodhpur', state: 'Rajasthan' },
  { name: 'Mount Abu', state: 'Rajasthan' },
  { name: 'Lonavala', state: 'Maharashtra' },
  { name: 'Mahabaleshwar', state: 'Maharashtra' },
];

const propertyImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551882547-ff43c61f3fa3?auto=format&fit=crop&w=800&q=80',
];

const carImages = [
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
];

const perksList = ['Wifi', 'Parking', 'Kitchen', 'TV', 'AC', 'Pool', 'Gym', 'Breakfast'];
const carFeatures = ['Automatic', 'Sunroof', 'Leather Seats', 'Bluetooth', 'GPS', 'Child Seat', 'Unlimited Kms'];

const categories = ['Hotel', 'Resort', 'Villa', 'Apartment', 'Homestay', 'Luxury Stay'];
const carTypes = ['Hatchback', 'SUV', 'Sedan', 'Luxury', 'Electric'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'CNG'];
const transmissions = ['Manual', 'Automatic'];

const seed = async () => {
  try {
    await connectWithDB();

    // Create or find a demo admin user
    let demoAdmin = await User.findOne({ email: 'demo@staybnb.com' });
    if (!demoAdmin) {
      demoAdmin = await User.create({
        name: 'StayBnb Demo Host',
        email: 'demo@staybnb.com',
        password: 'password123', // In a real app, hash this
        picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
      });
    }


    const properties = [];
    for (const city of cities) {
      for (let i = 0; i < 3; i++) { // 3 properties per city
        const category = categories[Math.floor(Math.random() * categories.length)];
        properties.push({
          owner: demoAdmin._id,
          title: `${city.name} ${category} ${i + 1}`,
          address: `${Math.floor(Math.random() * 500) + 1}, Main Road, ${city.name}`,
          city: city.name,
          state: city.state,
          photos: [
            propertyImages[Math.floor(Math.random() * propertyImages.length)],
            propertyImages[Math.floor(Math.random() * propertyImages.length)],
          ],
          description: `A beautiful and comfortable ${category.toLowerCase()} located in the heart of ${city.name}. Perfect for vacations and business trips. Enjoy premium amenities and great hospitality.`,
          perks: perksList.sort(() => 0.5 - Math.random()).slice(0, 4),
          extraInfo: 'Check-in: 12:00 PM, Check-out: 11:00 AM. ID proof required.',
          maxGuests: Math.floor(Math.random() * 4) + 2,
          price: Math.floor(Math.random() * 5000) + 1500,
          category,
          ratings: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
          reviewsCount: Math.floor(Math.random() * 200) + 10,
          rooms: Math.floor(Math.random() * 3) + 1,
          isDemo: true,
        });
      }
    }

    await Place.deleteMany({ isDemo: true });
    await Place.insertMany(properties);



    const cars = [];
    for (const city of cities) {
      for (let i = 0; i < 2; i++) { // 2 cars per city
        const carType = carTypes[Math.floor(Math.random() * carTypes.length)];
        cars.push({
          owner: demoAdmin._id,
          carName: `${carType} ${['Swift', 'Innova', 'City', 'Creta', 'BMW 3 Series'][Math.floor(Math.random() * 5)]}`,
          brand: ['Maruti', 'Toyota', 'Honda', 'Hyundai', 'BMW'][Math.floor(Math.random() * 5)],
          model: '2023',
          year: 2023,
          fuelType: fuelTypes[Math.floor(Math.random() * fuelTypes.length)],
          transmission: transmissions[Math.floor(Math.random() * transmissions.length)],
          seatingCapacity: Math.random() > 0.5 ? 5 : 7,
          price: Math.floor(Math.random() * 3000) + 1000,
          location: city.name,
          city: city.name,
          state: city.state,
          description: `Well maintained ${carType} for rent in ${city.name}. Reliable and clean vehicle for your travel needs.`,
          features: carFeatures.sort(() => 0.5 - Math.random()).slice(0, 3),
          photos: [
            carImages[Math.floor(Math.random() * carImages.length)],
          ],
          hostName: 'Demo Host',
          hostContact: '9876543210',
          hostEmail: 'demo@staybnb.com',
          availabilityStatus: true,
          ratings: (Math.random() * 1.5 + 3.5).toFixed(1),
          reviewsCount: Math.floor(Math.random() * 100) + 5,
          isDemo: true,
        });
      }
    }

    await Car.deleteMany({ isDemo: true });
    await Car.insertMany(cars);



    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
