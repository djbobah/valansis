import "./App.css";
import axios from "axios";
import md5 from "md5";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductsList from "./components/ProductsList";
function App() {
  const [ids, setIds] = useState([]);

  const url = "http://api.valantis.store:40000/";

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}${month}${day}`;
  const authToken = md5(`Valantis_${formattedDate}`);

  useEffect(() => {
    axios
      .post(
        url,
        {
          action: "get_ids",
          params: { limit: 500 },
          // params: { price: 17500.0 },
        },
        {
          headers: {
            "X-Auth": authToken,
          },
        }
      )
      .then((response) => {
        console.log(response.data.result);
        setIds(response.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(ids);

  return <ProductsList ids={ids} />;
}

export default App;
