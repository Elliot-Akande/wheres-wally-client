import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./index.module.css";

const Home = () => {
  const { data, loading, error } = useFetch("/levels");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching level data.</p>;

  return (
    <div className={styles.container}>
      {data.map(({ levelNum, imageUrl }) => (
        <LevelCard levelNum={levelNum} imageUrl={imageUrl} key={levelNum} />
      ))}
    </div>
  );
};

const LevelCard = ({ levelNum, imageUrl }) => {
  return (
    <Link to={`level/${levelNum}/details`} className={styles.card}>
      <img src={imageUrl} className={styles.img} />
      <div className={styles.title}>LEVEL {levelNum}</div>
    </Link>
  );
};

export default Home;
