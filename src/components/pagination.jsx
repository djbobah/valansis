import React from "react";
import _ from "lodash";
// import { Pagination } from "react-bootstrap";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
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
      </ul>
    </nav>
  );
};

export default Pagination;
