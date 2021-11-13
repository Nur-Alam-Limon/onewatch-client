import React from "react";
import Cover1 from "../../../img/cover.jpg";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero pb-3">
      <img className="d-block w-100" src={Cover1} alt="" />
    </div>
  );
};

export default Hero;
