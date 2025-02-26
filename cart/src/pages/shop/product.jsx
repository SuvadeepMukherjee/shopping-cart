import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

// Product component receives props as input
export const Product = (props) => {
  const { _id, productName, price, productImage } = props.data;

  const { addToCart, removeFromCart, cartItems } = useContext(ShopContext);

  // Getting the current amount of the item in the cart from the cartItems object
  const cartItemAmount = cartItems[_id]?.quantity || 0;

  return (
    // Container for each product's display
    <div className="product">
      <img src={productImage} alt={productName} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>Rs{price}</p>
      </div>
      <button
        className="addToCartBttn"
        onClick={() => {
          // Calling the addToCart function from context when the button is clicked, passing the product _id
          addToCart(_id);
        }}
      >
        {/* Display "Add To Cart" button with a count of the cart item if it's greater than 0 */}
        Add To Cart{cartItemAmount > 0 && <>({cartItemAmount})</>}
      </button>

      {/* Container for the count handler buttons to adjust the cart item quantity */}
      <div className="countHandler">
        <button
          onClick={() => {
            removeFromCart(_id);
          }}
        >
          -
        </button>

        <button
          onClick={() => {
            addToCart(_id);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};
