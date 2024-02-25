import React from "react";
import _ from "lodash";
// import { Pagination } from "react-bootstrap";

const Pagination = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,

  pageNumbers,
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  // const pages = _.range(1, pageCount + 1);
  const pages = _.range(pageNumbers.pagesStart, pageNumbers.pagesEnd + 1);

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            href="#"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1, "-")}
          >
            {"<"}
          </button>
        </li>
        {pages.map((page) => {
          return (
            <li className="page-item" key={"page_" + page}>
              <button
                className={
                  "page-link" + (page === currentPage ? " active" : "")
                }
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <button
            className="page-link"
            disabled={pageCount === currentPage}
            onClick={() => onPageChange(currentPage + 1, "+")}
          >
            {">"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
