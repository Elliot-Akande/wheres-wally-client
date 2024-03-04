import formatTime from "../../utils/formatTime";
import {
  Heading,
  Item,
  List,
  Name,
  Score,
  Status,
  StyledLeaderboard,
} from "./styles";

interface LeaderboardProps {
  data: {
    scores: Array<{
      _id: string;
      name: string;
      score: number;
    }>;
  } | null;
  loading: boolean;
}

function Leaderboard({ data, loading }: LeaderboardProps) {
  const getContent = () => {
    if (loading) {
      return <Status>Loading...</Status>;
    }

    if (!data) {
      return <Status>Data not present.</Status>;
    }

    if (data.scores.length === 0) {
      return <Status>No scores recorded.</Status>;
    }

    return (
      <List>
        {data.scores.map((entry) => (
          <Item key={entry._id}>
            <Name>{entry.name}</Name>
            <Score>{formatTime(entry.score)}</Score>
          </Item>
        ))}
      </List>
    );
  };

  return (
    <StyledLeaderboard>
      <Heading>Leaderboard</Heading>
      {getContent()}
    </StyledLeaderboard>
  );
}

export default Leaderboard;
