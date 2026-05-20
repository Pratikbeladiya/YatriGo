# YatriGo - Premium Travel Booking Platform

## Overview

YatriGo is a fully featured, premium travel and accommodation booking platform developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a highly optimized, high-density user experience inspired by leading accommodation platforms, featuring robust hotel and car search capabilities, booking systems, hosting dashboards, and streamlined payment flows.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Pratikbeladiya/YatriGo.git
   ```

2. **Install dependencies:**

   Navigate to the client directory and install frontend dependencies:

   ```bash
   npm install
   ```

   Similarly, navigate to the api directory and install backend dependencies:

   ```bash
   npm install
   ```

3. **Environment Variables Configuration:**

   - Create a `.env` file in the `client` folder and add these variables:

     ```env
     VITE_BASE_URL=http://localhost:4000
     VITE_GOOGLE_CLIENT_ID=your_google_client_id
     ```

   - Create a `.env` file in the `api` folder and add these variables:

     ```env
     PORT=4000
     DB_URL=your_mongodb_connection_url
     JWT_SECRET=your_jwt_secret_key
     JWT_EXPIRY=20d
     COOKIE_TIME=7
     SESSION_SECRET=your_session_secret_key
     CLOUDINARY_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     CLIENT_URL=http://localhost:5173
     ```

4. **Run the Project:**

   - Open a terminal, navigate to the `client` directory, and run the following command to start the frontend:
     ```bash
      npm start
     ```
   - Open another terminal, navigate to the `api` directory, and run this command to start the backend server:
     ```bash
     npm start
     ```

## Features

- **User Authentication & Google OAuth:** Secure sign-up, login, logout, and integrated Google Auth.

  

- **Advanced Search Listings:** High-density, optimized multi-city search for accommodations and vehicle rentals.



- **Detailed Accommodation & Booking Engine:** Seamless visual gallery, list of custom perks/amenities, and calendar-based booking widget.

  

- **Interactive Bookings Panel:** Overview of all booked places and cars with interactive trip detail cards.

  

- **Comprehensive Hosting Portal:** Hosts can easily add new properties, manage vehicle details, and upload photos directly.

  

- **Premium Responsive Design:** Stunning glassmorphism details, unified typography, and modern visual spacing adapted beautifully to all devices.

  

## Technologies Used

- **MongoDB:** Robust NoSQL database for flexible data persistence.
- **Express.js & Node.js:** Scalable RESTful API development and backend server runtime.
- **React.js:** Single Page Application (SPA) frontend with reactive state management.
- **Tailwind CSS & Shadcn/UI:** Sleek, customizable modern interface building blocks.
- **JSON Web Tokens (JWT):** Secure session validation and cookie-token extraction.
- **Cloudinary:** Reliable, high-performance image uploads and storage.
- **Google Console APIs:** Streamlined email-based client authorization.

