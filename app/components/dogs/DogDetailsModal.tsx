"use client";

import styles from "./DogDetailsModal.module.css";
import CloseIcon from "../icons/CloseIcon";

export type DogCard = {
  id: string;
  name: string;
  breed: string;
  age: string;
  height: string;
  weight: string;
  registrationNumber: string;
  imageSrc: string;
  imagePosition: string;
};

type DogDetailsModalProps = {
  dog: DogCard | null;
  onClose: () => void;
  onEdit: (dog: DogCard) => void;
};

export default function DogDetailsModal({
  dog,
  onClose,
  onEdit,
}: DogDetailsModalProps) {
  if (!dog) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dog-details-title"
      >
        <div className={styles.card}>
          <div className={styles.imageWrap}>
            <img className={styles.image} src={dog.imageSrc} alt={dog.name} />
          </div>

          <div className={styles.content}>
            <div className={styles.header}>
              <div>
                <h2 id="dog-details-title" className={styles.title}>
                  {dog.name}
                </h2>
                <p className={styles.subtitle}>
                  {dog.breed || "-"} {dog.age ? `${dog.age} ar` : ""}
                </p>
              </div>

              <button
                className={styles.closeButton}
                type="button"
                onClick={onClose}
                aria-label="Stäng"
              >
                <CloseIcon />
              </button>
            </div>

            <dl className={styles.details}>
              <div className={styles.detailRow}>
                <dt className={styles.label}>Höjd:</dt>
                <dd className={styles.value}>{dog.height ? `${dog.height} cm` : "-"}</dd>
              </div>

              <div className={styles.detailRow}>
                <dt className={styles.label}>Vikt:</dt>
                <dd className={styles.value}>{dog.weight ? `${dog.weight} kg` : "-"}</dd>
              </div>

              <div className={styles.detailRow}>
                <dt className={styles.label}>Regnr:</dt>
                <dd className={styles.value}>{dog.registrationNumber || "-"}</dd>
              </div>
            </dl>

            <div className={styles.actions}>
              <button className={styles.editButton} type="button" onClick={() => onEdit(dog)}>
                Redigera
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
