// This is the frontend code that works fine but doesnt interact with database
// import React, { createContext, useState } from "react";

// //Creating a new context named ShopContext with an initial value of null
// //ShopContext is used to access the provided values inside other components
// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//   //Initializing an empty object to represent the cart
//   let cart = {};

//   for (let i = 1; i < PRODUCTS.length + 1; i++) {
//     // Setting the initial quantity of each product in the cart to 0.
//     //to prevent Undefined Errors
//     cart[i] = 0;
//   }
//   return cart;
// };

// /*
// ShopContextProvider manages the state
// and provides it to all components inside it.
// */
// export const ShopContextProvider = (props) => {
//   // Creating a state variable cartItems and initializing it with an empty cart.
//   const [cartItems, setCartItems] = useState(getDefaultCart());

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
//         totalAmount += cartItems[item] * itemInfo.price;
//       }
//     }
//     return totalAmount;
//   };

//   // Updating cartItems state by increasing the count of the specified item by 1.
//   const addToCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//   };

//   // Updating cartItems state by decreasing the count of the specified item by 1.

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//   };

//   // Updating cartItems state by setting a new amount for a specific item.
//   const updateCartItemCount = (newAmount, itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
//   };

//   // Summing up the total number of items in the cart and returning it.
//   const getTotalCartItems = () => {
//     return Object.values(cartItems).reduce((acc, item) => acc + item, 0);
//   };

//   // Creating an object with all cart-related functions and state to be shared across the application.
//   const contextValue = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateCartItemCount,
//     getTotalCartAmount,
//     getTotalCartItems,
//   };

//   // Providing the ShopContext to all child components using the Provider component.
//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };
//import { PRODUCTS } from "../products";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  //This part was changed
  const [totalItems, setTotalItems] = useState(0);
  //This part was changed
  const userId = "65c96f8a1a2b4c001f3d8e9a";

  // Fetch cart from backend
  // fetches the cart data for a specific user from the backend and updates the cart state in the frontend
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
      //changed
      fetchTotalCartItems();
      //changed
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  //changed
  // Fetch total cart items
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
  //changed

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Add item to cart
  const addToCart = async (itemId) => {
    try {
      const obj = { userId, productId: itemId, quantity: 1 };
      console.log(obj);
      await axios.post("http://localhost:5000/api/cart/add", obj);
      console.log("Added to cart:", obj);
      //await fetchCartItems();
      setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      }));
      console.log("fetchCartItems  working");

      //changed
      fetchTotalCartItems();
      //changed
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
          return prev; // Don't make any changes
        }

        if (updatedCart[itemId] === 1) {
          alert("This item is already at 1. Removing it completely.");
          delete updatedCart[itemId]; // Remove from frontend state
        } else {
          updatedCart[itemId] -= 1; // Decrease quantity normally
        }

        //changed
        fetchTotalCartItems();
        //changed
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
  const contextValue = {
    userId,
    cartItems,
    addToCart,
    removeFromCart,
    //updateCartItemCount,
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

// const updateCartItemCount = (newAmount, itemId) => {
//   setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
// };

// const updateCartItemCount = async (itemId, quantity) => {
//   try {
//     const obj = { userId, productId: itemId, quantity };
//     await axios.post("http://localhost:5000/api/cart/updateCart", obj);

//     setCartItems((prev) => {
//       const updatedCart = { ...prev };

//       if (quantity === 0) {
//         delete updatedCart[itemId]; // Remove item if quantity is 0
//       } else {
//         updatedCart[itemId] = quantity;
//       }

//       return updatedCart;
//     });
//   } catch (error) {
//     console.error("Error updating cart:", error);
//   }
// };
