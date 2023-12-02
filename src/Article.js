// Article.js
import React from "react";
import "./article.css";
import { auth, signOut, database } from "./Firebase";
import { ref, update, get } from "firebase/database";

const Article = ({ article, addToCart, userID }) => {
  const handleAddToCart = async () => {
    // Fetch current cart items from the database
    const snapshot = await get(ref(database, `panier/${userID}`));
    const currentCartItems = snapshot.val()?.cartItems || [];

    // Check if the article is already in the cart
    const existingCartItem = currentCartItems.find(
      (item) => item.articleId === article.id
    );

    if (existingCartItem) {
      // If the article is already in the cart, update its quantity
      const updatedCartItems = currentCartItems.map((item) =>
        item.articleId === article.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      // Update the database with the updated cart items
      update(ref(database, `panier/${userID}`), {
        cartItems: updatedCartItems,
      });
    } else {
      // If the article is not in the cart, add it with quantity 1
      const updatedCartItems = [
        ...currentCartItems,
        { articleId: article.id, quantity: 1 },
      ];

      // Update the database with the updated cart items
      update(ref(database, `panier/${userID}`), {
        cartItems: updatedCartItems,
      });
    }

    // Call the original addToCart function
    addToCart(article);
  };

  return (
    <div className="article">
      <img src={process.env.PUBLIC_URL + article.image} alt={article.name} />
      <div className="article-info">
        <h3>{article.name}</h3>
        <p>{article.description}</p>
        <p>${article.price.toFixed(2)}</p>
        <button onClick={() => handleAddToCart(article)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Article;
