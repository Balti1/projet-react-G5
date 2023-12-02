// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      pageTitle: "Welcome to Our Store",
      welcomeMessage: "Hello, welcome to our website!",
      exploreCategories: "Explore Our Categories",
      addToCart: "Add to Cart",
      "What Our Customers Are Saying": "What Our Customers Are Saying",
      ceramic: "ceramic",
      "Another Customer": "Another Customer",
    },
  },
  fr: {
    translation: {
      pageTitle: "Bienvenue dans notre magasin",
      welcomeMessage: "Bonjour, bienvenue sur notre site web !",
      exploreCategories: "Découvrez nos catégories",
      addToCart: "Ajouter au panier",
      "What Our Customers Are Saying": "Ce que disent nos clients",
      ceramic: "ceramique",
      "Another Customer": "Autre client",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
