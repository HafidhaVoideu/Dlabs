import React, { useEffect, useState } from "react";
import "./project.css";
import EditProject from "../editProject/EditProject";
import Popup from "../../../../../components/modal/Popup";
import { useGlobalContextUser } from "../../../../../context/context";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import axios from "../../../../../axios/axios";
import { access_token } from "../../../../../constants/accesToken";
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
  const { projects, setProjects, setFeaturedProjects } = useGlobalContextUser();

  const { project_id, project_name, discord_link, image, website, featured } =
    project;

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow =
      isMoreModal || isEditModal ? "project_hidden" : "auto";
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
      if (project_id === project.project_id) {
        return { ...project, featured: 1 };
      } else return project;
    });

    setProjects([...temp]);
    setFeaturedProjects([...temp.filter((p) => p.featured === 1)]);

    axios
      .patch(`/api/projects/`, {
        projectId: project_id,
        projectData: {
          featured: 1,
        },
      })
      .then((response) => console.log(response));
  };

  const removeFromFeatures = () => {
    const temp = projects.map((project) => {
      if (project_id === project.project_id) {
        return { ...project, featured: 0 };
      } else return project;
    });

    setProjects([...temp]);
    setFeaturedProjects([...temp.filter((p) => p.featured === 1)]);

    axios
      .patch(`/api/projects/`, {
        projectId: project_id,
        projectData: {
          featured: 0,
        },
      })
      .then((response) => console.log(response));
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

      <img
        src={
          image ||
          "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        alt={project_name}
        className="project__img"
      />

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
