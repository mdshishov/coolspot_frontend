import styles from "./MenuLinks.module.scss";

export function MenuLinksSkeleton() {
  return (
    <nav className={styles.links}>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div className={styles.link} key={i}>
            <div className={styles.imageSkeleton} />
            <div className={styles.titleSkeleton} />
          </div>
        ))}
    </nav>
  );
}
