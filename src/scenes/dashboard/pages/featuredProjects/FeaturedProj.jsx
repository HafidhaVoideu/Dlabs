import React, { useEffect, useState, useMemo } from "react";
import "./featured.css";
import { motion } from "framer-motion";
import Fproject from "./Fproject";
import { useGlobalContextUser } from "../../../../context/context";
import { maxItems } from "../../../../constants/const";
import Pagination from "../../../../components/pagination/Pagination";

const FeaturedProj = () => {
  const { projects, tab, search, featuredProjects, setFeaturedProjects } =
    useGlobalContextUser();

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * maxItems;
    const lastPageIndex = firstPageIndex + maxItems;
    return featuredProjects?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, featuredProjects]);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-sec "
        transition={{ duration: 0.6, ease: "easeIn" }}
      >
        <section className="profile__projects">
          {search &&
            featuredProjects
              .filter((p) =>
                p.project_name.toLowerCase().includes(search.toLowerCase())
              )
              .map((project) => (
                <Fproject key={project.project_id} project={project} />
              ))}

          {!search &&
            currentTableData?.map((project) => (
              <Fproject key={project.project_id} project={project} />
            ))}
        </section>

        <Pagination
          currentPage={currentPage}
          totalCount={search ? 0 : featuredProjects?.length}
          pageSize={maxItems}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </motion.section>
    </>
  );
};

export default FeaturedProj;
