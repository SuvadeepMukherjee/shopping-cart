const mongoose = require("mongoose");
const Product = require("./Product");
const User = require("./User");
const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      product: { type: String, ref: "Product" },
      quantity: Number,
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
