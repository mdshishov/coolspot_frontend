import { clsx as cn } from "clsx";

import type { ToastItem } from "@/shared/types/toast.types";
import styles from "./Toast.module.scss";

type Props = {
  toast: ToastItem;
  onClose: (id: string) => void;
};

export function Toast({ toast, onClose }: Props) {
  return (
    <div className={cn(styles.toast, styles[toast.type])}>
      <div className={styles.toastContent}>{toast.message}</div>
      <button
        type="button"
        className={styles.toastCloseBtn}
        onClick={() => onClose(toast.id)}
      >
        ×
      </button>
    </div>
  );
}
