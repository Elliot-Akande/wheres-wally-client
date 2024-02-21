import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./index.module.css";
import ImageLoader from "../../components/ImageLoader/ImageLoader";

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
      <ImageLoader
        src={imageUrl}
        alt={`Level ${levelNum}`}
        imgClass={styles.img}
        placeholderClass={styles.placeholder}
        spinnerColour={"hsl(288, 70%, 49%)"}
      />
      <div className={styles.title}>LEVEL {levelNum}</div>
    </Link>
  );
};

export default Home;
