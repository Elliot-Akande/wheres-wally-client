import ImageLoader from "../../../components/ImageLoader/ImageLoader";
import { StyledChecklistItem, imgStyles } from "./styles";

interface ChecklistItemProps {
  character: {
    name: string;
    imageUrl: string;
  };
  checked: boolean;
}

const ChecklistItem = ({ character, checked }: ChecklistItemProps) => {
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

export default ChecklistItem;
