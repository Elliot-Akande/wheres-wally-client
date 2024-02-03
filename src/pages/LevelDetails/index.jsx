import { Link, useParams } from "react-router-dom";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import useFetch from "../../hooks/useFetch";

const LevelDetails = () => {
  const { levelNum } = useParams();
  const { data, loading, error } = useFetch(`/levels/${levelNum}/leaderboard`);

  if (!error) {
    return (
      <>
        <h1>level {levelNum}</h1>
        <Link to={`/level/${levelNum}`}>Start</Link>
        <Leaderboard data={data} loading={loading} />
        <Link to={`/`}>Back</Link>
      </>
    );
  }

  if (error.status === 404) {
    return (
      <div>
        <h2>This level doesn&apos;t exist!</h2>
        <Link to="/">Back to home page</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>There was an error fetching level data!</h2>
      <Link to="/">Back to home page</Link>
    </div>
  );
};

export default LevelDetails;
