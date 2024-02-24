import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import axios from "axios";
import { auth } from "../utils/auth";
import { url } from "../App";

const ProductsList = ({ ids }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [products, setProducts] = useState([]);
  const count = ids.length;
  const pageSize = 50;
  const handlePageChange = (pageIndex) => {
    // console.log("page: ", pageIndex);
    setCurrentPage(pageIndex);
  };
  let idsCrop = [];
  if (ids) {
    idsCrop = paginate(ids, currentPage, pageSize);
    // console.log(idsCrop);
  }
  // useEffect(() => {
  //   axios
  //     .post(
  //       url,
  //       {
  //         action: "get_items",
  //         params: { ids: idsCrop },
  //         // params: { price: 17500.0 },
  //       },
  //       {
  //         headers: {
  //           "X-Auth": auth(),
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data.result);
  //       // setIds(response.data.result);
  //       setProducts(response.data.result);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [idsCrop]);
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
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductsList;
