import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const { _id, productName, price, productImage } = props.data;
  const { addToCart, removeFromCart } = useContext(ShopContext);
  useContext(ShopContext);

  return (
    <div className="cartItem">
      <img src={productImage} alt={productName} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>Rs {price}</p>

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
    </div>
  );
};
