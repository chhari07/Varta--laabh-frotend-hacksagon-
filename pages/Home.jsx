// eslint-disable-next-line no-unused-vars
import React from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Howitworks from "../components/Howitworks";
import Newletter from "../components/Newletter";
import Features from "./Features";


const Home = () => {
  return (
    <div      >
      <Hero/>
      <Categories/>
      <Features/>
 
      <Howitworks/>
      <Newletter/>
    </div>
  );
};

export default Home;
