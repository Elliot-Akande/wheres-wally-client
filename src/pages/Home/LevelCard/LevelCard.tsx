import ImageLoader from "../../../components/ImageLoader/ImageLoader";
import { StyledLevelCard, Title, imgStyles } from "./styles";

const LevelCard = ({ levelNum, imageUrl }) => {
  return (
    <StyledLevelCard to={`level/${levelNum}/details`}>
      <ImageLoader
        src={imageUrl}
        alt={`Level ${levelNum}`}
        imgStyles={imgStyles}
        placeholderStyles={{ backgroundColor: "var(--neutral-700)" }}
        spinnerColour={"hsl(288, 70%, 49%)"}
      />
      <Title>LEVEL {levelNum}</Title>
    </StyledLevelCard>
  );
};

export default LevelCard;
