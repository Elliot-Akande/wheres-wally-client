import { useState, useEffect } from "react";

const useLevelData = () => {
  const [levelData, setLevelData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLevelData([
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
  }, []);

  return { levelData, error };
};

export default useLevelData;
