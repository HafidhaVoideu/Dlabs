import React, { useState, useMemo, useEffect } from "react";
import Synergy from "./Synergy";
import {
  AiOutlineDelete,
  AiOutlineFileAdd,
  AiOutlineClose,
} from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";

import "./synergies.css";
import "./adminSynergies/adminSyn.css";

import { useGlobalContextUser } from "../../../../context/context";
import EditSyngergy from "./adminSynergies/EditSyngergy";
import AddSynergy from "./adminSynergies/AddSynergy";
import DeleteSynergy from "./adminSynergies/DeleteSynergy";
import Pagination from "../../../../components/pagination/Pagination";
import { maxItems } from "../../../../constants/const";
import FilteredSynergies from "./FilteredSynergies";
const Synergies = () => {
  const { search, tab, synergies, user, projects } = useGlobalContextUser();
  const [operation, setOperation] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [filteredSyn, setFilteredSyn] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * maxItems;
    const lastPageIndex = firstPageIndex + maxItems;
    return synergies?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, synergies]);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = isModal ? "hidden" : "auto";
  }, [isModal]);

  const projectNames = projects.map((p) => {
    if (synergies.map((s) => s.project_id).includes(p.project_id))
      return p.project_name;
  });

  const searchProjectNames = projectNames.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  console.log("synergies:", searchProjectNames);

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
        />
        {user.role === "admin" ||
          (user.role === "authenticated" && (
            <div className="dashboard__btns">
              <button
                className="dashboard__add-btn"
                onClick={() => {
                  setOperation("add");
                  setIsModal("true");
                }}
              >
                <AiOutlineFileAdd />
              </button>
              <button className="dashboard__edit-btn">
                <FiEdit
                  onClick={() => {
                    setIsModal("true");
                    setOperation("edit");
                  }}
                />
              </button>
              <button className="dashboard__dlt-btn">
                <AiOutlineDelete
                  onClick={() => {
                    setOperation("dlt");
                    setIsModal("true");
                  }}
                />
              </button>
            </div>
          ))}
      </div>

      {isModal && (
        <div className="modal  ">
          <div className="modal-content dropshadow">
            <div className="modal__icons">
              <button
                onClick={() => setIsModal(false)}
                className="popup__close-btn"
              >
                <AiOutlineClose />
              </button>
            </div>

            {operation === "edit" && <EditSyngergy setIsModal={setIsModal} />}
            {operation === "add" && <AddSynergy setIsModal={setIsModal} />}
            {operation === "dlt" && <DeleteSynergy setIsModal={setIsModal} />}
          </div>
        </div>
      )}

      {/* *********************** admin ****************** */}
      <section className="synergies">
        {filteredSyn.length !== 0 &&
          !search &&
          filteredSyn?.map((syn) => <Synergy key={syn.id} syn={syn} />)}

        {tab === "Synergies" &&
          search &&
          searchProjectNames?.map((syn) => <Synergy key={syn.id} syn={syn} />)}
        {tab === "Synergies" &&
          !search &&
          !filteredSyn.length &&
          currentTableData?.map((syn) => <Synergy key={syn.id} syn={syn} />)}
      </section>

      <Pagination
        currentPage={currentPage}
        totalCount={search && tab === "Projects" ? 0 : synergies.length}
        pageSize={maxItems}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </motion.section>
  );
};

export default Synergies;
