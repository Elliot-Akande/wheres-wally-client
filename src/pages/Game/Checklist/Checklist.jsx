import PropTypes from "prop-types";
import ChecklistItem from "../ChecklistItem/ChecklistItem";
import styles from "./Checklist.module.css";

const Checklist = ({ characters, correctAnswers }) => {
  const isFound = (character) => {
    return correctAnswers.find((answer) => answer.character === character);
  };

  return (
    <ul className={styles.list}>
      {characters.map((character) => (
        <ChecklistItem
          key={character.name}
          character={character}
          found={!!isFound(character.name)}
        />
      ))}
    </ul>
  );
};

Checklist.propTypes = {
  character: PropTypes.arrayOf([
    PropTypes.shape({
      name: PropTypes.string,
      imageUrl: PropTypes.string,
    }),
  ]),
  correctAnswers: PropTypes.arrayOf(
    PropTypes.shape({
      character: PropTypes.string,
    })
  ).isRequired,
};

export default Checklist;
