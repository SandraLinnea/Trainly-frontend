"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./AddDogModal.module.css";
import { DogCard } from "./DogDetailsModal";
import CloseIcon from "../icons/CloseIcon";

export type NewDogFormData = {
  name: string;
  breed: string;
  age: string;
  height: string;
  weight: string;
  registrationNumber: string;
  imageSrc: string;
};

type AddDogModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (dog: NewDogFormData) => void;
  initialData?: DogCard | null;
};

const initialForm = {
  name: "",
  breed: "",
  age: "",
  height: "",
  weight: "",
  registrationNumber: "",
};

export default function AddDogModal({
  open,
  onClose,
  onSave,
  initialData = null,
}: AddDogModalProps) {
  const [form, setForm] = useState(initialForm);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (open) {
      setForm(
        initialData
          ? {
              name: initialData.name,
              breed: initialData.breed,
              age: initialData.age,
              height: initialData.height,
              weight: initialData.weight,
              registrationNumber: initialData.registrationNumber,
            }
          : initialForm,
      );
      setPreviewUrl(initialData?.imageSrc ?? "");
      return;
    }

    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setForm(initialForm);
    setPreviewUrl("");
  }, [initialData, open, previewUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!open) {
    return null;
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setPreviewUrl((current) => {
      if (current.startsWith("blob:")) {
        URL.revokeObjectURL(current);
      }

      return URL.createObjectURL(file);
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSave({
      name: form.name.trim(),
      breed: form.breed.trim(),
      age: form.age.trim() || "-",
      height: form.height.trim(),
      weight: form.weight.trim(),
      registrationNumber: form.registrationNumber.trim(),
      imageSrc: previewUrl || "/images/Playingdog.jpg",
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-dog-modal-title"
      >
        <form
          className={`${styles.form} ${initialData ? styles.editForm : ""}`.trim()}
          onSubmit={handleSubmit}
        >
          <div className={styles.header}>
            <h2 id="add-dog-modal-title" className={styles.title}>
              {initialData ? "Redigera hund" : "Lägg till hund"}
            </h2>

            <button
              className={styles.closeButton}
              type="button"
              onClick={onClose}
              aria-label="Stäng"
            >
              <CloseIcon />
            </button>
          </div>

          {initialData ? (
            <div className={styles.editLayout}>
              <div className={styles.editMedia}>
                {previewUrl ? (
                  <div className={styles.previewWrap}>
                    <img
                      className={`${styles.preview} ${styles.editPreview}`}
                      src={previewUrl}
                      alt="Forhandsvisning av hundbild"
                    />
                  </div>
                ) : null}

                <label className={styles.field}>
                  <span className={styles.label}>Bild</span>
                  <input
                    className={styles.fileInput}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <div className={styles.editFields}>
                <label className={styles.field}>
                  <span className={styles.label}>Namn</span>
                  <input
                    className={styles.input}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Ras</span>
                  <input
                    className={styles.input}
                    name="breed"
                    value={form.breed}
                    onChange={handleChange}
                    required
                  />
                </label>

                <div className={styles.row}>
                  <label className={styles.field}>
                    <span className={styles.label}>Ålder</span>
                    <input
                      className={styles.input}
                      name="age"
                      value={form.age}
                      onChange={handleChange}
                      placeholder="Ange ålder"
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Regnr</span>
                    <input
                      className={styles.input}
                      name="registrationNumber"
                      value={form.registrationNumber}
                      onChange={handleChange}
                      placeholder="Regnr"
                    />
                  </label>
                </div>

                <div className={styles.row}>
                  <label className={styles.field}>
                    <span className={styles.label}>Mankhöjd</span>
                    <div className={styles.unitField}>
                      <input
                        className={styles.input}
                        name="height"
                        value={form.height}
                        onChange={handleChange}
                        placeholder="Ange höjd"
                      />
                      <span className={styles.unit}>cm</span>
                    </div>
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Vikt</span>
                    <div className={styles.unitField}>
                      <input
                        className={styles.input}
                        name="weight"
                        value={form.weight}
                        onChange={handleChange}
                        placeholder="Ange vikt"
                      />
                      <span className={styles.unit}>kg</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <>
              <label className={styles.field}>
                <span className={styles.label}>Namn</span>
                <input
                  className={styles.input}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Ras</span>
                <input
                  className={styles.input}
                  name="breed"
                  value={form.breed}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className={styles.row}>
                <label className={styles.field}>
                  <span className={styles.label}>ålder</span>
                  <input
                    className={styles.input}
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Ange ålder"
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Regnr</span>
                  <input
                    className={styles.input}
                    name="registrationNumber"
                    value={form.registrationNumber}
                    onChange={handleChange}
                    placeholder="Regnr"
                  />
                </label>
              </div>

              <div className={styles.row}>
                <label className={styles.field}>
                  <span className={styles.label}>Mankhojd</span>
                  <div className={styles.unitField}>
                    <input
                      className={styles.input}
                      name="height"
                      value={form.height}
                      onChange={handleChange}
                      placeholder="Ange höjd"
                    />
                    <span className={styles.unit}>cm</span>
                  </div>
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Vikt</span>
                  <div className={styles.unitField}>
                    <input
                      className={styles.input}
                      name="weight"
                      value={form.weight}
                      onChange={handleChange}
                      placeholder="Ange vikt"
                    />
                    <span className={styles.unit}>kg</span>
                  </div>
                </label>
              </div>

              <label className={styles.field}>
                <span className={styles.label}>Bild</span>
                <input
                  className={styles.fileInput}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              {previewUrl ? (
                <div className={styles.previewWrap}>
                  <img className={styles.preview} src={previewUrl} alt="Forhandsvisning av hundbild" />
                </div>
              ) : null}
            </>
          )}

          <div className={styles.actions}>
            <button className={styles.saveButton} type="submit">
              {initialData ? "Spara andringar" : "Spara hund"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
