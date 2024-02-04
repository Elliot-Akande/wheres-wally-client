import ChecklistItem from "../ChecklistItem/ChecklistItem";

const Checklist = ({ characters, correctAnswers }) => {
  const isFound = (character) => {
    return correctAnswers.find((answer) => answer.character === character);
  };

  return (
    <>
      <h2>Checklist:</h2>
      <ul>
        {characters.map((character) => (
          <ChecklistItem
            key={character.name}
            character={character.name}
            found={isFound(character.name)}
          />
        ))}
      </ul>
    </>
  );
};

export default Checklist;
