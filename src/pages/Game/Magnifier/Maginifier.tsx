import SelectionMenu from "../SelectionMenu/SelectionMenu";
import { StyledMagnifier } from "./styles";

interface Character {
  name: string;
  imageUrl: string;
}

interface MagnifierProps {
  clickedCoords: {
    x: number;
    y: number;
  };
  hoverCoords: {
    x: number;
    y: number;
  };
  magnifierBehaviour: "hidden" | "hover" | "clicked";
  characters: Character[];
  checkAnswer: (answer: string) => Promise<void>;
  imageUrl: string;
  imageDimensions: {
    width: number;
    height: number;
  };
}

const Magnifier = ({
  clickedCoords,
  hoverCoords,
  magnifierBehaviour,
  characters,
  checkAnswer,
  imageUrl,
  imageDimensions,
}: MagnifierProps) => {
  const magnifierProps = {
    $magnifierHeight: 80,
    $magnifierWidth: 80,
    $zoomLevel: 1.5,
    $coords: magnifierBehaviour === "clicked" ? clickedCoords : hoverCoords,
    $hidden: magnifierBehaviour === "hidden",
    $imageUrl: imageUrl,
    $imageDimensions: imageDimensions,
  };

  const getMenuDirection = (): "left" | "right" => {
    if (clickedCoords.x < imageDimensions.width / 2) {
      return "right";
    }
    return "left";
  };

  return (
    <>
      <StyledMagnifier {...magnifierProps}>
        {magnifierBehaviour === "clicked" && (
          <SelectionMenu
            checkAnswer={checkAnswer}
            characters={characters}
            menuDirection={getMenuDirection()}
          />
        )}
      </StyledMagnifier>
    </>
  );
};

export default Magnifier;
