import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import "./cart.css";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const [products, setProducts] = useState([]); // State to store fetched products

  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      const amount = await getTotalCartAmount();
      setTotalAmount(amount);
    };
    fetchTotalAmount();
  }, [getTotalCartAmount]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {products
          .filter((product) => cartItems[product._id] > 0) // Only show items in cart
          .map((product) => (
            <CartItem key={product._id} data={product} />
          ))}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: Rs {totalAmount}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button onClick={() => navigate("/checkout")}>Checkout</button>
        </div>
      ) : (
        <h1>Your Cart is Empty</h1>
      )}
    </div>
  );
};
