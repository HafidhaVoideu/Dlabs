import React, { useState, useMemo } from "react";
import "./profile.css";
import ProfProject from "./ProfProject";
import { useGlobalContextUser } from "../../../../context/context";
import { motion } from "framer-motion";
import { maxItems } from "../../../../constants/const";
import Pagination from "../../../../components/pagination/Pagination";
const Profile = () => {
  const { user, tab, search } = useGlobalContextUser();

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * maxItems;
    const lastPageIndex = firstPageIndex + maxItems;
    return user?.projects.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, user?.projects]);
  return (
    <motion.section
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-sec "
      transition={{ duration: 0.6, ease: "easeIn" }}
    >
      <section className="profile__projects">
        {tab === "My Projects" &&
          search &&
          user?.projects
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((project) => (
              <ProfProject key={project.id} project={project} icons={true} />
            ))}

        {tab === "My Projects" &&
          !search &&
          currentTableData?.map((project) => (
            <ProfProject key={project.id} project={project} icons={true} />
          ))}
      </section>

      <Pagination
        currentPage={currentPage}
        totalCount={search && tab === "My Projects" ? 0 : user?.projects.length}
        pageSize={maxItems}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </motion.section>
  );
};

export default Profile;
