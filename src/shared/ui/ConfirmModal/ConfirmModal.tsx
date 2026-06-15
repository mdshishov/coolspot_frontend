import { Overlay } from "@/shared/ui/Overlay/Overlay";
import styles from "./ConfirmModal.module.scss";
import { Button } from "../Button/Button";

export type ConfirmModalProps = {
  title: string;
  text?: string;
  confirmText: string;
  rejectText?: string;
  onConfirm: () => void;
  onReject?: () => void;
};

export function ConfirmModal({
  title,
  text,
  confirmText = "Ок",
  rejectText = "Отмена",
  onConfirm,
  onReject,
}: ConfirmModalProps) {
  return (
    <Overlay onClose={onReject ? onReject : onConfirm}>
      <div className={styles.content}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          {text && <p className={styles.text}>{text}</p>}
        </div>
        <div className={styles.controls}>
          <Button
            variant="primary"
            text={confirmText}
            onClick={onConfirm}
          ></Button>

          {onReject && (
            <Button
              variant="border"
              text={rejectText}
              onClick={onReject}
            ></Button>
          )}
        </div>
      </div>
    </Overlay>
  );
}
