import useFetch from "../../../hooks/useFetch";
import LevelCard from "../LevelCard/LevelCard";
import { StyledHome } from "./styles";

type Data = Array<{
  levelNum: string;
  imageUrl: string;
}>;

const Home = () => {
  const { data, loading, error } = useFetch<Data>("/levels");

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error fetching level data.</p>;

  return (
    <StyledHome>
      {data.map(({ levelNum, imageUrl }) => (
        <LevelCard levelNum={levelNum} imageUrl={imageUrl} key={levelNum} />
      ))}
    </StyledHome>
  );
};

export default Home;
