const mongoose = require('mongoose');

const connectWithDB = () => {
  mongoose.set('strictQuery', false);
  
  if (!process.env.DB_URL) {
    console.error("=================================================================");
    console.error("ERROR: DB_URL environment variable is NOT defined!");
    console.error("Please add DB_URL to your environment variables on Render.");
    console.error("Example: DB_URL=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/staybnb");
    console.error("=================================================================");
    process.exit(1);
  }

  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`DB connected successfully`);
    })
    .catch((err) => {
      console.error("=================================================================");
      console.error("DB connection failed!");
      console.error("Please make sure:");
      console.error("1. Your DB_URL connection string is correct and includes the password.");
      console.error("2. If using MongoDB Atlas, your IP Access List allows connections from everywhere (0.0.0.0/0), as Render servers use dynamic IP addresses.");
      console.error("=================================================================");
      console.error(err);
      process.exit(1);
    });
};

module.exports = connectWithDB;
