import styles from "./SelectionBox.module.css";

const SelectionBox = ({ coords, characters, checkAnswer }) => {
  if (!coords) return null;

  return (
    <>
      <div
        className={styles.selectionBox}
        style={{
          left: coords.x + "px",
          top: coords.y + "px",
        }}
      >
        <SelectionMenu checkAnswer={checkAnswer} characters={characters} />
      </div>
    </>
  );
};

const SelectionMenu = ({ characters, checkAnswer }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    checkAnswer(e.currentTarget.innerText);
  };

  return (
    <ul className={styles.menu}>
      {characters.map((character) => (
        <li onClick={handleClick} key={character}>
          {character}
        </li>
      ))}
    </ul>
  );
};

export default SelectionBox;
