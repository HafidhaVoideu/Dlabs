import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProfProject from "../../profile/ProfProject";
import { useGlobalContextUser } from "../../../../../context/context";
import Pagination from "../../../../../components/pagination/Pagination";
import { maxItems } from "../../../../../constants/const";
const UserProjects = () => {
  const { projects, tab, search } = useGlobalContextUser();
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * maxItems;
    const lastPageIndex = firstPageIndex + maxItems;
    return projects?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, projects]);

  return (
    <motion.section
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-sec "
      transition={{ duration: 0.6, ease: "easeIn" }}
    >
      <section className="profile__projects">
        {tab === "Projects" &&
          search &&
          projects
            ?.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((project) => (
              <ProfProject
                key={project.project_id}
                project={project}
                icons={false}
              />
            ))}

        {tab === "Projects" &&
          !search &&
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
        totalCount={search && tab === "Projects" ? 0 : projects?.length}
        pageSize={maxItems}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </motion.section>
  );
};

export default UserProjects;
