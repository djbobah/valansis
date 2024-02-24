import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductsList from "./components/productsList";
import { auth } from "./utils/auth";
import Filter from "./components/filter";

export const url = "http://api.valantis.store:40000/";
const initialFilterState = { name: "", brand: "", price: "" };

function App() {
  const [ids, setIds] = useState([]);
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
          params: { limit: 500 },
        },
        {
          headers: {
            "X-Auth": auth(),
          },
        }
      )
      .then((response) => {
        // setIds(response.data.result);
        console.log(response.data.result);
        // console.log(response.data.result.sort());
        // let newarr = [];
        // response.data.result
        //   .sort()
        //   .forEach(
        //     (id) =>
        //       (newarr = response.data.result
        //         .sort()
        //         .filter((item) => item.trim() !== id.trim()))
        //   );
        // // console.log(newarr);

        // const unique = newarr;
        axios
          .post(
            url,
            {
              action: "get_items",
              params: { ids: response.data.result.sort() },
              // params: { price: 17500.0 },
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

            setIds(result);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // console.log(ids);
  const handleFilterChange = ({ target }) => {
    setFilter((prevState) => ({ ...prevState, [target.name]: target.value }));
    // console.log(target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    setFilter(initialFilterState);
  };

  return (
    <>
      {ids.length !== 0 ? (
        <>
          <Filter
            filter={filter}
            onChange={handleFilterChange}
            onSubmit={handleFilterSubmit}
          />
          <ProductsList ids={ids} />
        </>
      ) : (
        <div class="spinner-border mx-auto" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
    </>
  );

  // {ids?<ProductsList ids={ids} />:"loading"}
}

export default App;
