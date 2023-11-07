import React, { useState, useMemo } from "react";
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

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * maxItems;

    const lastPageIndex = firstPageIndex + maxItems;
    return pendingSynergies.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pendingSynergies]);

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
        />
      </div>
      <section className="synergies">
        {filteredSyn.length !== 0 &&
          !search &&
          filteredSyn?.map((syn) => (
            <PendingSynergy key={syn.id} pensyn={syn} />
          ))}

        {tab === "Pending Synergies" &&
          search &&
          pendingSynergies
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((syn) => <PendingSynergy key={syn.id} pensyn={syn} />)}

        {tab === "Pending Synergies" &&
          !search &&
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
