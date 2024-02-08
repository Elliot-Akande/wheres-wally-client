import styles from "./SelectionBox.module.css";

const SelectionBox = ({
  clickedCoords,
  hoverCoords,
  characters,
  checkAnswer,
  imageUrl,
  imageDimensions,
}) => {
  if (!clickedCoords && !hoverCoords) return null;

  const zoomLevel = 1.5;
  const magnifierHeight = 80;
  const magnifierWidth = 80;
  const coords = clickedCoords !== null ? clickedCoords : hoverCoords;

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
        }}
      >
        {clickedCoords !== null && (
          <SelectionMenu checkAnswer={checkAnswer} characters={characters} />
        )}
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
