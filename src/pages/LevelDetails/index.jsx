import { Link, useParams } from "react-router-dom";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import { useEffect } from "react";
import checkLevelExists from "./checkLevelExists";
import { useNavigate } from "react-router-dom";

const LevelDetails = () => {
  const { levelNum } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkLevelExists(levelNum)) navigate("/");
  }, []);

  return (
    <>
      <h1>level {levelNum}</h1>
      <Link to={`/level/${levelNum}`}>Start</Link>
      <Leaderboard levelNum={parseInt(levelNum, 10)} />
      <Link to={`/`}>Back</Link>
    </>
  );
};

export default LevelDetails;
