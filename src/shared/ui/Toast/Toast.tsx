import { clsx as cn } from "clsx";

import type { ToastItem } from "@/shared/types/toast.types";
import styles from "./Toast.module.scss";

type Props = {
  toast: ToastItem;
  onClose: (id: string) => void;
};

export function Toast({ toast, onClose }: Props) {
  const typeClass = {
    success: styles.toastSuccess,
    error: styles.toastError,
    info: styles.toastInfo,
  }[toast.type];

  return (
    <div className={cn(styles.toast, typeClass)}>
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
