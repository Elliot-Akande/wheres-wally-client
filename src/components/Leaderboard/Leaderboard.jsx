import useLeaderboardData from "./useLeaderboardData";
import PropTypes from "prop-types";

function Leaderboard({ levelNum }) {
  const { data, loading, error } = useLeaderboardData(levelNum);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    const string = `${mins}:${secs}`;

    return string.padStart(5, 0);
  };

  return (
    <div>
      <h2>Leaderboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Data fetching error.</p>
      ) : data ? (
        <ul>
          {data.map((entry) => (
            <li key={entry.id}>
              {entry.name} - {formatTime(entry.time)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No scores recorded.</p>
      )}
    </div>
  );
}

Leaderboard.propTypes = {
  levelNum: PropTypes.number,
};

export default Leaderboard;
