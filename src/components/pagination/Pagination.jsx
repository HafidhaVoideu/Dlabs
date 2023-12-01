import React from "react";

import { usePagination } from "../../hooks/usePagination";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "./pagination.css";

const Pagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage, // current page
  onPageChange,
}) => {
  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  if (!paginationRange) return null;

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const nextPage = () => {
    onPageChange(Math.min(currentPage + 1, paginationRange?.length));
  };

  const previousPage = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  let lastPage = paginationRange[paginationRange?.length - 1];

  return (
    <ul className="pagination-container">
      <li
        onClick={previousPage}
        className={`pagination-item  ${currentPage === 1 && "disable-btn"}`}
      >
        <MdKeyboardArrowLeft />
      </li>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === "...")
          return (
            <li key={`${index}-dot`} className="pagination-dots">
              &#8230;
            </li>
          );
        else
          return (
            <li
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`pagination-item  ${
                currentPage === pageNumber && "active-link"
              } `}
            >
              {pageNumber}
            </li>
          );
      })}

      <li
        onClick={nextPage}
        className={`pagination-item   ${
          currentPage === lastPage && "disable-btn"
        }`}
      >
        <MdKeyboardArrowRight />
      </li>
    </ul>
  );
};

export default Pagination;
