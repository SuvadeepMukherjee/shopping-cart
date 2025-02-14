// //This is the frontend code that uses shop-context and works fine
// import React, { useContext } from "react";
// import { ShopContext } from "../../context/shop-context";

// export const CartItem = (props) => {
//   const { id, productName, price, productImage } = props.data;
//   const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
//     useContext(ShopContext);
//   return (
//     <div className="cartItem">
//       <img src={productImage} alt={productImage} />
//       <div className="description">
//         <p>
//           <b>{productName}</b>
//         </p>
//         <p>Rs{price}</p>
//         <div className="countHandler">
//           <button onClick={() => removeFromCart(id)}>-</button>
//           <input
//             value={cartItems[id]}
//             onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
//           />
//           <button onClick={() => addToCart(id)}>+</button>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const { _id, productName, price, productImage } = props.data;
  const { addToCart, removeFromCart } = useContext(ShopContext);
  // const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
  //   useContext(ShopContext);

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
              //window.location.reload();
            }}
          >
            -
          </button>
          {/* <input
            type="number"
            //key={cartItems[id]}
            value={cartItems[_id] || 0}
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
    </div>
  );
};
