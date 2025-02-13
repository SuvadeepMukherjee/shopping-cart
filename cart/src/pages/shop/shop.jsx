/* This code is from frontend final working 
// import React from "react";
// import { PRODUCTS } from "../../products";
// import { Product } from "./product";
// import "./shop.css";

// export const Shop = () => {
//   return (
//     <div className="shop">
//       <div className="shopTitle">
//         <h1>Shop</h1>
//       </div>
//       <div className="products">
//         {PRODUCTS.map((product) => (
//           <Product data={product} />
//         ))}
//       </div>
//     </div>
//   );
// };
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "./product";
import "./shop.css";

export const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Shop</h1>
      </div>
      <div className="products">
        {products.map((product) => (
          <Product key={product.id} data={product} /> // Render fetched products
        ))}
      </div>
    </div>
  );
};
