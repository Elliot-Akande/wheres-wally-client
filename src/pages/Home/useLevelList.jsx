import { useState, useEffect } from "react";

const useLevelList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData([
      {
        levelNum: 1,
      },
      {
        levelNum: 2,
      },
      {
        levelNum: 3,
      },
      {
        levelNum: 4,
      },
    ]);
    setLoading(false);
  }, []);

  return { data, loading, error };
};

export default useLevelList;
