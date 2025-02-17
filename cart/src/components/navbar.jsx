import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
//Made Changes for User Profile
import { UserCircle } from "phosphor-react";
//Made Changes for User Profile
import { ShopContext } from "../context/shop-context";
import "./navbar.css";

const UserProfile = React.lazy(() => import("../pages/profile/userProfile"));
//Made Changes for User Profile

export const Navbar = () => {
  //Made changes for User Profile
  const { user } = useContext(ShopContext);
  //Made changes for User Profile
  const { getTotalCartItems, cartItems } = useContext(ShopContext);
  const [totalItems, setTotalItems] = useState(0);

  //Made Changes for User Profile
  const [showProfile, setShowProfile] = useState(false);
  //Made Changes for User Profile

  useEffect(() => {
    const fetchTotalItems = async () => {
      const count = await getTotalCartItems();
      setTotalItems(count);
    };
    fetchTotalItems();
  }, [cartItems]);
  console.log(cartItems);
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Shop</Link>

        <Link to="/cart">
          <ShoppingCart size={32} />
          {totalItems > 0 && <span className="cart-badge ">{totalItems}</span>}
        </Link>
      </div>
      {/* Made changes to User Profile Section */}
      <div className="profile-container">
        <UserCircle size={32} onClick={() => setShowProfile(!showProfile)} />
        {showProfile && <UserProfile user={user} />}
      </div>
      {/*Made Changes to User Profile Section */}
    </div>
  );
};
