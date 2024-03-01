import PropTypes from "prop-types";
import ImageLoader from "../../../components/ImageLoader/ImageLoader";
import { StyledChecklistItem, imgStyles } from "./styles";

const ChecklistItem = ({ character, checked }) => {
  return (
    <StyledChecklistItem $checked={checked}>
      <ImageLoader
        src={character.imageUrl}
        alt={character.name}
        imgStyles={imgStyles}
        spinnerColour={"hsl(288, 70%, 49%)"}
        spinnerWidth={3}
        spinnerHeight={26}
      />
      {character.name}
    </StyledChecklistItem>
  );
};

ChecklistItem.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  checked: PropTypes.bool.isRequired,
};

export default ChecklistItem;
