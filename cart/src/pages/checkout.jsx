import React, { useEffect, useState } from "react";
import axios from "axios";

// Checkout component: Handles the checkout process for a user
export const Checkout = () => {
  // State hook to store cart data (null initially, until fetched)
  const [cartData, setCartData] = useState(null);
  // State hook to store the total cart amount (initially set to 0)
  const [totalAmount, setTotalAmount] = useState(0);
  const userId = "65c96f8a1a2b4c001f3d8e9a";

  // useEffect hook to fetch the cart data from the API when the component is mounted or userId changes
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/products-in-cart?userId=${userId}`
        );
        //console.log("Cart data fetched:", response.data);
        // Updating the state with the fetched cart data
        setCartData(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    // Calling the function to fetch the cart data
    fetchCartData();
  }, [userId]); // Dependency array containing userId ensures this effect runs whenever userId changes

  // useEffect hook to fetch the total cart amount when the component is mounted or userId changes
  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cart/totalAmount?userId=${userId}`
        );
        //console.log("Total amount fetched:", response.data.totalAmount);
        // Updating the state with the fetched total amount
        setTotalAmount(response.data.totalAmount || 0);
      } catch (error) {
        console.error("Error fetching total amount:", error);
      }
    };

    fetchTotalAmount();
  }, [userId]); // Dependency array containing userId ensures this effect runs whenever userId changes
  return (
    <div>
      <h1>Checkout Page</h1>
      {/* Conditional rendering: If cartData is available, display the cart details, else show a loading message */}
      {cartData ? (
        <div>
          <h2>Cart for User: {cartData.userId}</h2>
          {/* Mapping over the cartItems array to render details of each item in the cart */}
          {cartData.cartItems.map((item, index) => (
            // Rendering each cart item and displaying its image, name, price, and quantity
            <div key={index} style={{ marginBottom: "20px" }}>
              <img
                src={item.product.productImage}
                alt={item.product.productName}
                width="150"
              />
              <h3>{item.product.productName}</h3>
              <p>Price: Rs {item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
              {/* <p>Description: {item.product.description}</p> */}
            </div>
          ))}
          <h2>Total Amount: Rs {totalAmount}</h2>
        </div>
      ) : (
        <p>Loading cart items...</p>
      )}
    </div>
  );
};

export default Checkout;
