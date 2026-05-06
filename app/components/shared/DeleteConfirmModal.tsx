"use client";

import styles from "./DeleteConfirmModal.module.css";

type DeleteConfirmModalProps = {
  open: boolean;
  message: string;
  variant?: "danger" | "save";
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmModal({
  open,
  message,
  variant = "danger",
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onCancel} role="presentation">
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-confirm-title"
      >
        <h2 id="delete-confirm-title" className={styles.title}>
          {message}
        </h2>

        <div className={styles.actions}>
          <button className={styles.noButton} type="button" onClick={onCancel}>
            Nej
          </button>
          <button
            className={`${styles.yesButton} ${
              variant === "save" ? styles.saveButton : ""
            }`}
            type="button"
            onClick={onConfirm}
          >
            Ja
          </button>
        </div>
      </div>
    </div>
  );
}
