import styles from "./Checklist.module.css";
import ChecklistItem from "../ChecklistItem/ChecklistItem";

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
          found={isFound(character.name)}
        />
      ))}
    </ul>
  );
};

export default Checklist;
