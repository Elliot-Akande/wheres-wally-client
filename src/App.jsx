import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to={"/"} className={styles.link}>
          Where&apos;s Wally?
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
