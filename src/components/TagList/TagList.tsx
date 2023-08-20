import styles from "./TagList.module.scss";

export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div className={styles.host}>
      {tags.map((tag) => (
        <span className={styles.tag}>{tag}</span>
      ))}
    </div>
  );
}
