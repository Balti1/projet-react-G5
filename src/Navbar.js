import React from "react";
import { useTranslation } from "react-i18next"; // Importer le hook useTranslation
import i18n from "./i18n"; // Importer l'instance i18n

import "./navbar.css";

const Navbar = ({ setCurrentPage }) => {
  const { t } = useTranslation(); // Utiliser le hook useTranslation pour accéder aux traductions

  // Fonction pour changer la langue
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Changer la langue en utilisant l'instance i18n
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={process.env.PUBLIC_URL + "Logo.png"} alt="logo" />
      </div>
      <ul className="nav-items">
        <li>
          <a href="#" onClick={() => setCurrentPage("Home")}>
            Home
          </a>
        </li>
        <li>
          <a href="#" onClick={() => setCurrentPage("A propos")}>
            A propos
          </a>
        </li>
        <li>
          <a href="#" onClick={() => setCurrentPage("faq")}>
            FAQ
          </a>
        </li>
        <li>
          <a href="#" onClick={() => setCurrentPage("articles")}>
            Articles
          </a>
        </li>
        <li>
          <a href="#" onClick={() => setCurrentPage("cart")}>
            Cart
          </a>
        </li>
      </ul>
      <div className="user-icons">
        <div className="cart-icon">
          <img src={process.env.PUBLIC_URL + "cart.png"} alt="Cart" />
        </div>

        <div className="profile-icon">
          <a href="#" onClick={() => setCurrentPage("login")}>
            <img src={process.env.PUBLIC_URL + "user.png"} alt="Profile" />
          </a>
        </div>
        <div className="language-buttons">
          <button onClick={() => changeLanguage("en")}>EN</button>
          <button onClick={() => changeLanguage("fr")}>FR</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
