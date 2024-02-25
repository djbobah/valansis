import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductsList from "./components/productsList";
import { auth } from "./utils/auth";
import Filter from "./components/filter";
import { set } from "lodash";

export const url = "http://api.valantis.store:40000/";
const initialFilterState = { name: "", brand: "", price: "" };

function App() {
  const [ids, setIds] = useState([]);
  const [filteredIds, setFilteredIds] = useState([]);
  const [filter, setFilter] = useState(initialFilterState);
  // const currentDate = new Date();
  // const year = currentDate.getFullYear();
  // const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  // const day = String(currentDate.getDate()).padStart(2, "0");
  // const formattedDate = `${year}${month}${day}`;
  // const authToken = md5(`Valantis_${formattedDate}`);

  useEffect(() => {
    axios
      .post(
        url,
        {
          action: "get_ids",
          // params: {  },
        },
        {
          headers: {
            "X-Auth": auth(),
          },
        }
      )
      .then((response) => {
        getProducts(response.data.result).then((res) => {
          setIds(res);
          setFilteredIds(res);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function getProducts(id) {
    let result = [];
    await axios
      .post(
        url,
        {
          action: "get_items",
          params: { ids: id.sort() },
        },
        {
          headers: {
            "X-Auth": auth(),
          },
        }
      )
      .then((response) => {
        const unique = new Set(
          response.data.result.map((item) => JSON.stringify(item))
        );
        result = Array.from(unique).map((item) => JSON.parse(item));
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  }
  const handleFilterChange = ({ target }) => {
    setFilter((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    let filterParams = {};

    if (filter.name !== "") {
      filterParams = { ...filterParams, product: filter.name };
    }
    if (filter.brand !== "") {
      filterParams = { ...filterParams, brand: filter.brand };
    }
    if (filter.price !== "") {
      filterParams = {
        ...filterParams,
        price: Number(filter.price),
      };
    }

    // setFilter(initialFilterState);

    axios
      .post(
        url,
        {
          action: "filter",
          params: filterParams,
        },
        {
          headers: {
            "X-Auth": auth(),
          },
        }
      )
      .then((response) => {
        const unique = new Set(
          response.data.result.map((item) => JSON.stringify(item))
        );
        const result = Array.from(unique).map((item) => JSON.parse(item));
        getProducts(result).then((res) => {
          setFilteredIds(res);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleClickCancel = () => {
    setFilteredIds(ids);
  };
  return (
    <>
      {filteredIds.length !== 0 ? (
        <>
          <Filter
            filter={filter}
            onChange={handleFilterChange}
            onSubmit={handleFilterSubmit}
            onCancel={handleClickCancel}
          />
          <ProductsList ids={filteredIds} />
        </>
      ) : (
        <div>
          <div className="spinner-border mx-auto" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span>
            Идет загрузка. Если загрузка идет более 30 секунд, проверьсе консоль
            и перегрузите страницу
          </span>
        </div>
      )}
    </>
  );

  // {ids?<ProductsList ids={ids} />:"loading"}
}

export default App;
