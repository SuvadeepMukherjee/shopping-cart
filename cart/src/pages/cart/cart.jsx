import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../../context/shop-context";
// Import the CartItem component for rendering each cart item
import { CartItem } from "./cart-item";
import "./cart.css";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const [products, setProducts] = useState([]); // State to store fetched products
  // State to store the total amount in the cart
  const [totalAmount, setTotalAmount] = useState(0);

  //hook to  navigate to different routes
  const navigate = useNavigate();

  // useEffect to fetch total cart amount whenever getTotalCartAmount changes
  useEffect(() => {
    const fetchTotalAmount = async () => {
      // Get total cart amount from the context
      const amount = await getTotalCartAmount();
      // Set the total amount in the local state
      setTotalAmount(amount);
    };
    // Call the function to fetch total amount
    fetchTotalAmount();
  }, [getTotalCartAmount]); // This effect runs when getTotalCartAmount changes

  // useEffect to fetch all the products from the server only once when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        // Set the fetched products to the state
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    // Call the function to fetch products
    fetchProducts();
  }, []); // This effect runs only once when the component mounts

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {products
          .filter((product) => cartItems[product._id] > 0) // Only show items in cart
          .map(
            (
              product // Map through filtered products
            ) => (
              <CartItem key={product._id} data={product} /> // Render CartItem for each product
            )
          )}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: Rs {totalAmount}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          {/* Button to navigate back to home page */}
          <button onClick={() => navigate("/checkout")}>Checkout</button>
          {/* Button to navigate to checkout page */}
        </div>
      ) : (
        <h1>Your Cart is Empty</h1>
      )}
    </div>
  );
};
