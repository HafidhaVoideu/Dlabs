import React, { useState, useEffect } from "react";
import FeaturedPopup from "./FeaturedPopup";

const Fproject = ({ project }) => {
  const [isModal, setIsModal] = useState(false);
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

  const { project_name, description, image } = project;

  return (
    <>
      {isModal && <FeaturedPopup closeModal={closeModal} fproject={project} />}
      <article className="profile__project" onClick={openModal}>
        <img
          src={
            image ||
            "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt="project-cover"
          className="profile__project__img"
        />
        <div className="profile__project__info">
          <h1 className="profile__project__name">{project_name}</h1>
          <p className="profile__project__des">
            {description?.substring(0, 90)}
            <span> ...Read More</span>
          </p>
        </div>
      </article>
    </>
  );
};

export default Fproject;
