import { clsx } from "clsx";
import type { ReactNode } from "react";

import type { ToastItem, ToastType } from "@/shared/types/toast.types";
import styles from "./Toast.module.scss";
import { CloseSmallIcon, SuccessIcon, WarningIcon } from "@/assets/icons";

type Props = {
  toast: ToastItem;
  onClose: (id: string) => void;
};

export function Toast({ toast, onClose }: Props) {
  const icons: Record<ToastType, ReactNode> = {
    success: <SuccessIcon />,
    info: <WarningIcon />,
    error: <WarningIcon />,
  };

  return (
    <div className={clsx(styles.toast, styles[toast.type])}>
      <div className={styles.toastIcon}>{icons[toast.type]}</div>
      <div className={styles.toastText}>{toast.message}</div>
      <button
        type="button"
        className={styles.toastCloseBtn}
        onClick={() => onClose(toast.id)}
      >
        <CloseSmallIcon />
      </button>
    </div>
  );
}
