import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const userId = "65c96f8a1a2b4c001f3d8e9a";
  //Made changes for User Profile
  const [user, setUser] = useState(null);
  //Made changes for User Profile

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/${userId}`
      );

      console.log("Fetched Cart Data:", response.data);

      const cartData = response.data.items.reduce((acc, item) => {
        if (item.productId) {
          acc[item.productId] = item.quantity;
        }
        return acc;
      }, {});

      setCartItems(cartData);

      fetchTotalCartItems();
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const fetchTotalCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/numberCart?userId=${userId}`
      );
      setTotalItems(response.data.totalItems || 0);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Add item to cart
  //itemId is the product ID of the item being added to the cart(passed as an argument when calling addToCart)
  const addToCart = async (itemId) => {
    try {
      const obj = { userId, productId: itemId, quantity: 1 };
      //console.log(obj);
      await axios.post("http://localhost:5000/api/cart/add", obj);
      //console.log("Added to cart:", obj);

      //find the object then update it
      setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      }));
      console.log("fetchCartItems  working ", cartItems);

      fetchTotalCartItems();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      const obj = { userId, productId: itemId, quantity: 1 };
      await axios.delete("http://localhost:5000/api/cart/remove", {
        data: obj,
      });
      setCartItems((prev) => {
        const updatedCart = { ...prev };

        if (!updatedCart[itemId]) {
          alert("This item is already at 0 and cannot be reduced further.");
          return prev; // Don't make any changes to obj
        }

        if (updatedCart[itemId] === 1) {
          alert("This item is already at 1. Removing it completely.");
          delete updatedCart[itemId]; // Remove from frontend state
        } else {
          updatedCart[itemId] -= 1; // Decrease quantity normally
        }

        fetchTotalCartItems();

        return updatedCart;
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const getTotalCartAmount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/totalAmount?userId=${userId}`
      );
      return response.data.totalAmount || 0;
    } catch (error) {
      console.error("Error fetching total cart amount:", error);
      return 0;
    }
  };

  const getTotalCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/numberCart?userId=${userId}`
      );
      return response.data.totalItems || 0;
    } catch (error) {
      console.error("Error fetching cart count:", error);
      return 0;
    }
  };

  //Made changes for User Profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/profile/${userId}`
        );
        console.log("response received from user controller");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUser();
  }, []);

  //Made changes for User Profile
  const contextValue = {
    //Made changes for user-profile
    user,
    //Made changes for user-profile
    userId,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    fetchCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
