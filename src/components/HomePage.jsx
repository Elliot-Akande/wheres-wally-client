import { Link } from "react-router-dom";
import useLevelData from "../hooks/useLevelData";

function HomePage() {
  const { levelData, error } = useLevelData();

  return (
    <>
      {!error ? (
        levelData.map(({ levelNum }) => (
          <Link to={`level/${levelNum}/details`} key={levelNum}>
            Level {levelNum}
          </Link>
        ))
      ) : (
        <p>Data fetching error.</p>
      )}
    </>
  );
}

export default HomePage;
