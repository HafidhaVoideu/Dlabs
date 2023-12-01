import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import ProfProject from "../../profile/ProfProject";
import { useGlobalContextUser } from "../../../../../context/context";
import Pagination from "../../../../../components/pagination/Pagination";
import { maxItems } from "../../../../../constants/const";

const UserProjects = () => {
  const { projects, search } = useGlobalContextUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedPorjects, setSearchedProjects] = useState([]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * maxItems;
    const lastPageIndex = firstPageIndex + maxItems;
    return projects?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, projects]);

  useEffect(() => {
    if (search) {
      setSearchedProjects(
        projects?.filter((p) =>
          p.project_name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  return (
    <motion.section
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-sec "
      transition={{ duration: 0.6, ease: "easeIn" }}
    >
      <section className="profile__projects">
        {search &&
          searchedPorjects?.map((p, index) => (
            <ProfProject key={index} project={p} icons={false} />
          ))}

        {!search &&
          currentTableData?.map((project) => (
            <ProfProject
              key={project.project_id}
              project={project}
              icons={false}
            />
          ))}
      </section>
      <Pagination
        currentPage={currentPage}
        totalCount={search ? 0 : projects?.length}
        pageSize={maxItems}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </motion.section>
  );
};

export default UserProjects;
