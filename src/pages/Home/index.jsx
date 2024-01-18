import { Link } from "react-router-dom";
import useLevelList from "./useLevelList";

const Home = () => {
  const { data, loading, error } = useLevelList();

  if (error) return <p>Data fetching error.</p>;

  return (
    <>
      {data.map(({ levelNum }) => (
        <Link to={`level/${levelNum}/details`} key={levelNum}>
          Level {levelNum}
        </Link>
      ))}
    </>
  );
};

export default Home;
