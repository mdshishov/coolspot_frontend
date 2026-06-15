import { useEffect } from "react";
import type { ReactNode } from "react";

import { createPortal } from "react-dom";
import { Button } from "../Button/Button";
import { CloseIcon } from "@/assets/icons";

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

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
        <Button
          type="button"
          onClick={onClose}
          variant="secondary"
          className={styles.closeBtn}
        >
          <CloseIcon />
        </Button>
      </div>
    </div>,
    document.body,
  );
}
