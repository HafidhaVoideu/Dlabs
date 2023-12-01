import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";

import ValidatedSyn from "../validatedSynergy/ValidatedSyn";
import { useGlobalContextUser } from "../../../../../../context/context";

import Pagination from "../../../../../../components/pagination/Pagination";
import { maxItems } from "../../../../../../constants/const";

import FilteredSynergies from "../../FilteredSynergies";

const ValidatedSynergies = () => {
  const { search, tab, synergies, projects } = useGlobalContextUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedPorjects, setSearchedProjects] = useState([]);

  const [filteredSyn, setFilteredSyn] = useState([]);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * maxItems;
    const lastPageIndex = firstPageIndex + maxItems;
    return synergies.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, synergies]);

  useEffect(() => {
    if (search) {
      setSearchedProjects([]);
      const projectNames = projects?.map((p) => {
        if (synergies?.map((s) => s._project_id).includes(p.project_id))
          return p.project_name;
      });
      const searchProjectNames = projectNames?.filter((name) =>
        name?.toLowerCase().includes(search?.toLowerCase())
      );
      const mappedProjects = projects?.filter((p) =>
        searchProjectNames.includes(p.project_name)
      );
      const mappedSynergies = synergies?.filter((s) =>
        mappedProjects.map((p) => p.project_id).includes(s._project_id)
      );
      if (mappedSynergies?.length) setSearchedProjects(mappedSynergies);
    }
  }, [search]);

  return (
    <motion.section
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-sec "
      transition={{ duration: 0.6, ease: "easeIn" }}
    >
      <div className="dashboard__options">
        <FilteredSynergies
          setFilteredSyn={setFilteredSyn}
          synergies={synergies}
          searchedPorjects={searchedPorjects}
          min={min}
          max={max}
          setMin={setMin}
          setMax={setMax}
        />
      </div>

      <section className="synergies">
        {filteredSyn.length !== 0 &&
          filteredSyn?.map((syn) => <ValidatedSyn key={syn.id} syn={syn} />)}
        {search &&
          searchedPorjects?.map((syn) => (
            <ValidatedSyn key={syn.id} syn={syn} />
          ))}
        {!search &&
          !filteredSyn.length &&
          !min &&
          !max &&
          currentTableData?.map((syn) => (
            <ValidatedSyn key={syn.id} syn={syn} />
          ))}

        {/* /////////////////////////////////// */}
      </section>
      <Pagination
        currentPage={currentPage}
        totalCount={search ? 0 : synergies.length}
        pageSize={maxItems}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </motion.section>
  );
};

export default ValidatedSynergies;
