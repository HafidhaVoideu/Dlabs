import React, { useState } from "react";
import ValidatedSynPopup from "./ValidatedSynPopup";

import "./validatedSyn.css";

const ValidatedSyn = ({ syn }) => {
  const { id, img, name, price } = syn;
  const [isModal, setIsModal] = useState(false);
  const closeModal = () => {
    setIsModal(false);
  };
  const openModal = () => {
    setIsModal(true);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = isModal ? "hidden" : "auto";
  }, [isModal]);

  return (
    <>
      {isModal && (
        <ValidatedSynPopup closeModal={closeModal} validatedSyn={syn} />
      )}
      <article className="synergy   vsyn  " onClick={openModal}>
        <img src={img} alt={name} className="synergy__img" />

        <div className="synergy__info">
          <h1 className="synergy__name">{name}</h1>
          <p className="synergy__price">{price} Idkn</p>
        </div>
      </article>
    </>
  );
};

export default ValidatedSyn;
