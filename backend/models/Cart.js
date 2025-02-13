const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      product: { type: String, ref: "Product" }, // ✅ Now accepts `id: Number`
      quantity: Number,
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
