import React, { useEffect, useState } from "react";

import * as Yup from "yup";

import { AiOutlineClose, AiOutlineFileAdd } from "react-icons/ai";
import { useGlobalContextUser } from "../../../../context/context";
import Select from "react-select";
import axios from "../../../../axios/axios";
import CreatableSelect from "react-select/creatable";

import { stringify } from "uuid";

const AddProject = ({ closeModal }) => {
  const { projects, setAlert, user } = useGlobalContextUser();
  4;

  const options = projects.map((p) => {
    return { value: p.project_id, label: p.project_name };
  });

  const options2 = [
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

  const [multipleSelect, setMultipleSelect] = useState([options2[0]]);
  const [select, setSelect] = useState(options[0]);

  useEffect(() => {
    const temp = multipleSelect.map((p) => p.label);
    console.log(
      "roles:",

      JSON.stringify(temp)
    );
  }, [multipleSelect.length]);

  const isValidUrl = (url) => {
    try {
      new URL(url);
    } catch (e) {
      return false;
    }
    return true;
  };

  const handleCreate = (inputValue) => {
    const formattedInputValue = { label: inputValue, value: inputValue };
    setMultipleSelect((prev) => [...prev, formattedInputValue]);
  };

  useEffect(() => {
    console.log("multiple Selecet:", multipleSelect);
  }, [multipleSelect]);

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post("/api/userprojects/", {
        _duser_id: user.id,
        _project_id: select.value,
        job_desc: "dd",
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });

    setAlert({ isAlert: true, alertMessage: "Project has been submitted" });
    closeModal();
  };

  return (
    <div className="modal  ">
      <div className="modal-content dropshadow">
        <div className="modal__icons">
          <button
            type="button"
            onClick={closeModal}
            className="popup__close-btn"
          >
            <AiOutlineClose />
          </button>
        </div>

        <form className="form" onSubmit={handleAdd}>
          {/* Select Projects */}
          <div className="form__div">
            <label className="form__label">select project </label>
            <Select
              className="fuse-panel__select"
              value={select}
              onChange={(select) => setSelect(select)}
              isClearable={false}
              isSearchable={true}
              options={options}
              name=" projecs"
            />
          </div>

          {/* Select Roles*/}

          <div className="form__div">
            <label className="form__label">select roles </label>

            <CreatableSelect
              className="fuse-panel__select"
              value={multipleSelect}
              onChange={(multipleSelect) => setMultipleSelect(multipleSelect)}
              isClearable={false}
              isSearchable={true}
              options={options2}
              isMulti
              onCreateOption={handleCreate}
              name="master project"
              classNamePrefix="react-select"
            />
          </div>

          <button
            type="submit"
            className="btn"
            style={{ maxWidth: "200px", margin: "2rem auto 0" }}
          >
            {" "}
            Submit{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
