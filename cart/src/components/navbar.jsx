import React, { useContext, useEffect, useState } from "react";
//import Link for navigation
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";

import { UserCircle } from "phosphor-react";

//import the context for global state
import { ShopContext } from "../context/shop-context";
import "./navbar.css";

// Lazy load the UserProfile component to avoid circular dependency
const UserProfile = React.lazy(() => import("../pages/profile/userProfile"));

export const Navbar = () => {
  //Access user and cart-related functions from ShopContext
  const { user, getTotalCartItems, cartItems } = useContext(ShopContext);

  //State to track the total number of items in the cart
  const [totalItems, setTotalItems] = useState(0);

  // State to control the visibility of the user profile dropdown
  const [showProfile, setShowProfile] = useState(false);

  // Effect to update total cart items whenever cartItems change
  useEffect(() => {
    const fetchTotalItems = async () => {
      // Get the total item count from the context
      const count = await getTotalCartItems();
      // Update state with the fetched count
      setTotalItems(count);
    };
    fetchTotalItems();
    // Re-run the effect when cartItems change
  }, [cartItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the clicked element is not inside the profile container, close the dropdown
      if (event.target.closest(".profile-container") === null) {
        setShowProfile(false);
      }
    };
    // Add event listener when component mounts
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="navbar">
      {/* Navbar container */}
      <div className="links">
        {/* Links section */}
        <Link to="/">Shop</Link>
        {/* Navigation link to the shop */}

        <Link to="/cart">
          {/* Navigation link to the cart */}
          <ShoppingCart size={32} />
          {/* Display cart icon */}
          {totalItems > 0 && <span className="cart-badge ">{totalItems}</span>}
          {/* Show cart count if > 0 */}
        </Link>
      </div>

      <div className="profile-container">
        {/* User profile section */}
        <UserCircle size={32} onClick={() => setShowProfile(!showProfile)} />
        {/* User icon that toggles profile dropdown */}
        {showProfile && (
          <UserProfile user={user} getTotalCartItems={getTotalCartItems} />
          /* Show profile dropdown if showProfile is true */
        )}
      </div>
    </div>
  );
};
