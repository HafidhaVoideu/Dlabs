import React from "react";
import "./partner.css";

import { easeInOut, motion } from "framer-motion";
import brand from "../../assets/brand-logo.png";

import "./partner.css";

const Partner = ({ name, logo }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: -22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        ease: easeInOut,
        delay: 0.1,
      }}
      className="partner"
    >
      <img src={logo} alt="brand-logo" className="patner__image" />

      <h1 className="partner__title">{name}</h1>
    </motion.article>
  );
};

export default Partner;
