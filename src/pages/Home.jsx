import React from "react";
import Hero from "../components/Hero";
import Causes from "../components/Causes";
import Donate from "../components/Donate";
import CausewayFunds from "../components/CausewayFunds";
import AboutSection from "../components/AboutSection";
import DonorBasics from "../components/DonorBasics";
import GivingBasket from "../components/GivingBasket";
import GallerySlider from "../components/GallerySlider";

const Home = () => {
  return (
    <div>
      <Hero />
      <Causes />
      <GallerySlider />
      <Donate />
      <CausewayFunds />
      <AboutSection />
      <DonorBasics />
      <GivingBasket />
    </div>
  );
};

export default Home;
