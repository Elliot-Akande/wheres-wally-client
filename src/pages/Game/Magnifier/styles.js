import { styled } from "styled-components";

export const StyledMagnifier = styled.div.attrs(
  ({
    $magnifierHeight,
    $magnifierWidth,
    $coords,
    $imageUrl,
    $imageDimensions,
    $zoomLevel,
    $hidden,
  }) => ({
    style: {
      height: `${$magnifierHeight}px`,
      width: `${$magnifierWidth}px`,
      top: `${$coords.y - $magnifierHeight / 2}px`,
      left: `${$coords.x - $magnifierWidth / 2}px`,

      backgroundImage: `url('${$imageUrl}')`,
      backgroundSize: `${$imageDimensions.width * $zoomLevel}px ${
        $imageDimensions.height * $zoomLevel
      }px`,
      backgroundPositionX: `${-$coords.x * $zoomLevel + $magnifierWidth / 2}px`,
      backgroundPositionY: `${
        -$coords.y * $zoomLevel + $magnifierHeight / 2
      }px`,
      opacity: $hidden ? 0 : 1,
    },
  })
)`
  position: absolute;
  pointer-events: none;

  display: flex;
  justify-content: center;

  border-radius: 50px;
  border: 2px solid var(--accent);
  box-shadow: 0 0 3px 3px var(--neutral-900);
  background-repeat: no-repeat;
  transition: opacity 0.15s;
`;
