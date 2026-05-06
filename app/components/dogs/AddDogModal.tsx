"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DogCard } from "./DogDetailsModal";
import CloseIcon from "../icons/CloseIcon";
import DeleteConfirmModal from "../shared/DeleteConfirmModal";
import editModal from "../shared/EditModal.module.css";
import modalButtons from "../shared/ModalButtons.module.css";

export type NewDogFormData = {
  name: string;
  breed: string;
  birthDate: string;
  height: string;
  weight: string;
  registrationNumber: string;
  imageSrc: string;
};

type AddDogModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (dog: NewDogFormData) => void;
  onDelete?: () => void;
  initialData?: DogCard | null;
};

const initialForm = {
  name: "",
  breed: "",
  birthDate: "",
  height: "",
  weight: "",
  registrationNumber: "",
};

export default function AddDogModal({
  open,
  onClose,
  onSave,
  onDelete,
  initialData = null,
}: AddDogModalProps) {
  const [form, setForm] = useState(initialForm);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (open) {
      setForm(
        initialData
          ? {
              name: initialData.name,
              breed: initialData.breed,
              birthDate: initialData.birthDate,
              height: initialData.height,
              weight: initialData.weight,
              registrationNumber: initialData.registrationNumber,
            }
          : initialForm,
      );
      setPreviewUrl(initialData?.imageSrc ?? "");
      return;
    }

    setForm(initialForm);
    setPreviewUrl("");
    setIsDeleteConfirmOpen(false);
    setIsSaveConfirmOpen(false);
  }, [initialData, open]);

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

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviewUrl(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const saveDog = () => {
    const birthDate = form.birthDate > todayDate ? todayDate : form.birthDate;

    onSave({
      name: form.name.trim(),
      breed: form.breed.trim(),
      birthDate,
      height: form.height.trim(),
      weight: form.weight.trim(),
      registrationNumber: form.registrationNumber.trim(),
      imageSrc: previewUrl || "/images/Playingdog.jpg",
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (initialData) {
      setIsSaveConfirmOpen(true);
      return;
    }

    saveDog();
  };

  return (
    <>
      <div className={editModal.overlay} onClick={onClose} role="presentation">
      <div
        className={`${editModal.modal} ${editModal.largeModal} ${editModal.scrollModal}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-dog-modal-title"
      >
        <form
          className={`${editModal.form} ${editModal.largeForm} ${
            initialData ? editModal.editForm : ""
          }`.trim()}
          onSubmit={handleSubmit}
        >
          <div className={editModal.header}>
            <h2
              id="add-dog-modal-title"
              className={`${editModal.title} ${editModal.largeTitle}`}
            >
              {initialData ? "Redigera hund" : "Lägg till hund"}
            </h2>

            <button
              className={editModal.closeButton}
              type="button"
              onClick={onClose}
              aria-label="Stäng"
            >
              <CloseIcon />
            </button>
          </div>

          {initialData ? (
            <div className={editModal.editLayout}>
              <div className={editModal.editMedia}>
                {previewUrl ? (
                  <div className={editModal.previewWrap}>
                    <img
                      className={`${editModal.preview} ${editModal.editPreview}`}
                      src={previewUrl}
                      alt="Forhandsvisning av hundbild"
                    />
                  </div>
                ) : null}

                <label className={editModal.field}>
                  <span className={editModal.label}>Bild</span>
                  <input
                    className={editModal.fileInput}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <div className={editModal.editFields}>
                <label className={editModal.field}>
                  <span className={editModal.label}>Namn</span>
                  <input
                    className={editModal.input}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className={editModal.field}>
                  <span className={editModal.label}>Ras</span>
                  <input
                    className={editModal.input}
                    name="breed"
                    value={form.breed}
                    onChange={handleChange}
                    required
                  />
                </label>

                <div className={`${editModal.row} ${editModal.wideRow}`}>
                  <label className={editModal.field}>
                    <span className={editModal.label}>Födelsedatum</span>
                    <input
                      className={editModal.input}
                      type="date"
                      name="birthDate"
                      value={form.birthDate}
                      max={todayDate}
                      onChange={handleChange}
                    />
                  </label>

                  <label className={editModal.field}>
                    <span className={editModal.label}>Regnr</span>
                    <input
                      className={editModal.input}
                      name="registrationNumber"
                      value={form.registrationNumber}
                      onChange={handleChange}
                      placeholder="Regnr"
                    />
                  </label>
                </div>

                <div className={`${editModal.row} ${editModal.wideRow}`}>
                  <label className={editModal.field}>
                    <span className={editModal.label}>Mankhöjd</span>
                    <div className={editModal.unitField}>
                      <input
                        className={editModal.input}
                        name="height"
                        value={form.height}
                        onChange={handleChange}
                        placeholder="Ange höjd"
                      />
                      <span className={editModal.unit}>cm</span>
                    </div>
                  </label>

                  <label className={editModal.field}>
                    <span className={editModal.label}>Vikt</span>
                    <div className={editModal.unitField}>
                      <input
                        className={editModal.input}
                        name="weight"
                        value={form.weight}
                        onChange={handleChange}
                        placeholder="Ange vikt"
                      />
                      <span className={editModal.unit}>kg</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <>
              <label className={editModal.field}>
                <span className={editModal.label}>Namn</span>
                <input
                  className={editModal.input}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className={editModal.field}>
                <span className={editModal.label}>Ras</span>
                <input
                  className={editModal.input}
                  name="breed"
                  value={form.breed}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className={`${editModal.row} ${editModal.wideRow}`}>
                <label className={editModal.field}>
                  <span className={editModal.label}>Födelsedatum</span>
                  <input
                    className={editModal.input}
                    type="date"
                    name="birthDate"
                    value={form.birthDate}
                    max={todayDate}
                    onChange={handleChange}
                  />
                </label>

                <label className={editModal.field}>
                  <span className={editModal.label}>Regnr</span>
                  <input
                    className={editModal.input}
                    name="registrationNumber"
                    value={form.registrationNumber}
                    onChange={handleChange}
                    placeholder="Regnr"
                  />
                </label>
              </div>

              <div className={`${editModal.row} ${editModal.wideRow}`}>
                <label className={editModal.field}>
                  <span className={editModal.label}>Mankhojd</span>
                  <div className={editModal.unitField}>
                    <input
                      className={editModal.input}
                      name="height"
                      value={form.height}
                      onChange={handleChange}
                      placeholder="Ange höjd"
                    />
                    <span className={editModal.unit}>cm</span>
                  </div>
                </label>

                <label className={editModal.field}>
                  <span className={editModal.label}>Vikt</span>
                  <div className={editModal.unitField}>
                    <input
                      className={editModal.input}
                      name="weight"
                      value={form.weight}
                      onChange={handleChange}
                      placeholder="Ange vikt"
                    />
                    <span className={editModal.unit}>kg</span>
                  </div>
                </label>
              </div>

              <label className={editModal.field}>
                <span className={editModal.label}>Bild</span>
                <input
                  className={editModal.fileInput}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              {previewUrl ? (
                <div className={editModal.previewWrap}>
                  <img className={editModal.preview} src={previewUrl} alt="Forhandsvisning av hundbild" />
                </div>
              ) : null}
            </>
          )}

          <div className={modalButtons.actions}>
            {initialData && onDelete ? (
              <button
                className={modalButtons.deleteButton}
                type="button"
                onClick={() => setIsDeleteConfirmOpen(true)}
              >
                Ta bort hund
              </button>
            ) : null}

            <button className={modalButtons.saveButton} type="submit">
              {initialData ? "Spara andringar" : "Spara hund"}
            </button>
          </div>
        </form>
      </div>
      </div>

      <DeleteConfirmModal
        open={isDeleteConfirmOpen}
        message="Är du säker på att du vill ta bort hunden?"
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onConfirm={() => {
          if (onDelete) {
            onDelete();
          }
        }}
      />

      <DeleteConfirmModal
        open={isSaveConfirmOpen}
        message="Är du säker på att du vill spara ändringarna?"
        variant="save"
        onCancel={() => setIsSaveConfirmOpen(false)}
        onConfirm={saveDog}
      />
    </>
  );
}
