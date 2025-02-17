import React, { useEffect, useState } from "react";
import axios from "axios";

export const Checkout = () => {
  const [cartData, setCartData] = useState(null);
  const userId = "65c96f8a1a2b4c001f3d8e9a";

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/products-in-cart?userId=${userId}`
        );
        console.log("Cart data fetched:", response.data);
        setCartData(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [userId]);

  return (
    <div>
      <h1>Checkout Page</h1>
      {cartData ? (
        <div>
          <h2>Cart for User: {cartData.userId}</h2>
          {cartData.cartItems.map((item, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <img
                src={item.product.productImage}
                alt={item.product.productName}
                width="150"
              />
              <h3>{item.product.productName}</h3>
              <p>Price: Rs {item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Description: {item.product.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading cart items...</p>
      )}
    </div>
  );
};

export default Checkout;
