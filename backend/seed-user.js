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

// Seed function to add dummy users
const seedUsers = async () => {
  try {
    // List of dummy userIds to add to the database
    const userIds = [
      "65c96f8a1a2b4c001f3d8e9a", // Existing user (already in the database)
      "a24b23c5d3f4g78h90i1j2k3",
      "b34f23e4d5g6h89i12j3k4l5",
      "c45g67h8j9k0l1m2n3o4p5q6",
      "d56h78j9k0l2m3n4o5p6q7r8",
      "e67i89j0k1l2m3n4o5p6q7s9",
    ];

    // Loop through the userIds and create users if they don't already exist
    for (let userId of userIds) {
      const existingUser = await User.findOne({ userId });

      if (existingUser) {
        console.log(`User with ID ${userId} already exists!`);
      } else {
        const newUser = new User({ userId });
        await newUser.save();
        console.log(`Dummy user with ID ${userId} added to the database.`);
      }
    }
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
