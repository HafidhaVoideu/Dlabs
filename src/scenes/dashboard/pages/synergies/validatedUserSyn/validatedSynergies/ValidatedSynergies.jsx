import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

import ValidatedSyn from "../validatedSynergy/ValidatedSyn";
import { useGlobalContextUser } from "../../../../../../context/context";

import Pagination from "../../../../../../components/pagination/Pagination";
import { maxItems } from "../../../../../../constants/const";

const ValidatedSynergies = () => {
  const { search, tab, synergies } = useGlobalContextUser();
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * maxItems;
    const lastPageIndex = firstPageIndex + maxItems;
    return synergies.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, synergies]);

  return (
    <motion.section
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-sec "
      transition={{ duration: 0.6, ease: "easeIn" }}
    >
      <section className="synergies">
        {tab === "Synergies" &&
          search &&
          synergies
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((syn) => <ValidatedSyn key={syn.id} syn={syn} />)}

        {tab === "Synergies" &&
          !search &&
          currentTableData?.map((syn) => (
            <ValidatedSyn key={syn.id} syn={syn} />
          ))}
      </section>
      <Pagination
        currentPage={currentPage}
        totalCount={search && tab === "Synergies" ? 0 : synergies.length}
        pageSize={maxItems}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </motion.section>
  );
};

export default ValidatedSynergies;
