import { clsx } from "clsx";

import styles from "./MenuCard.module.scss";

export function MenuCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.skeletonOverlay}>
        <div className={clsx(styles.image, styles.skeleton)} />
        <div className={styles.skeletonInfo} />
        <div className={styles.skeletonBtn} />
      </div>
    </div>
  );
}
