import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";

import { UserCircle } from "phosphor-react";

import { ShopContext } from "../context/shop-context";
import "./navbar.css";

const UserProfile = React.lazy(() => import("../pages/profile/userProfile"));

export const Navbar = () => {
  const { user } = useContext(ShopContext);
  const { getTotalCartItems, cartItems } = useContext(ShopContext);

  //const { getTotalCartItems, cartItems } = useContext(ShopContext);
  const [totalItems, setTotalItems] = useState(0);

  const [showProfile, setShowProfile] = useState(false);

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

      <div className="profile-container">
        <UserCircle size={32} onClick={() => setShowProfile(!showProfile)} />
        {showProfile && (
          <UserProfile user={user} getTotalCartItems={getTotalCartItems} />
        )}
      </div>
    </div>
  );
};
