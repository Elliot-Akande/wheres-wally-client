import PropTypes from "prop-types";

function Leaderboard({ data, loading }) {
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
      ) : data ? (
        <ul>
          {data.scores.map((entry) => (
            <li key={entry._id}>
              {entry.name} - {formatTime(entry.score)}
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
  levelNum: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.number,
  }),
  loading: PropTypes.bool,
};

export default Leaderboard;
