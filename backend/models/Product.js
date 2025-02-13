const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  _id: Number,
  productName: String,
  price: Number,
  productImage: String,
  description: String,
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
