"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./AddActivityModal.module.css";
import CloseIcon from "../icons/CloseIcon";

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
};

type AddActivityModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete?: (event: CalendarEvent) => void;
  defaultYear: number;
  defaultMonth: number;
  event?: CalendarEvent | null;
};

type FormState = {
  date: string;
  title: string;
  time: string;
  type: string;
  location: string;
};

const initialForm: FormState = {
  date: "",
  title: "",
  time: "",
  type: "",
  location: "",
};

export default function AddActivityModal({
  open,
  onClose,
  onSave,
  onDelete,
  defaultYear,
  defaultMonth,
  event,
}: AddActivityModalProps) {
  const [form, setForm] = useState<FormState>(initialForm);
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
  }, [defaultDate, event, open]);

  if (!open) {
    return null;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (submitEvent: FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

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
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-activity-title"
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <div>
              <h2 id="add-activity-title" className={styles.title}>
                {isEditing ? "Redigera aktivitet" : "Lägg till aktivitet"}
              </h2>
            </div>

            <button
              className={styles.closeButton}
              type="button"
              onClick={onClose}
              aria-label="Stang"
            >
              <CloseIcon />
            </button>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Datum</span>
              <input
                className={styles.input}
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Tid</span>
              <input
                className={styles.input}
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className={styles.field}>
            <span className={styles.label}>Titel</span>
            <input
              className={styles.input}
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Till exempel Valpkurs"
              required
            />
          </label>

          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Typ</span>
              <input
                className={styles.input}
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Kurs, Pass, Veterinar..."
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Plats</span>
              <input
                className={styles.input}
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Var aktiviteten sker"
                required
              />
            </label>
          </div>

          <div className={styles.actions}>
            <button className={styles.saveButton} type="submit">
              {isEditing ? "Spara ändringar" : "Spara aktivitet"}
            </button>

            {isEditing && event && onDelete ? (
              <button
                className={styles.deleteButton}
                type="button"
                onClick={() => onDelete(event)}
              >
                Ta bort
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
