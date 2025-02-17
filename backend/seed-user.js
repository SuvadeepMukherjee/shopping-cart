const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config(); // To load your MongoDB URI from .env file

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

// Seed function to add dummy user
const seedUsers = async () => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      userId: "65c96f8a1a2b4c001f3d8e9a",
    });
    if (existingUser) {
      console.log("User already exists!");
      return;
    }

    // Create a dummy user
    const newUser = new User({
      userId: "65c96f8a1a2b4c001f3d8e9a",
    });

    // Save the user to the database
    await newUser.save();
    console.log("Dummy user added to the database.");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Run the seed function
const run = async () => {
  await connectDB();
  await seedUsers();
};

run();
