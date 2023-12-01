import React, { useEffect } from "react";
const FilteredSynergies = ({
  setFilteredSyn,
  synergies,
  min,
  max,
  setMin,
  setMax,
  searchedProjects,
}) => {
  useEffect(() => {
    let filteredSynergies;
    let synergiesTemp;

    if (searchedProjects?.length) synergiesTemp = searchedProjects;
    else synergiesTemp = synergies;

    if (max && min) {
      filteredSynergies = synergiesTemp.filter(
        (s) => s.price >= min && s.price <= max
      );
      setFilteredSyn(filteredSynergies);
    } else if (max) {
      filteredSynergies = synergiesTemp.filter((s) => s.price <= max);
      setFilteredSyn(filteredSynergies);
    } else if (min) {
      filteredSynergies = synergiesTemp.filter((s) => s.price >= min);
      setFilteredSyn(filteredSynergies);
    } else setFilteredSyn([]);
  }, [min, max]);

  return (
    <form className="filtersyn">
      <div>
        <label htmlFor="min" className="filtersyn__label">
          Min
        </label>
        <input
          id="min"
          type="text"
          name="min"
          value={min}
          className="filtersyn__input"
          onChange={(e) => setMin(Number(e.target.value) || "")}
          placeholder="min price"
          min="0"
        />
      </div>

      <div className="filtersyn__divider"></div>
      <div>
        <label htmlFor="max" className="filtersyn__label">
          Max
        </label>
        <input
          id="max"
          type="text"
          name="max"
          value={max}
          className="filtersyn__input"
          onChange={(e) => setMax(Number(e.target.value) || "")}
          placeholder="max price"
          min="0"
        />
      </div>
    </form>
  );
};

export default FilteredSynergies;
