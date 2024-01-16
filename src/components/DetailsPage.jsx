import { Link, useParams } from "react-router-dom";
import Leaderboard from "./Leaderboard";

function DetailsPage() {
  const { levelNum } = useParams();

  return (
    <>
      <h1>level {levelNum}</h1>
      <Link to={`/level/${levelNum}`}>Start</Link>
      <Leaderboard levelNum={levelNum} />
      <Link to={`/`}>Back</Link>
    </>
  );
}

export default DetailsPage;
