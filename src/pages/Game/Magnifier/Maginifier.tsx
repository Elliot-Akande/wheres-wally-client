import PropTypes from "prop-types";
import SelectionMenu from "../SelectionMenu/SelectionMenu";
import { StyledMagnifier } from "./styles";

const Magnifier = ({
  clickedCoords,
  hoverCoords,
  magnifierBehaviour,
  characters,
  checkAnswer,
  imageUrl,
  imageDimensions,
}) => {
  const magnifierProps = {
    $magnifierHeight: 80,
    $magnifierWidth: 80,
    $zoomLevel: 1.5,
    $coords: magnifierBehaviour === "clicked" ? clickedCoords : hoverCoords,
    $hidden: magnifierBehaviour === "hidden",
    $imageUrl: imageUrl,
    $imageDimensions: imageDimensions,
  };

  const menuDirection = (() => {
    if (magnifierBehaviour !== "clicked") return;

    if (clickedCoords.x < imageDimensions.width / 2) {
      return "right";
    }
    return "left";
  })();

  return (
    <>
      <StyledMagnifier {...magnifierProps}>
        {magnifierBehaviour === "clicked" && (
          <SelectionMenu
            checkAnswer={checkAnswer}
            characters={characters}
            menuDirection={menuDirection}
          />
        )}
      </StyledMagnifier>
    </>
  );
};

Magnifier.propTypes = {
  clickedCoords: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  hoverCoords: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  magnifierBehaviour: PropTypes.string.isRequired,
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  checkAnswer: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageDimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

export default Magnifier;
