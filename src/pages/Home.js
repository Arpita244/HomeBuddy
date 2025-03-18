import React from "react";
import "../styles.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to HomeBuddy</h1>
      <p>Find professionals for your daily tasks easily and generate AI-based recipes!</p>
      <div className="buttons">
        <button onClick={() => window.location.href = "/services"}>Find Services</button>
        <button onClick={() => window.location.href = "/recipe"}>Generate Recipe</button>
      </div>
    </div>
  );
};

export default Home;