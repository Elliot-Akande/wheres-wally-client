import { useState, useEffect } from "react";

const useLeaderboardData = (levelNum) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData([
      {
        id: 3,
        name: "Anon",
        time: 32,
      },
      {
        id: 1,
        name: "Big Gary",
        time: 100,
      },
      {
        id: 2,
        name: "Gordon",
        time: 140,
      },
    ]);

    setLoading(false);
  }, []);

  return { data, loading, error };
};

export default useLeaderboardData;
