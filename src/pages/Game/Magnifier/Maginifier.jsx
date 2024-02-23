import styles from "./Maginifier.module.css";

const SelectionBox = ({
  clickedCoords,
  hoverCoords,
  magnifierBehaviour,
  characters,
  checkAnswer,
  imageUrl,
  imageDimensions,
}) => {
  const zoomLevel = 1.5;
  const magnifierHeight = 80;
  const magnifierWidth = 80;

  const coords = magnifierBehaviour === "clicked" ? clickedCoords : hoverCoords;
  const opacity = magnifierBehaviour === "hidden" ? 0 : 1;
  const menuDirection = (() => {
    if (magnifierBehaviour !== "clicked") return;

    if (clickedCoords.x < imageDimensions.width / 2) {
      return "left";
    }
    return "right";
  })();

  return (
    <>
      <div
        className={styles.selectionBox}
        style={{
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          top: `${coords.y - magnifierHeight / 2}px`,
          left: `${coords.x - magnifierWidth / 2}px`,

          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: `${imageDimensions.width * zoomLevel}px ${
            imageDimensions.height * zoomLevel
          }px`,
          backgroundPositionX: `${
            -coords.x * zoomLevel + magnifierWidth / 2
          }px`,
          backgroundPositionY: `${
            -coords.y * zoomLevel + magnifierHeight / 2
          }px`,
          opacity,
        }}
      >
        {magnifierBehaviour === "clicked" && (
          <SelectionMenu
            checkAnswer={checkAnswer}
            characters={characters}
            menuDirection={menuDirection}
          />
        )}
      </div>
    </>
  );
};

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

export default SelectionBox;
