const express = require("express");
const {
  getProducts,
  getProductQuantityInCart,
} = require("../controllers/productController");

const router = express.Router();

router.get("/products-in-cart", getProductQuantityInCart);
router.get("/", getProducts);

module.exports = router;
