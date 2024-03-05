import ImageLoader from "../../../components/ImageLoader/ImageLoader";
import { StyledLevelCard, Title, imgStyles } from "./styles";

interface LevelCardProps {
  levelNum: string;
  imageUrl: string;
}

const LevelCard = ({ levelNum, imageUrl }: LevelCardProps) => {
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
