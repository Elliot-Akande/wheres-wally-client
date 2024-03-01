import PropTypes from "prop-types";
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

function Leaderboard({ data, loading }) {
  const getContent = () => {
    if (loading) {
      return <Status>Loading...</Status>;
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
