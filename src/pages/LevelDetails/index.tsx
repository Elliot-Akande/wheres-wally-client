import { Link, useParams } from "react-router-dom";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import useFetch from "../../hooks/useFetch";
import {
  BackButton,
  Heading,
  StartButton,
  StyledLevelDetails,
  Top,
} from "./styles";

interface Data {
  scores: Array<{
    _id: string;
    name: string;
    score: number;
  }>;
}

const LevelDetails = () => {
  const { levelNum } = useParams();
  const { data, loading, error } = useFetch<Data>(
    `/levels/${levelNum}/leaderboard`
  );

  if (error) {
    if (error.message === "Not found.") {
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
  }

  return (
    <StyledLevelDetails>
      <Top>
        <Heading>LEVEL {levelNum}</Heading>
        <StartButton to={`/level/${levelNum}`}>Start</StartButton>
      </Top>
      <Leaderboard data={data} loading={loading} />
      <BackButton to={`/`}>Back</BackButton>
    </StyledLevelDetails>
  );
};

export default LevelDetails;
