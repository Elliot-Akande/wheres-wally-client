import ChecklistItem from "../ChecklistItem/ChecklistItem";
import { StyledChecklist } from "./styles";

interface ChecklistProps {
  characters: Array<{
    name: string;
    imageUrl: string;
  }>;
  correctAnswers: Array<{
    character: string;
  }>;
}

const Checklist = ({ characters, correctAnswers }: ChecklistProps) => {
  const isFound = (characterName: string) => {
    return correctAnswers.find((answer) => answer.character === characterName);
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

export default Checklist;
