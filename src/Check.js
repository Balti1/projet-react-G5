import React, { useState, useEffect } from "react";
import "./check.css"; // Import the CSS file
import { auth, database } from "./Firebase";
import { ref, get } from "firebase/database";

const Check = ({ userID }) => {
  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "1",
    email: "1",
    address: "1",
    paymentMethod: "creditCard",
  });

  useEffect(() => {
    // Fetch cart items from the database
    const fetchCartItems = async () => {
      try {
        const snapshot = await get(ref(database, `panier/${userID}/cartItems`));
        const cartItemsData = snapshot.val();

        if (cartItemsData) {
          const cartItemsArray = Object.values(cartItemsData);
          const cartItemsWithDetails = await Promise.all(
            cartItemsArray.map(async (cartItem) => {
              const articleSnapshot = await get(
                ref(database, `articles/${cartItem.articleId}`)
              );
              const articleData = articleSnapshot.val();

              return {
                ...cartItem,
                articleDetails: articleData, // Attach article details to cart item
              };
            })
          );

          setCartItems(cartItemsWithDetails);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error.message);
      }
    };

    fetchCartItems();
  }, [userID]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          email: formData.email, // Make sure to include email in the request
          cartItems,
        }),
      });

      console.log(response); // Log the response to the console

      if (response.ok) {
        const result = await response.json();
        console.log("Email sent:", result);
      } else {
        console.error("Error sending email:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };
  return (
    <div className="checkout-container">
      <h2>Checkout Page</h2>
      <form onSubmit={handleCheckout}>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          onChange={handleInputChange}
          value={formData.fullName}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={handleInputChange}
          value={formData.email}
        />

        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          onChange={handleInputChange}
          value={formData.address}
        />

        <label htmlFor="paymentMethod">Payment Method:</label>
        <select id="paymentMethod">
          <option value="creditCard">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>

        {/* Display cart items with images */}
        <div>
          <h3>Cart Items:</h3>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                Article ID: {item.articleId}, Quantity: {item.quantity}
                <br />
                Article Name: {item.articleDetails.name}
                <br />
                Article Price: {item.articleDetails.price}
                <br />
                <img
                  src={item.articleDetails.image}
                  alt={item.articleDetails.name}
                  style={{ width: "50px", height: "50px" }}
                />
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default Check;
