import React, { useEffect, useState } from "react";
import "./userProfile.css";
import axios from "axios";

const UserProfile = ({ user, getTotalCartItems }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchTotalItems = async () => {
      const count = await getTotalCartItems();
      setTotalItems(count);
    };
    fetchTotalItems();
  }, [getTotalCartItems]);

  const fetchTotalCartAmount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/totalAmount?userId=${user.userId}`
      );
      setTotalAmount(response.data.totalAmount || 0);
    } catch (error) {
      console.error("Error fetching total cart amount:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTotalCartAmount();
    }
  }, [user]);
  return (
    <div className="user-profile">
      <p>
        <strong>UserId:{user?.userId || "Guest"}</strong>
        <p>Total Items in Cart:{totalItems}</p>
        <p>Total Cart Amount : Rs {totalAmount}</p>
      </p>

      {/* <button className="logout-btn">Logout</button> */}
    </div>
  );
};

export default UserProfile;
