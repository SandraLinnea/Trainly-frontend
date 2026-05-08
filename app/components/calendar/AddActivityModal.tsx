"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import DeleteConfirmModal from "../shared/DeleteConfirmModal";
import editModal from "../shared/EditModal.module.css";
import modalButtons from "../shared/ModalButtons.module.css";

export type CalendarEvent = {
  id: string;
  date: string;
  year: number;
  month: number;
  day: number;
  title: string;
  time: string;
  type: string;
  location: string;
  sharedWithUserId?: string;
  addedByName?: string;
  sharedWithName?: string;
};

export type ActivityFriend = {
  id: string;
  name: string;
};

type AddActivityModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete?: (event: CalendarEvent) => void;
  defaultYear: number;
  defaultMonth: number;
  event?: CalendarEvent | null;
  friends?: ActivityFriend[];
};

type FormState = {
  date: string;
  title: string;
  time: string;
  type: string;
  location: string;
  sharedWithUserId: string;
};

const initialForm: FormState = {
  date: "",
  title: "",
  time: "",
  type: "",
  location: "",
  sharedWithUserId: "",
};

export default function AddActivityModal({
  open,
  onClose,
  onSave,
  onDelete,
  defaultYear,
  defaultMonth,
  event,
  friends = [],
}: AddActivityModalProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
  const isEditing = Boolean(event);

  const defaultDate = `${defaultYear}-${String(defaultMonth + 1).padStart(2, "0")}-01`;

  useEffect(() => {
    if (open) {
      if (event) {
        setForm({
          date: event.date,
          title: event.title,
          time: event.time,
          type: event.type,
          location: event.location,
          sharedWithUserId: "",
        });
        return;
      }

      setForm((current) => ({
        ...initialForm,
        date: current.date || defaultDate,
      }));
      return;
    }

    setForm(initialForm);
    setIsDeleteConfirmOpen(false);
    setIsSaveConfirmOpen(false);
  }, [defaultDate, event, open]);

  if (!open) {
    return null;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const saveActivity = () => {
    const [year, month, day] = form.date.split("-").map(Number);

    onSave({
      id: event?.id ?? "",
      date: form.date,
      year,
      month: month - 1,
      day,
      title: form.title.trim(),
      time: form.time.trim(),
      type: form.type.trim(),
      location: form.location.trim(),
      sharedWithUserId: form.sharedWithUserId,
    });
  };

  const handleSubmit = (submitEvent: FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    if (isEditing) {
      setIsSaveConfirmOpen(true);
      return;
    }

    saveActivity();
  };

  return (
    <>
      <div className={editModal.overlay} onClick={onClose} role="presentation">
      <div
        className={`${editModal.modal} ${editModal.compactModal}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-activity-title"
      >
        <form className={editModal.form} onSubmit={handleSubmit}>
          <div className={editModal.header}>
            <div>
              <h2 id="add-activity-title" className={editModal.title}>
                {isEditing ? "Redigera aktivitet" : "Lägg till aktivitet"}
              </h2>
            </div>

            <button
              className={editModal.closeButton}
              type="button"
              onClick={onClose}
              aria-label="Stang"
            >
              <CloseIcon />
            </button>
          </div>

          <div className={editModal.row}>
            <label className={editModal.field}>
              <span className={editModal.label}>Datum</span>
              <input
                className={editModal.input}
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </label>

            <label className={editModal.field}>
              <span className={editModal.label}>Tid</span>
              <input
                className={editModal.input}
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className={editModal.field}>
            <span className={editModal.label}>Titel</span>
            <input
              className={editModal.input}
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Till exempel Valpkurs"
              required
            />
          </label>

          <div className={editModal.row}>
            <label className={editModal.field}>
              <span className={editModal.label}>Typ</span>
              <input
                className={editModal.input}
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Kurs, Pass, Veterinar..."
                required
              />
            </label>

            <label className={editModal.field}>
              <span className={editModal.label}>Plats</span>
              <input
                className={editModal.input}
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Var aktiviteten sker"
                required
              />
            </label>
          </div>

          {!isEditing && friends.length > 0 ? (
            <label className={editModal.field}>
              <span className={editModal.label}>Dela med vän</span>
              <select
                className={editModal.input}
                name="sharedWithUserId"
                value={form.sharedWithUserId}
                onChange={handleChange}
              >
                <option value="">Dela inte</option>
                {friends.map((friend) => (
                  <option key={friend.id} value={friend.id}>
                    {friend.name}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <div className={modalButtons.actions}>
            <button className={modalButtons.saveButton} type="submit">
              {isEditing ? "Spara ändringar" : "Spara aktivitet"}
            </button>

            {isEditing && event && onDelete ? (
              <button
                className={modalButtons.deleteButton}
                type="button"
                onClick={() => setIsDeleteConfirmOpen(true)}
              >
                Ta bort
              </button>
            ) : null}
          </div>
        </form>
      </div>
      </div>

      <DeleteConfirmModal
        open={isDeleteConfirmOpen}
        message="Är du säker på att du vill ta bort aktiviteten?"
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onConfirm={() => {
          if (event && onDelete) {
            onDelete(event);
          }
        }}
      />

      <DeleteConfirmModal
        open={isSaveConfirmOpen}
        message="Är du säker på att du vill spara ändringarna?"
        variant="save"
        onCancel={() => setIsSaveConfirmOpen(false)}
        onConfirm={saveActivity}
      />
    </>
  );
}
