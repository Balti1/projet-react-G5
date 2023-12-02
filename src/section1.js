import React from "react";
import "./section.css";

const Section1 = () => {
  return (
    <section className="section1">
      <div className="text-container">
        <div className="text-overlay">
          <h2>Harmonie parfaite : Artisanat & Style</h2>
          <p>
            Explorez des produits qui allient harmonieusement l’artisanat et le
            style pour rehausser votre maison
          </p>
        </div>
      </div>
      <div className="video-container">
        <div className="overlay"></div>
        <img
          src={process.env.PUBLIC_URL + "anber.jpg"}
          className="background-image"
        />
      </div>
    </section>
  );
};

export default Section1;
