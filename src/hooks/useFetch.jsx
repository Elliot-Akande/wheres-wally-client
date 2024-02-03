import { useState, useEffect } from "react";

const useFetch = (uri, opts) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(uri, opts)
      .then((response) => {
        if (!response.ok) {
          const err = new Error();
          err.status = response.status;
          throw err;
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((err) =>
        setError(
          `An error occured when fetching data. ${
            err.status ? `Status: ${err.status}` : ""
          }`
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export default useFetch;
