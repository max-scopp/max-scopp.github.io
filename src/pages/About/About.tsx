import PageLead from "../../components/PageLead/PageLead";

export default function About() {
  return (
    <>
      <PageLead>Welcome to my corner of the web.</PageLead>

      <article>
        <p>
          I'm Maximilian Scopp, a senior frontend developer with a passion for
          crafting exceptional online experiences. I specialize in the art of{" "}
          <u>clean architecture</u> and <u>captivating design</u>.
        </p>
        <p>
          <b>My approach?</b> It's all about making technology work its magic
          while <i>keeping things practical</i>. JavaScript is my playground,
          and I'm all about using established frameworks and libraries to bring
          ideas to life.
        </p>
        <p>
          No need for bleeding-edge chaos &mdash; I believe in what works best.
          <br />
          And when it comes to projects that demand robustness, <br />
          <u>TypeScript</u> is my go-to, especially{" "}
          <u>for enterprise-level work</u>.
        </p>
        <p>
          <b>
            There won't be <code>any</code> type casts.
          </b>
        </p>
        <hr />
        <p>
          But it's not just about the code &mdash; I believe in the strength of
          community. My strong connection to the vibrant JavaScript community
          keeps me at the forefront of trends and innovations, ensuring that I
          deliver nothing but the best to my clients.
        </p>
        <p>
          Influenced by the wisdom of .NET Core and the structured elegance of
          Angular, I've honed a style that marries efficiency and creativity.
        </p>

        <p>
          <a href="mailto:me@maxscopp.de" target="_blank">
            Let's collaborate to build digital landscapes that don't
            <br /> just meet expectations &mdash; they redefine them.
          </a>
        </p>
      </article>
    </>
  );
}
