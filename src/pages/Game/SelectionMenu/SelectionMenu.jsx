import PropTypes from "prop-types";
import styles from "./SelectionMenu.module.css";

const SelectionMenu = ({ characters, checkAnswer, menuDirection }) => {
  const handleClick = (e, name) => {
    e.stopPropagation();
    checkAnswer(name);
  };

  return (
    <ul
      className={`${styles.menu} ${
        menuDirection === "left" ? styles.menuLeft : ""
      }`}
    >
      {characters.map((character) => (
        <li key={character.name}>
          <button
            className={styles.item}
            onClick={(e) => handleClick(e, character.name)}
          >
            <img
              src={character.imageUrl}
              alt={character.name}
              className={styles.img}
              aria-hidden="true"
            />
            {character.name}
          </button>
        </li>
      ))}
    </ul>
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
