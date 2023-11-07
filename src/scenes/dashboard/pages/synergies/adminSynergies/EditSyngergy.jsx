import React, { useState } from "react";
import Select from "react-select";

import { useGlobalContextUser } from "../../../../../context/context";
const EditSyngergy = ({ setIsModal }) => {
  const [select, setSelect] = useState();
  const [price, setPrice] = useState();
  const { synergies, setSynergies } = useGlobalContextUser();

  const options = synergies.map((p) => {
    return { value: p.id, label: p.name };
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const temp = synergies.map((s) => {
      if (s.id === select.value) {
        return { ...s, price };
      } else return s;
    });

    setSynergies(temp);
    setIsModal(false);
  };

  return (
    <article className="synergy-op">
      <h1 className="synergy-op__title">Edit Price</h1>
      <form id="editSynForm" onSubmit={handleSubmit} className="form">
        <label htmlFor="syn" className="form__label">
          Synergies
        </label>
        <Select
          id="syn"
          className="select"
          defaultvalue={select}
          onChange={(select) => setSelect(select)}
          isClearable={false}
          isSearchable={true}
          options={options}
          name="secondary projects"
        />

        <label htmlFor="price" className="form__label">
          price
        </label>
        <input
          className="form__input"
          id="price"
          name="price"
          type="text"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value) || "")}
          placeholder="enter your price"
        />
        <button type="submit" className="btn">
          ok
        </button>
      </form>
    </article>
  );
};

export default EditSyngergy;
