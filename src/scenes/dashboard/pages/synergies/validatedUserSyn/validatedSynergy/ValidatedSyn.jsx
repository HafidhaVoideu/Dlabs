import React, { useState, useEffect } from "react";
import ValidatedSynPopup from "./ValidatedSynPopup";

import "./validatedSyn.css";
import { useGlobalContextUser } from "../../../../../../context/context";

const ValidatedSyn = ({ syn }) => {
  const [isModal, setIsModal] = useState(false);

  const { projects } = useGlobalContextUser();
  const [synProject, setSynProject] = useState({
    image: null,
    project_name: null,
  });
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

  const { _project_id, price, image, project_name } = syn;

  useEffect(() => {
    const findSynProject = projects.find((p) => p.project_id === _project_id);
    setSynProject({
      image:
        image ||
        findSynProject?.image ||
        "https://images.pexels.com/photos/14354118/pexels-photo-14354118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      project_name: project_name || findSynProject?.project_name,
    });
  }, []);

  return (
    <>
      {isModal && (
        <ValidatedSynPopup
          closeModal={closeModal}
          project_name={synProject.project_name}
          image={synProject.image}
          price={price}
        />
      )}

      <article className="synergy   vsyn  " onClick={openModal}>
        <img
          src={synProject.image}
          alt={synProject.project_name}
          className="synergy__img"
        />

        <div className="synergy__info">
          <h1 className="synergy__name">{synProject.project_name}</h1>
          <p className="synergy__price">{price} Idkn</p>
        </div>
      </article>
    </>
  );
};

export default ValidatedSyn;
