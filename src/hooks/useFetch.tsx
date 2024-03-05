import { useState, useEffect } from "react";

interface Results<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T extends {}>(
  uri: string,
  opts?: RequestInit
): Results<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const api: string = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api + uri, opts);
        const jsonData = await response.json();
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Not found.");
          }
          throw new Error();
        }

        setData(jsonData);
      } catch (error) {
        if (error instanceof Error && error.message === "Not found.") {
          setError(error);
        }
        setError(new Error("An error occured when fetching data."));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetch;
