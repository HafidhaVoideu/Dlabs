import React from "react";
import Header from "../global/header/Header";
import Home from "../sections/home/Home";
import Services from "../sections/services/Services";
import Members from "../sections/members/Members";
import Partners from "../sections/partners/Partners";
import About from "../sections/about/About";

import MainFooter from "../global/footer/MainFooter";

const Homepage = () => {
  return (
    <>
      <Header />
      <Home />
      <Services />
      <Members />
      <Partners />
      <About />
      <MainFooter />
    </>
  );
};

export default Homepage;
