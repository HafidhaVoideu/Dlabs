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
  // const [featuredProjects, setFeaturedProjects] = useState(
  //   projects.filter((p) => p.featured)
  // );
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   const temp = projects.filter((p) => p.featured);
  //   setFeaturedProjects(temp);
  // }, [projects]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * maxItems;
    const lastPageIndex = firstPageIndex + maxItems;
    return featuredProjects?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-sec "
        transition={{ duration: 0.6, ease: "easeIn" }}
      >
        <section className="profile__projects">
          {tab === "Featured Projects" &&
            search &&
            featuredProjects
              .filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((project) => (
                <Fproject key={project.project_id} project={project} />
              ))}

          {tab === "Featured Projects" &&
            !search &&
            currentTableData?.map((project) => (
              <Fproject key={project.project_id} project={project} />
            ))}
        </section>

        <Pagination
          currentPage={currentPage}
          totalCount={
            search && tab === "Featured Projects" ? 0 : featuredProjects?.length
          }
          pageSize={maxItems}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </motion.section>
    </>
  );
};

export default FeaturedProj;
