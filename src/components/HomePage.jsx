import { Link } from "react-router-dom";
import useLevelData from "../hooks/useLevelData";

function HomePage() {
  const { levelData, error } = useLevelData();

  if (error) return <p>Data fetching error.</p>;

  return (
    <>
      {levelData.map(({ levelNum }) => (
        <Link to={`level/${levelNum}/details`} key={levelNum}>
          Level {levelNum}
        </Link>
      ))}
    </>
  );
}

export default HomePage;
