import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Leaderboard from "../../../components/Leaderboard/Leaderboard";
import useFetch from "../../../hooks/useFetch";
import fetchAsync from "../../../utils/fetchAsync";
import formatTime from "../../../utils/formatTime";
import { Button, Heading, Input, Menu, Score, Wrapper } from "./styles";

interface LevelCompleteMenuProps {
  levelNum?: string;
  score: number;
  token: string;
}

interface Data {
  scores: Array<{
    _id: string;
    name: string;
    score: number;
  }>;
}

const LevelCompleteMenu = ({
  levelNum,
  score,
  token,
}: LevelCompleteMenuProps) => {
  const { data, loading, error } = useFetch<Data>(
    `/levels/${levelNum}/leaderboard`
  );
  const [updatedData, setUpdatedData] = useState<Data | Error | null>(null);
  const [name, setName] = useState("Anon");
  const navigate = useNavigate();

  if (error) {
    return (
      <Wrapper>
        <Menu>
          <h2>Level complete!</h2>
          <p>There was an error contacting the server.</p>
          <Button type="button" onClick={() => navigate("/")}>
            Home
          </Button>
        </Menu>
      </Wrapper>
    );
  }

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    e.currentTarget.disabled = true;
    const response = await fetchAsync<Data>(`/levels/${levelNum}/leaderboard`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setUpdatedData(response);
  };

  const getMenuBody = () => {
    // Score not submitted yet
    if (updatedData === null) {
      return (
        <>
          <Score>
            Your Score - <b>{formatTime(score)}</b>
          </Score>
          <Leaderboard data={data} loading={loading} />
          <form>
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              id="name"
              maxLength={32}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </>
      );
    }

    // Error submitting score
    if (updatedData instanceof Error) {
      return (
        <>
          <p>There was an error contacting the server.</p>
          <Button type="button" onClick={() => navigate("/")}>
            Home
          </Button>
        </>
      );
    }

    // Score submitted
    return (
      <>
        <Leaderboard data={updatedData} loading={loading} />
        <Button onClick={() => navigate("/")}>Finish</Button>
      </>
    );
  };

  return (
    <Wrapper>
      <Menu>
        <Heading>LEVEL COMPLETE!</Heading>
        {getMenuBody()}
      </Menu>
    </Wrapper>
  );
};

export default LevelCompleteMenu;
