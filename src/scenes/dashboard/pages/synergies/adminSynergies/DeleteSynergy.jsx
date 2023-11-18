import React, { useState } from "react";
import Select from "react-select";
import { useGlobalContextUser } from "../../../../../context/context";

import axios from "axios";

import { access_token } from "../../../../../constants/accesToken";
const DeleteSynergy = ({ setIsModal }) => {
  const { synergies, setSynergies, projects } = useGlobalContextUser();
  const mappedOptions = projects
    .filter((p) => synergies?.map((s) => s._project_id).includes(p.project_id))
    .map((p) => {
      return { value: p.project_id, label: p.project_name };
    });

  const [multipleSelect, setMultipleSelect] = useState([mappedOptions[0]]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const temp = synergies.filter(
      (s) => !multipleSelect?.map((ms) => ms.value).includes(s._project_id)
    );

    const selectedMapped = synergies.filter((s) =>
      multipleSelect.map((m) => m.value).includes(s._project_id)
    );

    axios.all(
      selectedMapped.map((s) =>
        axios.delete(`http://68.183.108.138:3000/api/synergies/`, {
          headers: { Authorization: `Bearer ${access_token}` },
          data: {
            synergy_id: s.id,
          },
        })
      )
    );

    setSynergies([...temp]);
    setIsModal(false);
  };
  return (
    <article className="synergy-op">
      <h1 className="synergy-op__title">Delete Synergies </h1>
      <form id="dltSynForm" onSubmit={handleSubmit} className="form">
        <label htmlFor="syn" className="form__label">
          Synergies
        </label>
        <Select
          className="fuse-panel__select"
          value={multipleSelect}
          onChange={(multipleSelect) => setMultipleSelect(multipleSelect)}
          isClearable={false}
          isSearchable={true}
          options={mappedOptions}
          isMulti
          name="master project"
        />

        <button type="submit" className="btn">
          ok
        </button>
      </form>
    </article>
  );
};

export default DeleteSynergy;
