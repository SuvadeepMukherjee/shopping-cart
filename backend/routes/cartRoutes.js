const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
  //updateCart,
  numberCart,
  totalAmount,
} = require("../controllers/cartController");

const router = express.Router();

router.get(
  "/numberCart",
  (req, res, next) => {
    console.log(" numberCart route is hit!");
    next();
  },
  numberCart
);
router.get("/totalAmount", totalAmount);
//router.put("/updateCart", updateCart);
router.post("/add", addToCart);
router.delete("/remove", removeFromCart);

router.get("/:userId", getCart);

module.exports = router;
