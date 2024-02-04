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
  const [coords, setCoords] = useState(null);
  const [showIncorrectMark, setShowIncorrectMark] = useState(false);
  const imageRef = useRef(null);

  const handleClick = (e) => {
    if (levelComplete) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    setCoords({ x, y });
    setShowIncorrectMark(false);
  };

  const handleCorrectAnswer = () => {
    setCoords(null);
  };

  const handleWrongAnswer = () => {
    setShowIncorrectMark(true);
  };

  const customCheckAnswer = (character) => {
    const img = imageRef.current;
    const normalisedX = coords.x / img.width;
    const normalisedY = coords.y / img.height;

    const answer = {
      xCoord: Math.round(img.naturalWidth * normalisedX),
      yCoord: Math.round(img.naturalHeight * normalisedY),
      character,
    };

    checkAnswer(answer) ? handleCorrectAnswer() : handleWrongAnswer();
  };

  return (
    <div className={styles.imageContainer} onClick={handleClick}>
      <img
        src={imageUrl}
        alt="Where's Wally Game"
        className={styles.image}
        ref={imageRef}
      />

      {/* SelectionBox */}
      {showIncorrectMark ? (
        <div
          className={styles.incorrect}
          style={{
            left: coords.x + "px",
            top: coords.y + "px",
          }}
        >
          X
        </div>
      ) : (
        <SelectionBox
          coords={coords}
          characters={characters}
          checkAnswer={customCheckAnswer}
        />
      )}

      {/* Correct answer markers */}
      {correctAnswers.map((answer) => (
        <div
          key={answer.character}
          className={styles.marker}
          style={{
            left: answer.xCoord + "px",
            top: answer.yCoord + "px",
          }}
        >
          {answer.character}
        </div>
      ))}
    </div>
  );
};

export default TaggableImage;
