import { Button, Image, StyledSelectionMenu } from "./styles";

interface Character {
  name: string;
  imageUrl: string;
}

interface SelectionMenuProps {
  characters: Character[];
  checkAnswer: (answer: string) => Promise<void>;
  menuDirection: "left" | "right";
}

const SelectionMenu = ({
  characters,
  checkAnswer,
  menuDirection,
}: SelectionMenuProps) => {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    name: string
  ) => {
    e.stopPropagation();
    checkAnswer(name);
  };

  return (
    <StyledSelectionMenu $isLeft={menuDirection === "left"}>
      {characters.map((character) => (
        <li key={character.name}>
          <Button onClick={(e) => handleClick(e, character.name)}>
            <Image src={character.imageUrl} alt="" />
            {character.name}
          </Button>
        </li>
      ))}
    </StyledSelectionMenu>
  );
};

export default SelectionMenu;
