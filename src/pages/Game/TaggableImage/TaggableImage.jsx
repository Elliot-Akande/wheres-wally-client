import { useState } from "react";
import SelectionBox from "../SelectionBox/SelectionBox";
import styles from "./TaggableImage.module.css";

const TaggableImage = ({
  image,
  characters,
  checkAnswer,
  correctAnswers,
  levelComplete,
}) => {
  const [coords, setCoords] = useState(null);
  const [showIncorrectMark, setShowIncorrectMark] = useState(false);

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
    checkAnswer(coords, character)
      ? handleCorrectAnswer()
      : handleWrongAnswer();
  };

  return (
    <div className={styles.image} onClick={handleClick}>
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
      {Object.keys(correctAnswers).map((answer) => (
        <div
          key={answer}
          className={styles.marker}
          style={{
            left: correctAnswers[answer].x + "px",
            top: correctAnswers[answer].y + "px",
          }}
        >
          {answer}
        </div>
      ))}
    </div>
  );
};

export default TaggableImage;
