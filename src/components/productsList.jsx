import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

const ProductsList = ({ ids }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState({
    pagesStart: 1,
    pagesEnd: 1,
  });

  const count = ids.length;
  const pageSize = 50;
  const pageCount = Math.ceil(count / pageSize);
  useEffect(() => {
    setCurrentPage(1);

    if (pageCount > 20) {
      setPageNumbers((prev) => ({ ...prev, pagesEnd: 20 }));
    } else setPageNumbers((prev) => ({ ...prev, pagesEnd: pageCount }));
  }, [ids]);

  const handlePageChange = (pageIndex, action = "") => {
    if (pageIndex > pageNumbers.pagesEnd && action === "+") {
      setPageNumbers((prev) => ({
        pagesEnd: pageIndex,
        pagesStart: prev.pagesStart + 1,
      }));
    }
    if (pageIndex < pageNumbers.pagesStart && action === "-") {
      setPageNumbers((prev) => ({
        pagesEnd: prev.pagesEnd - 1,
        pagesStart: pageIndex,
      }));
    }

    setCurrentPage(pageIndex);
  };
  let idsCrop = [];
  if (ids) {
    idsCrop = paginate(ids, currentPage, pageSize);
  }

  return (
    <div className="container">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Название</th>
            <th scope="col">Цена</th>
            <th scope="col">Брэнд</th>
          </tr>
        </thead>
        <tbody>
          {idsCrop.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.product}</td>
                <td>{item.price} </td>
                <td>{item.brand}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductsList;
