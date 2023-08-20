import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function App() {
  return (
    <div className={styles.host}>
      <Header></Header>

      <main>
        <Outlet />
      </main>

      <Footer></Footer>
    </div>
  );
}
