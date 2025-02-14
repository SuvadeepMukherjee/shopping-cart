const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // Ensures the use of the  URL parser
      useNewUrlParser: true,
      // Enables the Server Discovery and Monitoring engine
      useUnifiedTopology: true,
    });
    console.log(" MongoDB Connected");
  } catch (error) {
    console.error(" MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
