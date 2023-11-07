import React, { useEffect, useState } from "react";
import "./project.css";
import EditProject from "../editProject/EditProject";
import Popup from "../../../../../components/modal/Popup";
import { useGlobalContextUser } from "../../../../../context/context";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// todo ****************************************************************

const Project = ({
  project,
  setSelectedProjects,
  selectedProjects,
  isSelectAll,
}) => {
  const [isEditModal, setIsEditModal] = useState(false);
  const [isMoreModal, setIsMoreModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { projects, setProjects } = useGlobalContextUser();

  const { project_id, project_name, discord_link, img, website, featured } =
    project;

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow =
      isMoreModal || isEditModal ? "hproject_idden" : "auto";
  }, [isEditModal, isMoreModal]);

  const closeEditModal = () => {
    setIsEditModal(false);
  };
  const closeMoreModal = () => {
    setIsMoreModal(false);
  };
  const openEditModal = () => {
    setIsEditModal(true);
  };
  const openMoreModal = () => {
    setIsMoreModal(true);
  };

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const addToFeatures = () => {
    const temp = projects.map((project) => {
      if (project_id === project.project_id)
        return { ...project, featured: true };
      else return project;
    });

    setProjects([...temp]);
  };

  const removeFromFeatures = () => {
    const temp = projects.map((project) => {
      if (project_id === project.project_id)
        return { ...project, featured: false };
      else return project;
    });

    setProjects([...temp]);
  };

  useEffect(() => {
    if (isChecked) {
      setSelectedProjects([...selectedProjects, project]);
    } else {
      const filteredProjects = selectedProjects.filter(
        (p) => p.project_id !== project.project_id
      );
      setSelectedProjects([...filteredProjects]);
    }
  }, [isChecked]);

  useEffect(() => {
    if (!selectedProjects.length) setIsChecked(false);
  }, [selectedProjects.length]);

  useEffect(() => {
    if (isSelectAll) {
      setIsChecked(true);
      setSelectedProjects([...projects]);
    } else {
      setIsChecked(false);
      setSelectedProjects([]);
    }
  }, [isSelectAll]);
  return (
    <article className="project">
      <div className="project__select">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleCheckbox()}
        />
      </div>

      <img src={img} alt={project_name} className="project__img" />

      <p className="project__name">{project_name}</p>
      <p className="project__discord">{discord_link}</p>
      <p className="project__website">{website}</p>

      {isMoreModal && (
        <Popup project={project} closeModal={closeMoreModal} icons={false} />
      )}
      {isEditModal && (
        <EditProject project={project} closeModal={closeEditModal} />
      )}

      <div className="project__btns ">
        <button className="project__btn" onClick={() => openEditModal()}>
          <BiEdit />
        </button>
        <button className="project__btn " onClick={() => openMoreModal()}>
          <FiMoreHorizontal />
        </button>
        {featured ? (
          <button className="project__btn heart " onClick={removeFromFeatures}>
            <AiFillHeart />
          </button>
        ) : (
          <button className="project__btn heart " onClick={addToFeatures}>
            <AiOutlineHeart />
          </button>
        )}
      </div>
    </article>
  );
};

export default Project;
