"use client";

import CloseIcon from "../icons/CloseIcon";
import styles from "./DeleteConfirmModal.module.css";

type DeleteConfirmModalProps = {
  open: boolean;
  message: string;
  variant?: "danger" | "save";
  onCancel: () => void;
  onConfirm: () => void;
  onDismiss?: () => void;
};

export default function DeleteConfirmModal({
  open,
  message,
  variant = "danger",
  onCancel,
  onConfirm,
  onDismiss,
}: DeleteConfirmModalProps) {
  if (!open) {
    return null;
  }

  const handleDismiss = onDismiss ?? onCancel;

  return (
    <div className={styles.overlay} onClick={handleDismiss} role="presentation">
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-confirm-title"
      >
        <div className={styles.header}>
          <h2 id="delete-confirm-title" className={styles.title}>
            {message}
          </h2>

          {onDismiss ? (
            <button
              className={styles.closeButton}
              type="button"
              onClick={onDismiss}
              aria-label="Stäng"
            >
              <CloseIcon />
            </button>
          ) : null}
        </div>

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
