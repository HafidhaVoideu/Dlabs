import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "../../../../axios/axios";
import "./pendingSynergies.css";

const PopupPendingSynergy = ({ pendingSyn, closeModal }) => {
  console.log("pending Synergy", pendingSyn);
  const handleConfirm = () => {
    // open link

    axios
      .delete(`/api/synergyrequests/`, {
        synergy_id: pendingSyn._synergy_id,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    closeModal();
  };

  const handleRefuse = () => {
    axios
      .delete(`/api/synergyrequests/`, {
        synergy_id: pendingSyn._synergy_id,
      })
      .then((response) => console.log(response));

    closeModal();
  };

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
            <h1 className="pyn__popup__name"> {pendingSyn.project_name} </h1>
            <img className="pyn__popup__img" src={pendingSyn.image} />
            <p className="pyn__popup__partnerships">
              Partnerships: {pendingSyn.partnerships}
            </p>
          </div>

          <div className="btns">
            <button className="btn" onClick={handleRefuse}>
              Refuse
            </button>

            <button className="btn" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PopupPendingSynergy;
