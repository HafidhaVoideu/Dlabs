import React from "react";
import Partner from "../../../components/partner/Partner";
import Title from "../../../components/Title";
import "./partners.css";
import { partners } from "../../../data/partners";

const Partners = () => {
  return (
    <section id="partners" className="section">
      <Title text="Track Record & Partners" />

      <div className="container">
        <section className="  partners  ">
          {partners.map((p) => (
            <Partner key={p.id} {...p} />
          ))}
        </section>
      </div>
    </section>
  );
};

export default Partners;
