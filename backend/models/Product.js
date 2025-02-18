const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  _id: Number,
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["laptop", "mobile", "tshirts", "camera"],
  },
});

module.exports = mongoose.model("Product", ProductSchema);
