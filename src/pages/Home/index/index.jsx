import useFetch from "../../../hooks/useFetch";
import LevelCard from "../LevelCard/LevelCard";
import { StyledHome } from "./styles";

const Home = () => {
  const { data, loading, error } = useFetch("/levels");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching level data.</p>;

  return (
    <StyledHome>
      {data.map(({ levelNum, imageUrl }) => (
        <LevelCard levelNum={levelNum} imageUrl={imageUrl} key={levelNum} />
      ))}
    </StyledHome>
  );
};

export default Home;
