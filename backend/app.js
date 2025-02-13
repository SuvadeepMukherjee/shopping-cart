require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = 5000;
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses query parameters

// Serve static files from the "public/images" directory when accessed via "/images" URL path
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connectDB();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
