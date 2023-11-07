import React, { useState, useEffect } from "react";
import PopupPendingSynergy from "./PopupPendingSynergy";

const PendingSynergy = ({ pensyn }) => {
  const { img, name, price } = pensyn;
  const [isModal, setIsModal] = useState(false);
  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    console.log("close");
    setIsModal(false);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = isModal ? "hidden" : "auto";
  }, [isModal]);

  return (
    <>
      {isModal && (
        <PopupPendingSynergy closeModal={closeModal} pendingSyn={pensyn} />
      )}
      <article className="synergy active-syn " onClick={openModal}>
        <img src={img} alt={name} className="synergy__img" />

        <div className="synergy__info">
          <h1 className="synergy__name">{name}</h1>
          <p className="synergy__price">{price} Idkn</p>
        </div>
      </article>
    </>
  );
};

export default PendingSynergy;
