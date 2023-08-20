import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.host}>
      <Link to="/">max-scopp</Link>
      <nav>
        <ul>
          <li>
            <NavLink to="/about">about</NavLink>
          </li>
          <li>
            <NavLink to="/stack">stack</NavLink>
          </li>
          <li>
            <NavLink to="/3d-printing">printing</NavLink>
          </li>
          <li>
            <NavLink to="/legal">legal</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
