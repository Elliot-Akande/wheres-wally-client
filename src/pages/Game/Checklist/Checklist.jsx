import ChecklistItem from "../ChecklistItem/ChecklistItem";

const Checklist = ({ characters, correctAnswers }) => {
  const isFound = (character) => {
    return Object.prototype.hasOwnProperty.call(correctAnswers, character.name);
  };

  return (
    <>
      <h2>Checklist:</h2>
      <ul>
        {characters.map((character) => (
          <ChecklistItem
            key={character.name}
            character={character.name}
            found={isFound(character)}
          />
        ))}
      </ul>
    </>
  );
};

export default Checklist;
