// Cart.js
import React from "react";
import "./cart.css";

const Cart = ({
  cart,
  removeFromCart,
  placeOrder,
  incrementCount,
  decrementCount,
  userID,
  createPanier,
}) => {
  const totalQuantity = cart.reduce((total, item) => total + item.count, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cart.length > 0 ? (
        <div>
          <p>Total Items in Cart: {totalQuantity}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                {item.name} - ${item.price} - Quantity: {item.count}
                <div className="cart-buttons">
                  <button
                    className="minus"
                    onClick={() => decrementCount(item.id)}
                  >
                    -
                  </button>
                  <button
                    className="add"
                    onClick={() => incrementCount(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() =>
              placeOrder(() => createPanier(user ? user.uid : null))
            }
          >
            Place Order
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
