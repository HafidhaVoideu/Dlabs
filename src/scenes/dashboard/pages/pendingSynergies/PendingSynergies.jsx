import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useGlobalContextUser } from "../../../../context/context";
import PendingSynergy from "./PendingSynergy";
import Pagination from "../../../../components/pagination/Pagination";
import { maxItems } from "../../../../constants/const";
import FilteredSynergies from "../synergies/FilteredSynergies";

const PendingSynergies = () => {
  const { pendingSynergies, search, tab } = useGlobalContextUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSyn, setFilteredSyn] = useState([]);
  const [searchedPorjects, setSearchedProjects] = useState([]);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  // add max/min

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * maxItems;
    const lastPageIndex = firstPageIndex + maxItems;
    return pendingSynergies.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pendingSynergies]);

  useEffect(() => {
    if (search) {
      setSearchedProjects([]);
      const projectNames = projects.map((p) => {
        if (pendingSynergies?.map((s) => s._project_id).includes(p.project_id))
          return p.project_name;
      });
      const searchProjectNames = projectNames.filter((name) =>
        name?.toLowerCase().includes(search?.toLowerCase())
      );
      const mappedProjects = projects.filter((p) =>
        searchProjectNames.includes(p.project_name)
      );
      const mappedSynergies = pendingSynergiessynergies.filter((s) =>
        mappedProjects.map((p) => p.project_id).includes(s._project_id)
      );
      if (mappedSynergies.length) setSearchedProjects(mappedSynergies);
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
          synergies={pendingSynergies}
          searchedPorjects={searchedPorjects}
          min={min}
          max={max}
          setMin={setMin}
          setMax={setMax}
        />
      </div>
      <section className="synergies">
        {filteredSyn.length !== 0 &&
          !search &&
          filteredSyn?.map((syn) => (
            <PendingSynergy key={syn.id} pensyn={syn} />
          ))}

        {search &&
          searchedPorjects?.map((syn) => (
            <PendingSynergy key={syn.id} pensyn={syn} />
          ))}

        {!search &&
          currentTableData?.map((syn) => (
            <PendingSynergy key={syn.id} pensyn={syn} />
          ))}
      </section>
      <Pagination
        currentPage={currentPage}
        totalCount={
          search && tab === "Pending Synergies" ? 0 : pendingSynergies.length
        }
        pageSize={maxItems}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </motion.section>
  );
};

export default PendingSynergies;
