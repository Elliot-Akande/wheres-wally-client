import { Link, useParams } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import { useEffect } from "react";
import checkLevelExists from "../checkLevelExists";
import { useNavigate } from "react-router-dom";

function DetailsPage() {
  const { levelNum } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkLevelExists(levelNum)) navigate("/");
  }, []);

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
