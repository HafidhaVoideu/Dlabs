import React, { useState, useEffect } from "react";
import PopupPendingSynergy from "./PopupPendingSynergy";
import { useGlobalContextUser } from "../../../../context/context";

const PendingSynergy = ({ pensyn }) => {
  const { _project_id, _synergy_id, partnerships } = pensyn;
  const [isModal, setIsModal] = useState(false);

  const { synergies, projects } = useGlobalContextUser();

  const [synProject, setSynProject] = useState({
    image:
      projects?.find((p) => p.project_id === _project_id)?.image ||
      "https://images.pexels.com/photos/6777560/pexels-photo-6777560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    project_name: projects?.find((p) => p.project_id === _project_id)
      .project_name,
    price: synergies?.find((s) => s.id === _synergy_id).price,
    partnerships,
    _synergy_id,
  });

  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = isModal ? "hidden" : "auto";
  }, [isModal]);

  return (
    <>
      {isModal && (
        <PopupPendingSynergy closeModal={closeModal} pendingSyn={synProject} />
      )}
      <article className="synergy active-syn " onClick={openModal}>
        <img
          src={synProject.image}
          alt={synProject.project_name}
          className="synergy__img"
        />

        <div className="synergy__info">
          <h1 className="synergy__name">{synProject.project_name}</h1>
          <p className="synergy__price">{synProject.price} Idkn</p>
        </div>
      </article>
    </>
  );
};

export default PendingSynergy;
