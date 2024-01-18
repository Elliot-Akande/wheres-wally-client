import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Checklist from "../Checklist/Checklist";
import LevelCompleteMenu from "../LevelCompleteMenu/LevelCompleteMenu";
import TaggableImage from "../TaggableImage/TaggableImage";

const useLevelData = (levelNum) => {
  return {
    data: {
      token: "token",
      img: "#",
      characters: ["Wally", "Woof", "Odlaw"],
    },
    loading: false,
    error: null,
  };
};

const checkAnswerRequest = (levelNum, answer) => {
  return true;
};

const Game = () => {
  const { levelNum } = useParams();
  const { data, loading, error } = useLevelData(levelNum);

  const [correctAnswers, setCorrectAnswers] = useState({});
  const [levelComplete, setLevelComplete] = useState(false);

  useEffect(() => {
    const checkLevelComplete = () => {
      const allCharacters = data.characters.toSorted();
      const foundCharacters = Object.keys(correctAnswers).toSorted();

      if (allCharacters.toString() === foundCharacters.toString()) {
        setLevelComplete(true);
      }
    };

    checkLevelComplete();
  }, [correctAnswers]);

  const checkAnswer = (coords, character) => {
    const answer = { [character]: { ...coords } };

    // Check answer data
    if (!checkAnswerRequest(levelNum, answer)) {
      return false;
    }

    setCorrectAnswers((pastAnswers) => ({ ...pastAnswers, ...answer }));
    return true;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  const remainingCharacters = data.characters.filter(
    (character) => !Object.keys(correctAnswers).includes(character)
  );

  return (
    <>
      <h1>Level {levelNum}</h1>
      <TaggableImage
        image={data.img}
        characters={remainingCharacters}
        checkAnswer={checkAnswer}
        correctAnswers={correctAnswers}
        levelComplete={levelComplete}
      />
      <Checklist characters={data.characters} correctAnswers={correctAnswers} />
      <Link to="/">Quit level</Link>

      {levelComplete && <LevelCompleteMenu />}
    </>
  );
};

export default Game;
