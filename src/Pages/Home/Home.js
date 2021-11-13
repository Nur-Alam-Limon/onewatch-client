import React from "react";
import Contact from "./Contact/Contact";
import Hero from "./Hero/Hero";
import Products from "./Products/Products";
import Reviews from "./Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Hero />
      <Products></Products>
      <Reviews></Reviews>
      <Contact></Contact>
    </div>
  );
};

export default Home;
