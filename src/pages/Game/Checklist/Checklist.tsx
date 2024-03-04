import PropTypes from "prop-types";
import ChecklistItem from "../ChecklistItem/ChecklistItem";
import { StyledChecklist } from "./styles";

const Checklist = ({ characters, correctAnswers }) => {
  const isFound = (character) => {
    return correctAnswers.find((answer) => answer.character === character);
  };

  return (
    <StyledChecklist>
      {characters.map((character) => (
        <ChecklistItem
          key={character.name}
          character={character}
          checked={!!isFound(character.name)}
        />
      ))}
    </StyledChecklist>
  );
};

Checklist.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ),
  correctAnswers: PropTypes.arrayOf(
    PropTypes.shape({
      character: PropTypes.string,
    })
  ).isRequired,
};

export default Checklist;
