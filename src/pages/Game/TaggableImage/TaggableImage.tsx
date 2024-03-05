import { useRef, useState } from "react";
import IncorrectIcon from "../../../assets/incorrect.svg";
import ImageLoader from "../../../components/ImageLoader/ImageLoader";
import Magnifier from "../Magnifier/Maginifier";
import {
  CorrectContainer,
  CorrectImg,
  IncorrectImg,
  StyledTaggableImage,
  imageStyles,
} from "./styles";

interface Answer {
  character: string;
  xCoord: number;
  yCoord: number;
}

interface CorrectAnswer extends Answer {
  imageUrl: string;
}

interface TaggableImageProps {
  imageUrl: string;
  characters: Array<{
    name: string;
    imageUrl: string;
  }>;
  checkAnswer: (answer: Answer) => Promise<boolean>;
  correctAnswers: CorrectAnswer[];
  levelComplete: boolean;
}

type MagnifierBehaviour = "hidden" | "hover" | "clicked";

const TaggableImage = ({
  imageUrl,
  characters,
  checkAnswer,
  correctAnswers,
  levelComplete,
}: TaggableImageProps) => {
  const [clickedCoords, setClickedCoords] = useState({ x: 0, y: 0 });
  const [hoverCoords, setHoverCoords] = useState({ x: 0, y: 0 });
  const [magnifierBehaviour, setMagnifierBehaviour] =
    useState<MagnifierBehaviour>("hidden");
  const [showIncorrectMark, setShowIncorrectMark] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (levelComplete) return;

    // Hide character selection menu
    if (magnifierBehaviour === "clicked") {
      setMagnifierBehaviour("hover");
      return;
    }

    const { top, left } = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - left);
    const y = Math.round(e.clientY - top);

    setShowIncorrectMark(false);
    setClickedCoords({ x, y });
    setMagnifierBehaviour("clicked");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const { top, left } = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - left);
    const y = Math.round(e.clientY - top);
    setHoverCoords({ x, y });
  };

  // Call checkAnswer prop with additional side effects
  const customCheckAnswer = async (character: string): Promise<void> => {
    setMagnifierBehaviour("hover");

    // Create answer object
    const img = imageRef.current;
    if (!img) return;

    const normalisedX = clickedCoords.x / img.width;
    const normalisedY = clickedCoords.y / img.height;
    const answer = {
      // Denormalised coords
      xCoord: Math.round(img.naturalWidth * normalisedX),
      yCoord: Math.round(img.naturalHeight * normalisedY),
      character,
    };

    if (!(await checkAnswer(answer))) {
      // Answer is incorrect
      setShowIncorrectMark(true);
      setTimeout(() => {
        setShowIncorrectMark(false);
      }, 1000);
    }
  };

  const getAnswerMarkerPositionStyles = (
    answer: Answer
  ): { left: string; top: string } => {
    // Normalise coords to current img dimensions
    const img = imageRef.current;
    if (!img)
      return {
        left: "0px",
        top: "0px",
      };

    const xCoord = answer.xCoord * (img.width / img.naturalWidth);
    const yCoord = answer.yCoord * (img.height / img.naturalHeight);

    return {
      left: `${xCoord}px`,
      top: `${yCoord}px`,
    };
  };

  const getImgDimensions = () => {
    if (imageRef.current === null) return { width: 0, height: 0 };

    const { width, height } = imageRef.current;
    return { width, height };
  };

  return (
    <StyledTaggableImage
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setMagnifierBehaviour("hover")}
      onMouseLeave={() => setMagnifierBehaviour("hidden")}
    >
      <ImageLoader
        src={imageUrl}
        alt="Where's Wally Game"
        ref={imageRef}
        imgStyles={imageStyles}
        spinnerColour="hsl(288, 70%, 49%)"
        placeholderStyles={{ paddingTop: "48px" }}
      />

      {/* Correct answer markers */}
      {correctAnswers.map((answer) => (
        <CorrectContainer
          key={answer.character}
          $positionStyles={getAnswerMarkerPositionStyles(answer)}
        >
          <CorrectImg src={answer.imageUrl} />
        </CorrectContainer>
      ))}

      <Magnifier
        clickedCoords={clickedCoords}
        hoverCoords={hoverCoords}
        magnifierBehaviour={magnifierBehaviour}
        characters={characters}
        checkAnswer={customCheckAnswer}
        imageDimensions={getImgDimensions()}
        imageUrl={imageUrl}
      />

      {showIncorrectMark && (
        <IncorrectImg
          src={IncorrectIcon}
          alt="Incorrect"
          $coords={clickedCoords}
        />
      )}
    </StyledTaggableImage>
  );
};

export default TaggableImage;
