import styles from "./SelectionMenu.module.css";

const SelectionMenu = ({ characters, checkAnswer, menuDirection }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    checkAnswer(e.currentTarget.innerText);
  };

  return (
    <ul
      className={`${styles.menu} ${
        menuDirection === "left" ? styles.menuLeft : ""
      }`}
    >
      {characters.map((character) => (
        <li onClick={handleClick} key={character.name} className={styles.item}>
          <img
            src={character.imageUrl}
            alt={character.name}
            className={styles.img}
          />
          {character.name}
        </li>
      ))}
    </ul>
  );
};

export default SelectionMenu;
