import React, { useEffect, useState } from "react";
import "./userProfile.css";
import axios from "axios";

// UserProfile component takes `user` and `getTotalCartItems` as props
const UserProfile = ({ user, getTotalCartItems }) => {
  // Initializes totalItems state to 0
  const [totalItems, setTotalItems] = useState(0);
  // Initializes totalAmount state to 0
  const [totalAmount, setTotalAmount] = useState(0);

  // useEffect hook to fetch the total number of items in the cart when the component mounts or getTotalCartItems changes
  useEffect(() => {
    const fetchTotalItems = async () => {
      // Await the total cart items count from the parent component
      const count = await getTotalCartItems();
      // Update state with the total cart items count
      setTotalItems(count);
    };
    // Call the fetch function to get the total items in the cart
    fetchTotalItems();
  }, [getTotalCartItems]); // The dependency array ensures the effect runs when getTotalCartItems changes

  // Function to fetch the total cart amount from the server for the specific user
  const fetchTotalCartAmount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/totalAmount?userId=${user.userId}`
      );
      // Set the totalAmount state with the response data
      setTotalAmount(response.data.totalAmount || 0);
    } catch (error) {
      console.error("Error fetching total cart amount:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTotalCartAmount();
    }
  }, [user]); // Dependency array makes sure the effect runs whenever the `user` changes

  return (
    <div className="user-profile">
      <p>
        <strong>UserId:{user?.userId || "Guest"}</strong>
        <p>Total Items in Cart:{totalItems}</p>
        <p>Total Cart Amount : Rs {totalAmount}</p>
      </p>
    </div>
  );
};

export default UserProfile;
