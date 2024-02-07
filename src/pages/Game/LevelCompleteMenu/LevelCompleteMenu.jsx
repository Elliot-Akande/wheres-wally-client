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
          <button type="button">Home</button>
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

    if (!(response instanceof Error)) {
      setUpdatedData(response);
    }
  };

  const getMenuBody = () => {
    if (updatedData !== null) {
      return (
        <>
          <Leaderboard data={updatedData} loading={loading} />
          <button onClick={() => navigate("/")}>Finish</button>
        </>
      );
    }

    return (
      <>
        <Leaderboard data={data} loading={loading} />
        <p>Your Score - {formatTime(score)}</p>
        <form action="">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <h2>Level complete!</h2>
        {getMenuBody()}
      </div>
    </div>
  );
};

export default LevelCompleteMenu;
