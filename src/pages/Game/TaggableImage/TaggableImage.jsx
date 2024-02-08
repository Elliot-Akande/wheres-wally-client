import { useState, useRef } from "react";
import SelectionBox from "../SelectionBox/SelectionBox";
import styles from "./TaggableImage.module.css";

const TaggableImage = ({
  imageUrl,
  characters,
  checkAnswer,
  correctAnswers,
  levelComplete,
}) => {
  const [clickedCoords, setClickedCoords] = useState(null);
  const [hoverCoords, setHoverCoords] = useState(null);
  const [showIncorrectMark, setShowIncorrectMark] = useState(false);
  const imageRef = useRef(null);

  const handleClick = (e) => {
    if (levelComplete) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    setClickedCoords({ x, y });
    setShowIncorrectMark(false);
  };

  const handleCorrectAnswer = () => {
    setClickedCoords(null);
  };

  const handleWrongAnswer = () => {
    setShowIncorrectMark(true);
  };

  const customCheckAnswer = async (character) => {
    const img = imageRef.current;
    const normalisedX = clickedCoords.x / img.width;
    const normalisedY = clickedCoords.y / img.height;

    const answer = {
      xCoord: Math.round(img.naturalWidth * normalisedX),
      yCoord: Math.round(img.naturalHeight * normalisedY),
      character,
    };

    (await checkAnswer(answer)) ? handleCorrectAnswer() : handleWrongAnswer();
  };

  const getPostitionStyles = (data) => {
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
    <div className={styles.imageContainer}>
      <img
        src={imageUrl}
        alt="Where's Wally Game"
        className={styles.image}
        ref={imageRef}
        onClick={handleClick}
        onMouseMove={(e) => {
          const { top, left } = e.currentTarget.getBoundingClientRect();
          const x = Math.round(e.pageX - left - scrollX);
          const y = Math.round(e.pageY - top - scrollY);
          setHoverCoords({ x, y });
        }}
        onMouseLeave={() => setHoverCoords(null)}
      />

      {/* SelectionBox */}
      {showIncorrectMark ? (
        <div
          className={styles.incorrect}
          style={{
            left: clickedCoords.x + "px",
            top: clickedCoords.y + "px",
          }}
        >
          X
        </div>
      ) : (
        <SelectionBox
          clickedCoords={clickedCoords}
          hoverCoords={hoverCoords}
          characters={characters}
          checkAnswer={customCheckAnswer}
          imageDimensions={getImgDimensions()}
          imageUrl={imageUrl}
        />
      )}

      {/* Correct answer markers */}
      {correctAnswers.map((answer) => (
        <div
          key={answer.character}
          className={styles.marker}
          style={getPostitionStyles(answer)}
        >
          <img src={answer.imageUrl} className={styles.markerImg} />
        </div>
      ))}
    </div>
  );
};

export default TaggableImage;
