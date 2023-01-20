const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;
const connect = () => {
  return mongoose.connect(mongoURI);
};

module.exports = connect;
