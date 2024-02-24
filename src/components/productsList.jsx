import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import axios from "axios";
import { auth } from "../utils/auth";
import { url } from "../App";

const ProductsList = ({ ids }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const count = ids.length;
  const pageSize = 50;
  const handlePageChange = (pageIndex) => {
    // console.log("page: ", pageIndex);
    setCurrentPage(pageIndex);
  };

  const idsCrop = paginate(ids, currentPage, pageSize);
  console.log(idsCrop);
  // useEffect(() => {
  //   axios
  //     .post(
  //       process.env.URL,
  //       {
  //         action: "get_items",
  //         params: { ids: idsCrop },
  //         // params: { price: 17500.0 },
  //       },
  //       {
  //         headers: {
  //           "X-Auth": auth,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data.result);
  //       // setIds(response.data.result);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  return (
    <div className="container">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            {/* <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th> */}
          </tr>
        </thead>
        <tbody>
          {idsCrop.map((item, i) => {
            return (
              <tr key={i}>
                <td scope="row">{item}</td>
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
