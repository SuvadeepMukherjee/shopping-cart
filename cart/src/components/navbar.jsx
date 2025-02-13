//Navbar working but doesnt fetch data from backend
// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { ShoppingCart } from "phosphor-react";
// import { ShopContext } from "../context/shop-context";
// import "./navbar.css";

// export const Navbar = () => {
//   const { getTotalCartItems } = useContext(ShopContext);
//   const totalItems = getTotalCartItems();
//   return (
//     <div className="navbar">
//       <div className="links">
//         <Link to="/">Shop</Link>

//         <Link to="/cart">
//           <ShoppingCart size={32} />
//           {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
//         </Link>
//       </div>
//     </div>
//   );
// };

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { ShopContext } from "../context/shop-context";
import "./navbar.css";

export const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchTotalItems = async () => {
      const count = await getTotalCartItems();
      setTotalItems(count);
    };
    fetchTotalItems();
  }, []);

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Shop</Link>

        <Link to="/cart">
          <ShoppingCart size={32} />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
      </div>
    </div>
  );
};
