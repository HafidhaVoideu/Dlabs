import React, { useState, useMemo, useEffect } from "react";
import "./projects.css";
import { motion } from "framer-motion";
import EditProject from "./editProject/EditProject";
import axios from "axios";
import { access_token } from "../../../../constants/accesToken";

import {
  AiOutlineDelete,
  AiOutlineFileAdd,
  AiOutlineMergeCells,
} from "react-icons/ai";

import { BiSelectMultiple } from "react-icons/bi";
import Project from "./project/Project";
import { useGlobalContextUser } from "../../../../context/context";
import FuseProject from "./fuseProject/FuseProject";
import { maxItems } from "../../../../constants/const";
import Pagination from "../../../../components/pagination/Pagination";

const Projects = () => {
  const { projects, setProjects, setAlert, tab, search } =
    useGlobalContextUser();

  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * maxItems;
    const lastPageIndex = firstPageIndex + maxItems;
    return projects?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, projects]);

  const [isAddModal, setIsAddModal] = useState(false);
  const [isFuseModal, setIsFuseModal] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = isAddModal || isFuseModal ? "hidden" : "auto";
  }, [isAddModal, isFuseModal]);

  const handleDelete = () => {
    if (selectedProjects.length) {
      const temp = projects.filter(
        (p) =>
          !selectedProjects.map((sp) => sp.project_id).includes(p.project_id)
      );

      setProjects([...temp]);
      axios.all(
        selectedProjects.map((p) =>
          axios.delete(
            `http://68.183.108.138:3000/api/projects/`,
            {
              // headers: { Authorization: `Bearer ${access_token}` },
              data: {
                projectIds: p.project_id,
              },
            },
            {
              withCredentials: true,
            }
          )
        )
      );

      if (selectedProjects.length > 1)
        setAlert({
          isAlert: true,
          alertMessage: "Projects have been Deleted",
        });
      else
        setAlert({
          isAlert: true,
          alertMessage: "Project has been Deleted",
        });
      setSelectedProjects([]);
    }
    //  many delete requests
  };
  const handleSelectAll = () => {
    setIsSelectAll(!isSelectAll);
  };

  // Add Modal Handles

  const closeAddModal = () => {
    setIsAddModal(false);
  };
  const openAddModal = () => {
    setIsAddModal(true);
  };

  // Fuse Modal Handles

  const closeFuseModal = () => {
    setIsFuseModal(false);
  };
  const openFuseModal = () => {
    setIsFuseModal(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-sec "
      transition={{ duration: 0.6, ease: "easeIn" }}
    >
      {isAddModal && <EditProject closeModal={closeAddModal} />}
      {isFuseModal && <FuseProject closeModal={closeFuseModal} />}

      <div className="dashboard__btns">
        <button className="dashboard__dlt-btn" onClick={() => handleDelete()}>
          <AiOutlineDelete />
        </button>
        <button onClick={() => openAddModal()} className="dashboard__add-btn">
          <AiOutlineFileAdd />
        </button>
        <button className="dashboard__edit-btn" onClick={() => openFuseModal()}>
          <AiOutlineMergeCells />
        </button>
        <button
          className="dashboard__select-btn"
          onClick={() => handleSelectAll()}
        >
          <BiSelectMultiple />
        </button>
      </div>
      <section className="projects">
        {search &&
          projects
            ?.filter((p) =>
              p.project_name.toLowerCase().includes(search.toLowerCase())
            )
            .map((p, index) => (
              <Project
                key={index}
                project={p}
                setSelectedProjects={setSelectedProjects}
                selectedProjects={selectedProjects}
                isSelectAll={isSelectAll}
              />
            ))}

        {!search &&
          currentTableData?.map((p, index) => (
            <Project
              key={index}
              project={p}
              setSelectedProjects={setSelectedProjects}
              selectedProjects={selectedProjects}
              isSelectAll={isSelectAll}
            />
          ))}
      </section>

      <Pagination
        currentPage={currentPage}
        totalCount={projects?.length}
        pageSize={maxItems}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </motion.section>
  );
};

export default Projects;
