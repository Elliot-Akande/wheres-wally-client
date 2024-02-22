import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Leaderboard from "../../../components/Leaderboard/Leaderboard";
import useFetch from "../../../hooks/useFetch";
import fetchAsync from "../../../utils/fetchAsync";
import formatTime from "../../../utils/formatTime";
import styles from "./LevelCompleteMenu.module.css";

const LevelCompleteMenu = ({ levelNum, score, token }) => {
  const { data, loading, error } = useFetch(`/levels/${levelNum}/leaderboard`);
  const [updatedData, setUpdatedData] = useState(null);
  const [name, setName] = useState("Anon");
  const navigate = useNavigate();

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.menu}>
          <h2>Level complete!</h2>
          <p>There was an error contacting the server.</p>
          <button type="button" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </div>
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
          <p className={styles.score}>
            Your Score - <b>{formatTime(score)}</b>
          </p>
          <Leaderboard data={data} loading={loading} />
          <form className={styles.form}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              className={styles.input}
              maxLength={32}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              className={styles.button}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </>
      );
    }

    // Error submitting score
    if (updatedData instanceof Error) {
      return (
        <>
          <p>There was an error contacting the server.</p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className={styles.button}
          >
            Home
          </button>
        </>
      );
    }

    // Score submitted
    return (
      <>
        <Leaderboard data={updatedData} loading={loading} />
        <button onClick={() => navigate("/")} className={styles.button}>
          Finish
        </button>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <h1 className={styles.heading}>LEVEL COMPLETE!</h1>
        {getMenuBody()}
      </div>
    </div>
  );
};

LevelCompleteMenu.propTypes = {
  levelNum: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

export default LevelCompleteMenu;
