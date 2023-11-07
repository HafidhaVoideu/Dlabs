import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import "./pendingSynergies.css";

const PopupPendingSynergy = ({ pendingSyn, closeModal }) => {
  return (
    <div id="myModal" className="modal  ">
      <div className="modal-content dropshadow">
        <div className="modal__icons">
          <button onClick={closeModal} className="popup__close-btn ">
            <AiOutlineClose />
          </button>
        </div>

        <article className="pyn__popup ">
          <div className="pyn__popup__info">
            <h1 className="pyn__popup__name"> {pendingSyn.name} </h1>
            <img className="pyn__popup__img" src={pendingSyn.img} />
            <h1 className="pyn__popup__price"> {pendingSyn.price} Idkn</h1>
          </div>

          <div className="btns">
            <button className="btn">Confirm</button>
            <button className="btn">Refuse</button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PopupPendingSynergy;
