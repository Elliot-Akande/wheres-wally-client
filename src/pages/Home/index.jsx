import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  const { data, loading, error } = useFetch("/levels");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching level data.</p>;

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
