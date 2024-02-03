import { useState, useEffect } from "react";

const useFetch = (uri, opts = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = import.meta.env.VITE_API_URL;
  useEffect(() => {
    // fetch(api + uri, opts)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (!response.ok) {
    //       const err = new Error();
    //       err.status = response.status;
    //       throw err;
    //     }
    //     setData(data);
    //   })
    //   .catch((err) =>
    //     setError(
    //       `An error occured when fetching data. ${
    //         err.status ? `Status: ${err.status}` : ""
    //       }`
    //     )
    //   )
    //   .finally(() => setLoading(false));

    const fetchData = async () => {
      try {
        const response = await fetch(api + uri, opts);
        const jsonData = await response.json();
        if (!response.ok) {
          const err = new Error(jsonData);
          err.status = response.status;
          throw err;
        }

        setData(jsonData);
      } catch (err) {
        err.message = "An error occured when fetching data.";
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetch;
