import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "./home.css";
import Section1 from "./section1";

const Home = () => {
  const { t } = useTranslation(); // Hook pour accéder aux traductions

  const featuredItems = [
    {
      image: "ceramique.jpg",
      title: t("Ceramic"), // Traduire la clé "Ceramic"
      description: "mimimiw",
    },
    {
      image: "koffa.jpg",
      title: "Couffin",
      description: "Couffin vert",
    },
    // Add more featured items as needed
  ];

  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentFeaturedIndex(
      (prevIndex) =>
        (prevIndex - 1 + featuredItems.length) % featuredItems.length
    );
  };

  const handleNextClick = () => {
    setCurrentFeaturedIndex(
      (prevIndex) => (prevIndex + 1) % featuredItems.length
    );
  };

  return (
    <div className="home-container">
      {/* Featured Product Section */}
      <Section1 />
      <section className="featured-section">
        <div className="featured-product">
          <img
            src={
              process.env.PUBLIC_URL + featuredItems[currentFeaturedIndex].image
            }
            alt={featuredItems[currentFeaturedIndex].title}
          />
          <div className="product-details">
            <h2>{featuredItems[currentFeaturedIndex].title}</h2>
            <p>{featuredItems[currentFeaturedIndex].description}</p>
            <button>{t("addToCart")}</button>
          </div>
        </div>
        {/* Navigation Arrows */}
        <div className="featured-navigation">
          <button onClick={handlePrevClick} className="prev-button">
            &lt;
          </button>
          <button onClick={handleNextClick} className="next-button">
            &gt;
          </button>
        </div>
      </section>
      <section className="categories-section">
        <h2>{t("exploreCategories")}</h2>
        <div className="category1">
          <div className="category">
            <p>Trends</p>
          </div>
          <section className="promotions-section">
            <div className="promotion">
              <img src={process.env.PUBLIC_URL + "jeté2.jpg"} alt="Promotion" />
              <div className="promotion-details">
                <h3>Jéte </h3>
                <p className="price">99.99 TND</p>
              </div>
            </div>

            <div className="promotion">
              <img
                src={process.env.PUBLIC_URL + "jeté.jpg"}
                alt="Promotion 2"
              />
              <div className="promotion-details">
                <h3>Jeté</h3>
                <p className="price">79.99TND</p>
              </div>
            </div>

            <div className="promotion">
              <img
                src={process.env.PUBLIC_URL + "klim.jpg"}
                alt="Promotion 3"
              />
              <div className="promotion-details">
                <h3>klim</h3>
                <p className="price">39.99TND</p>
              </div>
            </div>
            {/* Add more promotions as needed */}
          </section>
        </div>
        <div className="category">
          <p>Promotions</p>
        </div>
        {/* Add more categories as needed */}
      </section>
      {/* Promotions Section */}
      <section className="promotions-section">
        <div className="promotion">
          <img src={process.env.PUBLIC_URL + "zarbeya.jpg"} alt="Promotion" />
          <div className="promotion-details">
            <h3>Zarbeya 1</h3>
            <p className="original-price">99.99 TND</p>
            <p className="promoted-price">79.99 TND</p>
          </div>
        </div>

        <div className="promotion">
          <img
            src={process.env.PUBLIC_URL + "zarbeya2.jpg"}
            alt="Promotion 2"
          />
          <div className="promotion-details">
            <h3>Zarbeya 2</h3>
            <p className="original-price">79.99TND</p>
            <p className="promoted-price">59.99TND</p>
          </div>
        </div>

        <div className="promotion">
          <img src={process.env.PUBLIC_URL + "koffa.jpg"} alt="Promotion 3" />
          <div className="promotion-details">
            <h3>Couffin</h3>
            <p className="original-price">39.99TND</p>
            <p className="promoted-price">14.99TND</p>
          </div>
        </div>
        {/* Add more promotions as needed */}
      </section>
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>{t("What Our Customers Are Saying")}</h2>
        <div className="testimonial">
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</p>
          <p>- Customer Name</p>
        </div>
        <div className="testimonial">
          <p>
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          </p>
          <p>- {t("Another Customer")}</p>
        </div>
        {/* Add more testimonials as needed */}
      </section>
    </div>
  );
};

export default Home;
