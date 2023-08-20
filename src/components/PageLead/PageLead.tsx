import { JSX } from "preact/jsx-runtime";
import styles from "./PageLead.module.scss";
import { createElement } from "preact";

export default function PageLead({
  children,
  as = "h1",
  className,
}: {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  return createElement(
    as,
    {
      className: [styles.host, className].join(" "),
    },
    children.split(/[\s]+/).map((word: string) => (
      <>
        <span>{word}</span>{" "}
      </>
    ))
  );
}
