import { Link } from "react-router-dom";
import PageLead from "../../components/PageLead/PageLead";
import TagList from "../../components/TagList/TagList";

import styles from "./Home.module.scss";

export default function Home() {
  return (
    <>
      <PageLead className={styles.mainPageLead}>
        Crafting Exquisite Digital Experiences.
      </PageLead>
      <PageLead as="h2">
        Elevating Frontend Development with Clean Architecture and Exceptional
        Design.
      </PageLead>

      <TagList
        tags={[
          "TypeScript",
          "React",
          "Hybrid Apps",
          "Electron",
          "Stencil",
          "Design Systems",
        ]}
      />

      <Link className={styles.sideHustle} to="3d-printing">
        Check out my side hustle
      </Link>
    </>
  );
}
