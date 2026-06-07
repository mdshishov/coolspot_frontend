import { useEffect } from "react";
import type { ReactNode } from "react";

import styles from "./Overlay.module.scss";

type Props = {
  children: ReactNode;
  onClose?: () => void;
};

export function Overlay({ children, onClose }: Props) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.content}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
