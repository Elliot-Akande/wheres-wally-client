import PropTypes from "prop-types";
import { Button, Image, StyledSelectionMenu } from "./styles";

const SelectionMenu = ({ characters, checkAnswer, menuDirection }) => {
  const handleClick = (e, name) => {
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

SelectionMenu.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  checkAnswer: PropTypes.func.isRequired,
  menuDirection: PropTypes.string.isRequired,
};

export default SelectionMenu;
