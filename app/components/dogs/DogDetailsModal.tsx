"use client";

import styles from "./DogDetailsModal.module.css";
import CloseIcon from "../icons/CloseIcon";

export type DogCard = {
  id: string;
  name: string;
  breed: string;
  birthDate: string;
  height: string;
  weight: string;
  registrationNumber: string;
  imageSrc: string;
  imagePosition: string;
};

export function getDogAgeLabel(birthDate: string) {
  if (!birthDate) {
    return "-";
  }

  const birth = new Date(birthDate);

  if (Number.isNaN(birth.getTime())) {
    return "-";
  }

  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (today.getDate() < birth.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years > 0) {
    return years === 1 ? "1 år" : `${years} år`;
  }

  return months === 1 ? "1 månad" : `${Math.max(months, 0)} månader`;
}

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
                  {dog.breed || "-"} {getDogAgeLabel(dog.birthDate)}
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
                <dt className={styles.label}>Född:</dt>
                <dd className={styles.value}>{dog.birthDate || "-"}</dd>
              </div>

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
