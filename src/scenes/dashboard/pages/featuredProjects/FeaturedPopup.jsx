import React from "react";
import { BiLogoDiscord } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { BsGlobe } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const FeaturedPopup = ({ closeModal, fproject }) => {
  const { project_name, description, image, twitter, discord_link, website } =
    fproject;

  return (
    <div id="myModal" className="modal  ">
      <div className="modal-content dropshadow">
        <div className="modal__icons">
          <button onClick={closeModal} className="popup__close-btn">
            <AiOutlineClose />
          </button>
        </div>

        <article className="popup ">
          <img
            src={
              image ||
              "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="project-cover"
            className="popup__img"
          />
          <div className="profile__project__info">
            <h1 className="profile__project__name">{project_name}</h1>

            <div className="popup__des-div">
              <h1 className="popup__des-label">Description</h1>
              <p className="popup__des">{description}</p>
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

export default FeaturedPopup;
