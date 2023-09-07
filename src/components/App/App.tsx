import styles from "./App.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useEffect } from "preact/hooks";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "instant" });
  }, [location.pathname]);

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
