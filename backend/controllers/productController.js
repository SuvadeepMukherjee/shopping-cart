const Product = require("../models/Product");
const Cart = require("../models/Cart");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

const getProductQuantityInCart = async (req, res) => {
  try {
    console.log("hitting the controller");
    const { userId } = req.query;
    console.log("userId is", userId);

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    console.log("user id found");

    const cart = await Cart.findOne({ userId }).populate("items.product");
    console.log("cart found");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    console.log("cart not found");

    const cartItems = cart.items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));
    console.log("mapped products");

    res.json({ userId, cartItems });
    console.log("send as response");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProducts, getProductQuantityInCart };
