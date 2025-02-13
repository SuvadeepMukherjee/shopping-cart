const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");

module.exports.getCart = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart || !cart.items.length) {
      return res.status(200).json({ items: [] });
    }

    const formattedCart = {
      userId: cart.userId,
      items: cart.items
        .filter((item) => item.product) //
        .map((item) => ({
          productId: item.product._id,
          productName: item.product.name || "Unknown Product",
          price: item.product.price || 0,
          productImage: item.product.image || "",
          quantity: item.quantity,
        })),
    };

    res.status(200).json(formattedCart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.addToCart = async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;
    console.log(userId, productId, quantity);

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }
    console.log("validating input");

    const product = await Product.findOne({ _id: String(productId) });
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    console.log("found product");
    // if (!product) {
    //   return res.status(404).json({ message: "Product not found" });
    // }
    console.log("checked if product exists");

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    console.log("found cart or created cart");

    cart.items = cart.items || [];
    console.log(" cart found or created, current items", cart.items);

    const existingItemIndex = cart.items.findIndex(
      (item) => String(item.product) === String(productId)
    );

    console.log("checked if product already exist in cart");

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.log("Error adding to cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    console.log(userId, productId, quantity);

    if (!userId || !productId) {
      return res.status(400).json({ error: "Missing userId or productId" });
    }
    console.log("userId,productId,quantity found");

    const cart = await Cart.findOne({ userId });

    console.log("cart found");

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    console.log("cart not found");

    const existingItemIndex = cart.items.findIndex(
      (item) => String(item.product) === String(productId)
    );

    // const itemIndex = cart.items.findIndex(
    //   (item) => item.productId.toString() === productId
    // );

    console.log("itemIndex found");

    if (existingItemIndex === -1) {
      return res.status(404).json({ error: "Item not in cart" });
    }
    console.log("item in cart");

    if (cart.items[existingItemIndex].quantity > 1) {
      cart.items[existingItemIndex].quantity -= 1;
    } else {
      cart.items.splice(existingItemIndex, 1);
    }

    if (cart.items.length === 0) {
      console.log("Cart is empty, deleting cart...");
      await Cart.deleteOne({ userId }); // Delete cart if empty
      return res.status(200).json({ message: "Cart is now empty", cart: null });
    }

    await cart.save();
    return res.status(200).json({ message: "Item removed from cart", cart });
    console.log("item removed from cart");
  } catch (error) {
    console.error("Error removing item:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports.numberCart = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log("userId", userId);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cart = await Cart.findOne({ userId });
    console.log("found cart");

    if (!cart || !cart.items.length) {
      return res.status(200).json({ totalItems: 0 });
    }

    const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    console.log("totalItems is ", totalItems);

    res.status(200).json({ totalItems });
    console.log("send response");
  } catch (error) {
    console.error("Error fetching cart count:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.totalAmount = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart) {
      return res.json({ totalAmount: 0 });
    }

    let totalAmount = 0;
    for (const item of cart.items) {
      totalAmount += item.product.price * item.quantity;
    }

    res.json({ totalAmount });
  } catch (error) {
    console.error("Error fetching total cart amount:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// module.exports.updateCart = async (req, res, next) => {
//   try {
//     const { userId, productId, quantity } = req.body;
//     console.log("userId", userId, "productId", productId, "quantity", quantity);

//     if (!userId || !productId || quantity === undefined) {
//       return res.status(400).json({ message: "Missing required fields." });
//     }
//     console.log("Fields are there");

//     if (quantity <= 0) {
//       return res
//         .status(400)
//         .json({ message: "Quantity must be greater than zero." });
//     }
//     console.log("quantity greater than zero");

//     let cart = await Cart.findOne({ userId });
//     console.log("cart found");

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found." });
//     }

//     // const itemIndex = cart.items.findIndex(
//     //   (item) => item.productId.toString() === productId
//     // );
//     const existingItemIndex = cart.items.findIndex(
//       (item) => String(item.product) === String(productId)
//     );
//     console.log("item found");

//     if (existingItemIndex === -1) {
//       return res.status(404).json({ message: "Item not found in cart." });
//     }
//     console.log("item Index found");

//     cart.items[existingItemIndex].quantity = quantity; // Update quantity

//     await cart.save();
//     res.status(200).json({ message: "Cart updated successfully.", cart });
//     console.log("response send");
//   } catch (error) {
//     console.error("Error updating cart:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };
