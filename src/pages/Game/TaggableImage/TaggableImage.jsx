import { useState, useRef } from "react";
import Magnifier from "../Magnifier/Maginifier";
import styles from "./TaggableImage.module.css";
import ImageLoader from "../../../components/ImageLoader/ImageLoader";
import IncorrectIcon from "../../../assets/incorrect.svg";
import PropTypes from "prop-types";

const TaggableImage = ({
  imageUrl,
  characters,
  checkAnswer,
  correctAnswers,
  levelComplete,
}) => {
  const [clickedCoords, setClickedCoords] = useState({ x: 0, y: 0 });
  const [hoverCoords, setHoverCoords] = useState({ x: 0, y: 0 });
  const [magnifierBehaviour, setMagnifierBehaviour] = useState("hidden");
  const [showIncorrectMark, setShowIncorrectMark] = useState(false);
  const imageRef = useRef(null);

  const handleClick = (e) => {
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

  const handleMouseMove = (e) => {
    const { top, left } = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - left);
    const y = Math.round(e.clientY - top);
    setHoverCoords({ x, y });
  };

  // Call checkAnswer prop with additional side effects
  const customCheckAnswer = async (character) => {
    setMagnifierBehaviour("hover");

    // Create answer object
    const img = imageRef.current;
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

  const getAnswerMarkerPositionStyles = (data) => {
    // Normalise coords to current img dimensions
    const img = imageRef.current;
    const xCoord = data.xCoord * (img.width / img.naturalWidth);
    const yCoord = data.yCoord * (img.height / img.naturalHeight);

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
    <div
      className={styles.imageContainer}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setMagnifierBehaviour("hover")}
      onMouseLeave={() => setMagnifierBehaviour("hidden")}
    >
      <ImageLoader
        src={imageUrl}
        alt="Where's Wally Game"
        imgClass={styles.image}
        imgRef={imageRef}
        spinnerColour="hsl(288, 70%, 49%)"
        placeholderClass={styles.placeholder}
      />

      {/* Correct answer markers */}
      {correctAnswers.map((answer) => (
        <div
          key={answer.character}
          className={styles.correct}
          style={getAnswerMarkerPositionStyles(answer)}
        >
          <img src={answer.imageUrl} className={styles.correctImg} />
        </div>
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
        <img
          src={IncorrectIcon}
          alt="Incorrect"
          className={styles.incorrect}
          style={{
            left: clickedCoords.x + "px",
            top: clickedCoords.y + "px",
          }}
        />
      )}
    </div>
  );
};

TaggableImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  checkAnswer: PropTypes.func.isRequired,
  correctAnswers: PropTypes.arrayOf(
    PropTypes.shape({
      character: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      xCoord: PropTypes.number.isRequired,
      yCoord: PropTypes.number.isRequired,
    })
  ).isRequired,
  levelComplete: PropTypes.bool.isRequired,
};

export default TaggableImage;
