import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Article from "./Article";
import "./navbar.css";
import "./article.css";
import Cart from "./Cart";
import { createRoot } from "react-dom";
import Home from "./Home";
import Login from "./login";
import Signup from "./signup";
import Check from "./Check";
import Faq from "./faq";
import { auth, database, firebaseApp } from "./Firebase";
import { set, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const App = () => {
  const [articles, setArticles] = useState([]); // Add this line
  const [displayedPanier, setDisplayedPanier] = useState(null);
  const [user, setUser] = useState(null); // Change prop name to setPageUser

  const createPanier = (userID) => {
    // Create a panier in the database with user ID and cart items
    const panierRef = ref(database, `panier/${userID}`);
    set(panierRef, {
      cartItems: cart.map((item) => ({
        articleId: item.id,
        quantity: item.count,
      })),
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch articles from Firebase Realtime Database
    const databaseRef = ref(database, "articles");

    const fetchData = (snapshot) => {
      try {
        const articlesData = snapshot.val();
        if (articlesData) {
          const articlesArray = Object.values(articlesData);
          setArticles(articlesArray);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const unsubscribe = onValue(databaseRef, fetchData);

    // Cleanup function to remove the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");

  const addToCart = (article) => {
    const existingArticle = cart.find((item) => item.id === article.id);

    if (existingArticle) {
      // If the article is already in the cart, update its count
      const updatedCart = cart.map((item) =>
        item.id === article.id ? { ...item, count: item.count + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // If the article is not in the cart, add it with count 1
      setCart([...cart, { ...article, count: 1 }]);
    }
  };

  const removeFromCart = (articleId) => {
    const updatedCart = cart.filter((item) => item.id !== articleId);
    setCart(updatedCart);
  };

  const placeOrder = async () => {
    try {
      await createPanier(user ? user.uid : null);
      setCurrentPage("check");
    } catch (error) {
      console.error("Error placing order:", error.message);
    }
  };

  const incrementCount = (articleId) => {
    const updatedCart = cart.map((item) =>
      item.id === articleId ? { ...item, count: item.count + 1 } : item
    );
    setCart(updatedCart);
  };

  const decrementCount = (articleId) => {
    const updatedCart = cart.map((item) =>
      item.id === articleId && item.count > 0
        ? { ...item, count: item.count - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const renderPage = () => {
    console.log("articles:", articles);
    switch (currentPage) {
      case "articles":
        return (
          <div>
            <div className="articles-container">
              {articles.map((article) => (
                <Article
                  key={article.id}
                  article={article}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </div>
        );
      case "cart":
        return (
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            placeOrder={placeOrder}
            incrementCount={incrementCount}
            decrementCount={decrementCount}
            userID={user ? user.uid : null} // Pass user ID as a prop
            createPanier={createPanier}
          />
        );
      case "home":
        return <Home />;
      case "Home":
        return <Home />;

      case "check":
        return <Check setUser={setUser} />; // Pass setPageUser as a prop
      case "login":
        return <Login setCurrentPage={setCurrentPage} />;
      case "signup":
        return <Signup />;
      case "faq":
        return <Faq />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
