import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.host}>
      <ul>
        <li>
          <Link target="_blank" to="https://www.linkedin.com/in/max-scopp/">
            linkedin
          </Link>
        </li>
        <li>
          <Link target="_blank" to="https://codepen.io/max-scopp">
            codepen
          </Link>
        </li>
        <li>
          <Link target="_blank" to="https://github.com/max-scopp">
            github
          </Link>
        </li>
      </ul>
      <a
        href="https://simple.wikipedia.org/wiki/Polysexuality"
        target="_blank"
        className={styles.polyFlag}
        aria-hidden="true"
        role="presentation"
      />
    </footer>
  );
}
