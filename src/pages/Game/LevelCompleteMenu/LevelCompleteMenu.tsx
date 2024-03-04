import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Leaderboard from "../../../components/Leaderboard/Leaderboard";
import useFetch from "../../../hooks/useFetch";
import fetchAsync from "../../../utils/fetchAsync";
import formatTime from "../../../utils/formatTime";
import { Button, Input, Menu, Score, Wrapper, Heading } from "./styles";

const LevelCompleteMenu = ({ levelNum, score, token }) => {
  const { data, loading, error } = useFetch(`/levels/${levelNum}/leaderboard`);
  const [updatedData, setUpdatedData] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.currentTarget.disabled = true;
    const response = await fetchAsync(`/levels/${levelNum}/leaderboard`, {
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

LevelCompleteMenu.propTypes = {
  levelNum: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

export default LevelCompleteMenu;
