import React from "react";
import "./members.css";
import { motion, easeIn } from "framer-motion";
import Title from "../../../components/Title";
import { Tilt } from "react-tilt";
import { members } from "../../../data/members";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      ease: easeIn,
    },
  },
};

const card = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.2, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

const Card = ({ name, job, img }) => {
  return (
    <Tilt options={defaultOptions}>
      <motion.article variants={card} className="card ">
        <article className=" card__article   ">
          <div className="avatar glow-effect" data-glow-animation="grow">
            <img src={img} alt="profile" className="card__img" />
            <svg className="glow-container">
              <rect
                pathLength="100"
                strokeLinecap="round"
                className="glow-blur"
              ></rect>
              <rect
                pathLength="100"
                strokeLinecap="round"
                className="glow-line"
              ></rect>
            </svg>
          </div>

          <div>
            <h2>{name}</h2>
            <p>{job}</p>
          </div>
        </article>
      </motion.article>
    </Tilt>
  );
};

const Members = () => {
  return (
    <section id="members" className="section">
      <Title text=" The win-Win  Society" />

      <section className="container ">
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          className="members "
          viewport={{ once: true }}
        >
          {members.map((m) => (
            <Card key={m.id} {...m} />
          ))}
        </motion.section>
      </section>
    </section>
  );
};

export default Members;
