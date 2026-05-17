const mongoose = require('mongoose');

const connectWithDB = () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`DB connected successfully`))
    .catch((err) => {


      process.exit(1);
    });
};

module.exports = connectWithDB;
