import React, { useEffect, useState } from "react";
import "./popup.css";
import { BiLogoDiscord, BiEdit } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { BsGlobe, BsPerson } from "react-icons/bs";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { useGlobalContextUser } from "../../context/context";

import CreatableSelect from "react-select/creatable";

const Popup = ({
  project,
  closeModal,
  icons = true,
  roles,
  formattedPartnerships,
}) => {
  const {
    project_id,
    project_name,
    discord_link,
    image,
    website,
    description,
    twitter,
    rating,
    partnerships,
  } = project;
  const { user, setUser, userProjects } = useGlobalContextUser();

  const options = [
    { value: "role-1", label: "Founder" },
    { value: "role-2", label: "Angel Investor" },
    { value: "role-3", label: "Collab" },
    { value: "role-4", label: "Manager" },
    { value: "role-5", label: "Dev" },
    { value: "role-6", label: "Moderator" },
    { value: "role-7", label: "Project Manager" },
    { value: "role-8", label: "Community Manager" },
    { value: "role-9", label: "Alpha Caller" },
    { value: "role-10", label: "Contenet Creator (text)" },
    { value: "role-11", label: "Contenet Creator (video)" },
    { value: "role-12", label: "Artist" },
    { value: "role-13", label: "Degen" },
    { value: "role-14", label: "Graphic Designer" },
    { value: "role-15", label: "Video Editor" },
    { value: "role-16", label: "Community Member" },
    { value: "role-17", label: "Press/news" },
  ];

  let formattedRoles;

  if (roles)
    formattedRoles = roles?.map((role) => {
      return { label: role, value: role };
    });

  const [selectedRoles, setSelectedRoles] = useState(formattedRoles);
  const [error, setError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleCreate = (inputValue) => {
    const formattedInputValue = { label: inputValue, value: inputValue };
    setSelectedRoles((prev) => [...prev, formattedInputValue]);
  };

  const deleteProject = () => {
    const projectToDelete = userProjects.filter(
      (project) => project.project_id !== project_id
    );
    setUser({ ...user, projects: projectToDelete });
  };

  const editProject = () => {
    setIsEdit(true);
  };

  useEffect(() => {
    if (isEdit) {
      setError(false);
      if (!selectedRoles.length) setError(true);
      else {
        const changedRoles = userProjects.map((project) => {
          if (project.project_id === project_id)
            return { ...project, roles: selectedRoles };
          else return project;
        });

        setUser({ ...user, projects: changedRoles });
      }
    }
  }, [selectedRoles]);

  return (
    <div id="myModal" className="modal  ">
      <div className="modal-content ">
        <div className="modal__icons">
          {icons && (
            <div className="popup__btns">
              <button className="popup__delete-btn" onClick={deleteProject}>
                <AiFillDelete />
              </button>
              <button className="popup__delete-btn" onClick={editProject}>
                <BiEdit />
              </button>
            </div>
          )}

          <button onClick={closeModal} className="popup__close-btn">
            <AiOutlineClose />
          </button>
        </div>

        <article className="popup ">
          <img
            src={
              image ||
              " https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="project-cover"
            className="popup__img"
          />
          <div className="profile__project__info">
            <h1 className="profile__project__name">{project_name}</h1>
            {roles && (
              <>
                {isEdit ? (
                  <>
                    <CreatableSelect
                      className="popup__select"
                      value={selectedRoles}
                      options={options}
                      onChange={(roles) => {
                        setSelectedRoles(roles);
                      }}
                      onCreateOption={handleCreate}
                      isClearable={false}
                      isSearchable
                      classNamePrefix="react-select"
                      isMulti
                      styles={{ width: "100%" }}
                    />

                    {error && (
                      <p className="popup__error">
                        {" "}
                        * please select at least one role{" "}
                      </p>
                    )}
                  </>
                ) : (
                  <ul className="profile__project__role  separator ">
                    <li>
                      <BsPerson />
                    </li>
                    {roles?.map((role, i) => (
                      <li key={i}>{role}</li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {partnerships && (
              <ul className="profile__project__partnerships separator">
                <li>Partnerships:</li>

                {formattedPartnerships?.map((p, i) => (
                  <li key={i}> &#9679;{p} </li>
                ))}
              </ul>
            )}

            <div className="popup__des-div">
              <h1 className="popup__des-label">Description</h1>
              <p className="popup__des">{description}</p>
            </div>

            <div className="popup__des-rating">
              <p>
                Rating: <span>{rating}</span>
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="profile__project__links">
            {/* Discord */}

            <div className="profile__project__link">
              <button>
                <BiLogoDiscord />
              </button>
              <a href="#"> {discord_link} </a>
            </div>

            {/*Twitter*/}
            <div className="profile__project__link">
              <button>
                <FaXTwitter />
              </button>
              <a href="#"> {twitter} </a>
            </div>

            <div className="profile__project__link">
              <button>
                <BsGlobe />
              </button>
              <a href="#"> {website} </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Popup;
