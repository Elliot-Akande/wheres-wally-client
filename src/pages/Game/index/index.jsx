import { useEffect, useState } from "react";
import { Link, json, useParams } from "react-router-dom";
import Checklist from "../Checklist/Checklist";
import LevelCompleteMenu from "../LevelCompleteMenu/LevelCompleteMenu";
import TaggableImage from "../TaggableImage/TaggableImage";
import checkAnswerCorrect from "../checkAnswerCorrect";
import useFetch from "../../../hooks/useFetch";

const Game = () => {
  const { levelNum } = useParams();
  const { data, loading, error } = useFetch(`/levels/${levelNum}`);

  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [levelComplete, setLevelComplete] = useState(false);

  useEffect(() => {
    const checkLevelComplete = () => {
      const allCharacters = data.characters.toSorted();
      const foundCharacters = correctAnswers.toSorted();

      if (foundCharacters.length === 5) {
        setLevelComplete(true);
      }
    };

    if (data) checkLevelComplete();
  }, [correctAnswers]);

  const fetchWithPromise = async (uri, opts = {}) => {
    const api = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(api + uri, opts);
      const jsonData = await response.json();
      if (!response.ok) {
        console.log(jsonData);
        const err = new Error(jsonData);
        err.status = response.status;
        throw err;
      }

      return jsonData;
    } catch (err) {
      err.message = "An error occured when fetching data.";
      return err;
    }
  };

  const checkAnswer = async (answer) => {
    const data = await fetchWithPromise(`/levels/${levelNum}/check-answer`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    });

    if (!(data instanceof Error) && data.isCorrect) {
      setCorrectAnswers((pastAnswers) => [...pastAnswers, answer]);
      return true;
    }

    return false;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  const remainingCharacters = data.characters.filter(
    (character) =>
      !correctAnswers.find((answer) => character.name === answer.character)
  );

  return (
    <>
      <h1>Level {levelNum}</h1>
      <TaggableImage
        imageUrl={data.imageUrl}
        checkAnswer={checkAnswer}
        characters={remainingCharacters}
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
