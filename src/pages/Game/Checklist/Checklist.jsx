import ChecklistItem from "../ChecklistItem/ChecklistItem";

const Checklist = ({ characters, correctAnswers }) => {
  const isFound = (character) => {
    return Object.prototype.hasOwnProperty.call(correctAnswers, character);
  };

  return (
    <>
      <h2>Checklist:</h2>
      <ul>
        {characters.map((character) => (
          <ChecklistItem
            key={character}
            character={character}
            found={isFound(character)}
          />
        ))}
      </ul>
    </>
  );
};

export default Checklist;
