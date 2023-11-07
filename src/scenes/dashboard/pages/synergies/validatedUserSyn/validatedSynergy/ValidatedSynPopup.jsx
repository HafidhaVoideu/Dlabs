import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import CreatableSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import Select from "react-select";

import { useGlobalContextUser } from "../../../../../../context/context";

const ValidatedSynPopup = ({ validatedSyn, closeModal }) => {
  const { projects, user } = useGlobalContextUser();

  const [page, setPage] = useState(0);

  const [select, setSelect] = useState();
  const [multipleSelect, setMultipleSelect] = useState([]);

  const handleBtn = () => {
    setPage((prev) => (prev = prev + 1));
  };

  const partnerships = [
    {
      value: "question1",
      label:
        "Getting whitelist spots from great Web3 projects for my community",
    },
    {
      value: "question2",
      label:
        "Giving whitelists spots to our community for your upcoming project",
    },
    {
      value: "question3",
      label: "Hosting AMAs with high tier projects",
    },
    {
      value: "question4",
      label:
        "Getting whitelists spots from great Web3 projects for my community",
    },
    {
      value: "question5",
      label:
        "Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences",
    },
    {
      value: "question6",
      label:
        " Integrating your own branded assets in some high quality Web3 games for cross-pollination of audiences and adding utility for your project / community",
    },
    {
      value: "question7",
      label:
        "Getting early alpha to write threads / (be the first to) alpha call",
    },
    {
      value: "question8",
      label: " Sharing early alpha and getting some eyeballs on it",
    },
  ];
  const myprojects = user.projects.map((p) => {
    return { value: p.id, label: p.name };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="myModal" className="modal  ">
      <div className="modal-content">
        <div className="modal__icons">
          <button onClick={closeModal} className="popup__close-btn margin--top">
            <AiOutlineClose />
          </button>
        </div>

        {page === 0 && (
          <article className="vsyn__popup ">
            <div className="vsyn__popup__info">
              <h1 className="vsyn__popup__name"> {validatedSyn.name} </h1>
              <img className="vsyn__popup__img" src={validatedSyn.img} />
              <h1 className="vsyn__popup__price"> {validatedSyn.price} </h1>
            </div>
            <button className="vsyn__popup__btn" onClick={handleBtn}>
              Synergize with {validatedSyn.name}
            </button>
          </article>
        )}

        {page === 1 && (
          <article className="vsyn__page ">
            <img className="vsyn__page__img" src={validatedSyn.img} />

            <form onSubmit={handleSubmit} className="vsyn__page__form">
              <label htmlFor="vsyn-cselect">Partnerships</label>
              <CreatableSelect
                id="vsyn-cselect"
                className="vsyn__page__cselec"
                isMulti
                value={multipleSelect}
                onChange={(choice) => setMultipleSelect(choice)}
                onCreateOption={(label) => {
                  const partnership = { id: uuidV4(), label };
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                isClearable={false}
                isSearchable
                options={partnerships}
              />

              <label htmlFor="vsyn-cselect">Projects</label>
              <Select
                id="vsyn-cselect"
                className="vsyn__page__select"
                value={select}
                onChange={(choice) => setSelect(choice)}
                isMulti
                isClearable={false}
                isSearchable
                options={myprojects}
              />
              <button type="submit" className="vsyn__page__btn">
                Validate{" "}
              </button>
            </form>
          </article>
        )}
      </div>
    </div>
  );
};

export default ValidatedSynPopup;
