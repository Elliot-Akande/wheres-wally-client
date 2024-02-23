import SelectionMenu from "../SelectionMenu/SelectionMenu";
import styles from "./Maginifier.module.css";

const Magnifier = ({
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
  const menuDirection = (() => {
    if (magnifierBehaviour !== "clicked") return;

    if (clickedCoords.x < imageDimensions.width / 2) {
      return "left";
    }
    return "right";
  })();

  const calculatedStyles = {
    height: `${magnifierHeight}px`,
    width: `${magnifierWidth}px`,
    top: `${coords.y - magnifierHeight / 2}px`,
    left: `${coords.x - magnifierWidth / 2}px`,

    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: `${imageDimensions.width * zoomLevel}px ${
      imageDimensions.height * zoomLevel
    }px`,
    backgroundPositionX: `${-coords.x * zoomLevel + magnifierWidth / 2}px`,
    backgroundPositionY: `${-coords.y * zoomLevel + magnifierHeight / 2}px`,
    opacity: magnifierBehaviour === "hidden" ? 0 : 1,
  };

  return (
    <>
      <div className={styles.magnifier} style={calculatedStyles}>
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

export default Magnifier;
