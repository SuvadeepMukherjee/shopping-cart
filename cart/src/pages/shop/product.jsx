import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
  const { _id, productName, price, productImage } = props.data;

  const { addToCart, removeFromCart, cartItems } = useContext(ShopContext);
  // const { addToCart, removeFromCart, updateCartItemCount, cartItems } =
  //   useContext(ShopContext);
  const cartItemAmount = cartItems[_id];

  return (
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
          addToCart(_id);
          // window.location.reload();
        }}
      >
        Add To Cart{cartItemAmount > 0 && <>({cartItemAmount})</>}
      </button>

      <div className="countHandler">
        <button
          onClick={() => {
            removeFromCart(_id);
            //window.location.reload();
          }}
        >
          -
        </button>
        {/* <input
          key={cartItems[_id]}
          value={cartItems[_id]}
          onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}
        /> */}
        <button
          onClick={() => {
            addToCart(_id);
            //window.location.reload();
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};
