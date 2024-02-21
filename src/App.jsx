import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./App.module.css";
import GithubIcon from "./assets/github-mark.svg";

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to={"/"} className={styles.link}>
          Where&apos;s Wally?
        </Link>
        <a
          href="https://github.com/Elliot-Akande/wheres-wally-client"
          target="_blank"
        >
          <img src={GithubIcon} alt="Github" className={styles.github}></img>
        </a>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
