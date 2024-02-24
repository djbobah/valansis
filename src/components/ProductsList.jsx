import React from "react";
import { Pagination } from "react-bootstrap";

const ProductsList = ({ ids }) => {
  const length = ids.length;

  let active = 1;
  let items = [];
  for (let number = 1; number <= length / 50; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

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
          {ids.map((item, i) => {
            return (
              <tr key={i}>
                <th scope="row">{item}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default ProductsList;
