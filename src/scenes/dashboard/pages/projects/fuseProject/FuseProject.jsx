import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Select from "react-select";
import { useGlobalContextUser } from "../../../../../context/context";
import "./fuseProject.css";

const FuseProject = ({ closeModal }) => {
  const [page, setPage] = useState(0);
  const [select, setSelect] = useState();
  const [multipleSelect, setMultipleSelect] = useState([]);
  const { projects, setAlert, setProjects } = useGlobalContextUser();

  const [masterOptions, setMasterOptions] = useState();

  const options = projects.map((p) => {
    return { value: p.project_id, label: p.project_name };
  });
  useEffect(() => {
    // the whole obkject is being selected

    const options2 = options.filter(
      (op) => !multipleSelect?.map((o) => o.value).includes(op.value)
    );

    setMasterOptions(options2);
  }, [multipleSelect]);

  const nextPage = () => {
    setPage((page) => (page = page + 1));
  };
  const previousPage = () => {
    setPage((page) => (page = page - 1));
  };

  const handleFusion = () => {
    const temp = projects.filter(
      (p) => !multipleSelect.map((sp) => sp.value).includes(p.project_id)
    );

    console.log("temp:", temp);
    setProjects(temp);

    closeModal();
    setAlert({
      isAlert: true,
      alertMessage: `Projects have been fused`,
    });
  };

  const secondaryProjectsPanel = (
    <article className="fuse-panel__article">
      <p>select projects </p>

      <Select
        className="fuse-panel__select"
        value={multipleSelect}
        onChange={(multipleSelect) => setMultipleSelect(multipleSelect)}
        isClearable={true}
        isSearchable={true}
        options={options}
        isMulti
        name="master project"
      />
      <button onClick={nextPage} className="btn">
        next
      </button>
    </article>
  );

  const masterProjectPanel = (
    <article className="fuse-panel__article">
      <p>select master project</p>

      <Select
        className="fuse-panel__select"
        value={select}
        onChange={(select) => setSelect(select)}
        isClearable={false}
        isSearchable={true}
        options={masterOptions}
        name="secondary projects"
      />

      <div className="btns">
        <button className="btn" onClick={previousPage}>
          previous
        </button>
        <button className="btn" onClick={handleFusion}>
          Fuse
        </button>
      </div>
    </article>
  );

  return (
    <div id="myModal" className="modal  ">
      <div className="modal-content  ">
        <div className="modal__icons">
          <button onClick={closeModal} className="popup__close-btn margin--top">
            <AiOutlineClose />
          </button>
        </div>

        <div className="fuse-panel">
          <h1 className="fuse-panel__title">Fuse Projects</h1>
          {page === 0 ? secondaryProjectsPanel : masterProjectPanel}
        </div>
      </div>
    </div>
  );
};

export default FuseProject;
