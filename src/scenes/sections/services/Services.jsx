import React from "react";
import Service from "../../../components/service/Service";
import { motion } from "framer-motion";
import Title from "../../../components/Title";
import { services } from "../../../data/services";

import "./services.css";

const Services = () => {
  return (
    <section id="services" className="section">
      <Title text="Services" />

      <section className="container ">
        <motion.section className="services">
          {services.map((service) => (
            <Service key={service.id} {...service} />
          ))}
        </motion.section>
      </section>
    </section>
  );
};

export default Services;
