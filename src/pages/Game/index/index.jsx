import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import fetchAsync from "../../../utils/fetchAsync";
import Checklist from "../Checklist/Checklist";
import LevelCompleteMenu from "../LevelCompleteMenu/LevelCompleteMenu";
import TaggableImage from "../TaggableImage/TaggableImage";
import { TopContainer, Title } from "./styles";

const Game = () => {
  const { levelNum } = useParams();
  const { data, loading, error } = useFetch(`/levels/${levelNum}`);

  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [completionData, setCompletionData] = useState(null);

  useEffect(() => {
    const checkLevelComplete = async () => {
      const response = await fetchAsync(`/levels/${levelNum}/check-complete`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: correctAnswers }),
      });

      if (!(response instanceof Error) && response.isComplete) {
        setCompletionData(response);
      }
    };

    if (data !== null && correctAnswers.length === data.characters.length) {
      checkLevelComplete();
    }
  }, [correctAnswers]);

  const checkAnswer = async (answer) => {
    const response = await fetchAsync(`/levels/${levelNum}/check-answer`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    });

    if (!(response instanceof Error) && response.isCorrect) {
      // Add imageUrl for displaying correct answers on game image.
      const imageUrl = data.characters.find(
        (character) => character.name === answer.character
      ).imageUrl;

      setCorrectAnswers((pastAnswers) => [
        ...pastAnswers,
        { ...answer, imageUrl },
      ]);
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
      <TopContainer>
        <Title>LEVEL {levelNum}</Title>
        <Checklist
          characters={data.characters}
          correctAnswers={correctAnswers}
        />
      </TopContainer>
      <TaggableImage
        imageUrl={data.imageUrl}
        checkAnswer={checkAnswer}
        characters={remainingCharacters}
        correctAnswers={correctAnswers}
        levelComplete={completionData !== null}
      />

      {completionData !== null && (
        <LevelCompleteMenu
          levelNum={levelNum}
          token={completionData.token}
          score={completionData.score}
        />
      )}
    </>
  );
};

export default Game;
