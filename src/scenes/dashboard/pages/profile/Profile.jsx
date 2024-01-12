import React, { useState, useMemo, useEffect } from "react";
import "./profile.css";
import ProfProject from "./ProfProject";
import { useGlobalContextUser } from "../../../../context/context";
import { motion } from "framer-motion";
import { maxItems } from "../../../../constants/const";
import Pagination from "../../../../components/pagination/Pagination";
import { AiOutlineFileAdd } from "react-icons/ai";
import AddProject from "./AddProject";

const Profile = () => {
  const { user, tab, search, userProjects, setUserProjects, projects } =
    useGlobalContextUser();

  const [currentPage, setCurrentPage] = useState(1);

  const [isAddModal, setIsAddModal] = useState(false);

  console.log("projects:", projects);

  const [userProjectsAugmented, setUserProjectsAugmented] = useState(
    userProjects?.map((project) => {
      const pro = projects.find((p) => p.project_id === project._project_id);

      return { ...project, ...pro };
    })
  );

  console.log("userProjects Augmented:", userProjectsAugmented);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = isAddModal ? "hidden" : "auto";
  }, [isAddModal]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * maxItems;
    const lastPageIndex = firstPageIndex + maxItems;
    return userProjectsAugmented?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, userProjectsAugmented]);

  const closeModal = () => {
    setIsAddModal(false);
  };

  const openModal = () => {
    setIsAddModal(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-sec "
      transition={{ duration: 0.6, ease: "easeIn" }}
    >
      <div className="dashboard__options">
        <div className="dashboard__btns">
          <button
            className="dashboard__add-btn"
            style={{ marginLeft: "auto" }}
            onClick={openModal}
          >
            <AiOutlineFileAdd />
          </button>
        </div>
      </div>
      <section className="profile__projects">
        {isAddModal && <AddProject closeModal={closeModal} />}
        {search &&
          userProjectsAugmented
            ?.filter((p) =>
              p.project_name.toLowerCase().includes(search.toLowerCase())
            )
            .map((project) => (
              <ProfProject key={project.id} project={project} icons={true} />
            ))}

        {!search &&
          currentTableData?.map((project) => (
            <ProfProject key={project.id} project={project} icons={true} />
          ))}
      </section>

      <Pagination
        currentPage={currentPage}
        totalCount={search ? 0 : userProjectsAugmented?.length}
        pageSize={maxItems}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </motion.section>
  );
};

export default Profile;
