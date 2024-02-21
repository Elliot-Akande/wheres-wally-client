import formatTime from "../../utils/formatTime";
import PropTypes from "prop-types";
import styles from "./Leaderboard.module.css";

function Leaderboard({ data, loading }) {
  const getContent = () => {
    if (loading) {
      return <p className={styles.status}>Loading...</p>;
    }

    if (data.scores.length === 0) {
      return <p className={styles.status}>No scores recorded.</p>;
    }

    return (
      <ul className={styles.list}>
        {data.scores.map((entry) => (
          <li key={entry._id} className={styles.item}>
            <div className={styles.name}>{entry.name}</div>
            <div className={styles.score}>{formatTime(entry.score)}</div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Leaderboard</h2>
      {getContent()}
    </div>
  );
}

Leaderboard.propTypes = {
  data: PropTypes.shape({
    scores: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        score: PropTypes.number,
      })
    ),
  }),
  loading: PropTypes.bool,
};

export default Leaderboard;
