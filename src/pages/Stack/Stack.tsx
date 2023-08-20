import PageLead from "../../components/PageLead/PageLead";
import styles from "./Stack.module.scss";

export default function Stack() {
  return (
    <>
      <PageLead>Unleashing Digital Wizardry</PageLead>

      <article>
        <p className={styles.emojiList}>
          <b>🔮 JavaScript/TypeScript</b>: These are my realms of mastery, where
          I orchestrate frontend magic. JavaScript's flexibility and
          TypeScript's safety dance together in perfect harmony. From dynamic
          interactions to structured systems, I weave spells using the likes of
          React, Angular, and Vue.
        </p>

        <hr />

        <p>But, let's pivot to the ensemble I conduct:</p>

        <p className={styles.emojiList}>
          <b>💎 Ruby</b>: I waltz with Ruby on Rails, crafting elegant backends
          that complement frontend symphonies.
          <br />
          <b>🐍 Python</b>: My serenade with Django leads to backend ballads
          that resonate.
          <br />
          <b>🔧 C#</b>: With .NET Core and Xamarin, I compose apps that bridge
          the digital and physical.
          <br />
          <b>🤖 C++</b>: Arduino and Marlin become my instruments, crafting
          tangible tech marvels.
        </p>

        <p>And as the curtain falls, here are the refrains I refrain from:</p>

        <p className={styles.emojiList}>
          <b>🚫 Java</b>: A path not ventured.
          <br />
          <b>🚫 PHP</b>: Songs of yore, no longer hummed.
          <br />
          <b>🚫 CoffeeScript, Visual Basic, SQL, Go, Dart</b>: Tunes that didn't
          quite make the cut.
        </p>

        <p>
          <a href="mailto:me@maxscopp.de">
            So join me in this symphony of tech, where lines of code compose
            enchanting melodies, and innovation knows no bounds.
          </a>
        </p>
      </article>
    </>
  );
}
