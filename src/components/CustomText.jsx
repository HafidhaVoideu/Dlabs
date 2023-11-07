import React from "react";

import { motion } from "framer-motion";
import { textContainer, textVariant2 } from "../utils/motion";

export const TypingText = ({ title }) => (
  <motion.h1 variants={textContainer} className="typing-text">
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ))}
  </motion.h1>
);

export const TitleText = ({ title }) => (
  <motion.h1 variants={textVariant2} initial="hidden" whileInView="show">
    {title}
  </motion.h1>
);
