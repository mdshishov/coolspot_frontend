import type { ToastItem } from "@/shared/types/toast.types";

import { Toast } from "./Toast";
import styles from "./Toast.module.scss";

type Props = {
  toasts: ToastItem[];
  onClose: (id: string) => void;
};

export function ToastContainer({ toasts, onClose }: Props) {
  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}
