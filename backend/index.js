require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectWithDB = require("./config/db");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

// connect with database
connectWithDB();

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// For handling cookies
app.use(cookieParser());

// Initialize cookie-session middleware
const cookieTime = parseInt(process.env.COOKIE_TIME, 10) || 7;
app.use(
  cookieSession({
    name: "session",
    maxAge: cookieTime * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET || "yatri_go_session_secret_default"],
    secure: true, // Only send over HTTPS
    sameSite: "none", // Allow cross-origin requests
    httpOnly: true, // Makes the cookie accessible only on the server-side
  })
);

// middleware to handle json
app.use(express.json());

// CORS
const clientUrl = process.env.CLIENT_URL;
app.use(
  cors({
    origin: clientUrl ? clientUrl.split(",") : function (origin, callback) {
      callback(null, true);
    },
    credentials: true,
  })
);

// use express router
app.use("/", require("./routes"));

const PORT = parseInt(process.env.PORT, 10) || 8000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in connecting to server: ", err);
  }
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
