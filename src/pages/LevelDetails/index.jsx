import { Link, useParams } from "react-router-dom";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import useFetch from "../../hooks/useFetch";
import styles from "./index.module.css";

const LevelDetails = () => {
  const { levelNum } = useParams();
  const { data, loading, error } = useFetch(`/levels/${levelNum}/leaderboard`);

  if (!error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>LEVEL {levelNum}</h1>
          <Link to={`/level/${levelNum}`} className={styles.start}>
            Start
          </Link>
        </div>
        <Leaderboard data={data} loading={loading} />
        <Link to={`/`} className={styles.back}>
          Back
        </Link>
      </div>
    );
  }

  if (error.status === 404) {
    return (
      <div>
        <h1>Error</h1>
        <p>This level doesn&apos;t exist!</p>
        <Link to="/">Back to home page</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Error</h1>
      <p>There was a problem fetching level data!</p>
      <Link to="/">Back to home page</Link>
    </div>
  );
};

export default LevelDetails;
