import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "./product";
import "./shop.css";

// Shop component: Displays a list of products in the shop
export const Shop = () => {
  // State hook to store the list of products fetched from the API, initialized as an empty array
  const [products, setProducts] = useState([]);

  // useEffect hook to fetch the product data from the server when the component is first mounted
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        // Updating the products state with the response data (fetched products)
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    // Calling the fetchProducts function to initiate the data fetching process
    fetchProducts();
  }, []); // Empty dependency array means this effect runs only once, after the initial render

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Shop</h1>
      </div>
      <div className="products">
        {/* Mapping over the products array and rendering a Product component for each product */}
        {products.map((product) => (
          // Passing each product's data as a prop to the Product component
          <Product key={product.id} data={product} /> // Render fetched products
        ))}
      </div>
    </div>
  );
};
