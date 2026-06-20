require('dotenv').config();
const connectWithDB = require('./config/db');
const Place = require('./models/Place');
const User = require('./models/User');

connectWithDB();

const seedData = async () => {
  try {
    await User.deleteMany({});
    await Place.deleteMany({});

    const user = await User.create({
      name: 'StayBnb Admin',
      email: 'admin@staybnb.local',
      password: 'password123',
      picture:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
    });

    await Place.create([
      {
        owner: user._id,
        title: 'Cozy Downtown Apartment',
        address: '123 Main Street, City Center',
        photos: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
        ],
        description: 'A warm, modern place close to all major attractions.',
        perks: ['wifi', 'kitchen', 'parking'],
        extraInfo: 'Check in after 2pm. No pets allowed.',
        maxGuests: 4,
        price: 125,
      },
      {
        owner: user._id,
        title: 'Beachfront Studio with Sea View',
        address: '456 Ocean Avenue, Seaside',
        photos: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
        ],
        description: 'Bright studio with direct access to the beach.',
        perks: ['wifi', 'pool', 'air conditioning'],
        extraInfo: 'Perfect for couples or solo travelers.',
        maxGuests: 2,
        price: 180,
      },
    ]);


    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
