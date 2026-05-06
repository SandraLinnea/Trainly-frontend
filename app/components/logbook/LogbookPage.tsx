"use client";

import { FormEvent, useEffect, useState } from "react";
import AsideNav from "../nav/AsideNav";
import CloseIcon from "../icons/CloseIcon";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import PenIcon from "../icons/PenIcon";
import DeleteConfirmModal from "../shared/DeleteConfirmModal";
import editModal from "../shared/EditModal.module.css";
import modalButtons from "../shared/ModalButtons.module.css";
import { getApiUrl } from "../../lib/api";
import styles from "./LogbookPage.module.css";

type LogbookEntry = {
  id: string;
  date: string;
  dog: string;
  title: string;
  text: string;
};

type FormState = {
  date: string;
  dog: string;
  otherDog: string;
  title: string;
  text: string;
};

type DogOption = {
  id: string;
  name: string;
};

type DogsResponse = {
  dogs: DogOption[];
};

const todayValue = new Date().toISOString().slice(0, 10);

const initialForm: FormState = {
  date: todayValue,
  dog: "",
  otherDog: "",
  title: "",
  text: "",
};

const initialEntries: LogbookEntry[] = [
  {
    id: "demo-1",
    date: todayValue,
    dog: "Rex",
    title: "Fokuspass med stadga",
    text: "Kort pass med mycket belöning. Vi avslutade när känslan fortfarande var bra.",
  },
];

const PAGE_SIZE = 5;

function getShortDateLabel(value: string) {
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function EntryModal({
  entry,
  open,
  onClose,
  onDelete,
  onSave,
  dogs,
}: {
  entry: LogbookEntry | null;
  open: boolean;
  onClose: () => void;
  onDelete: (entry: LogbookEntry) => void;
  onSave: (entry: LogbookEntry) => void;
  dogs: DogOption[];
}) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
  const isEditing = Boolean(entry);

  useEffect(() => {
    if (!open) {
      setForm(initialForm);
      setIsDeleteConfirmOpen(false);
      setIsSaveConfirmOpen(false);
      return;
    }

    if (entry) {
      setForm({
          date: entry.date,
          dog: dogs.some((dog) => dog.name === entry.dog) ? entry.dog : "other",
          otherDog: dogs.some((dog) => dog.name === entry.dog) ? "" : entry.dog,
          title: entry.title,
        text: entry.text,
      });
      return;
    }

    setForm(initialForm);
  }, [entry, open]);

  if (!open) {
    return null;
  }

  const selectedDog = form.dog === "other" ? form.otherDog : form.dog;

  function saveEntry() {
    onSave({
      id: entry?.id ?? crypto.randomUUID(),
      date: form.date,
      dog: selectedDog.trim(),
      title: form.title.trim(),
      text: form.text.trim(),
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isEditing) {
      setIsSaveConfirmOpen(true);
      return;
    }

    saveEntry();
  }

  return (
    <>
      <div className={editModal.overlay} onClick={onClose} role="presentation">
      <div
        className={editModal.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logbook-modal-title"
      >
        <form className={editModal.form} onSubmit={handleSubmit}>
          <div className={editModal.header}>
            <h2 id="logbook-modal-title" className={editModal.title}>
              {isEditing ? "Redigera inlägg" : "Nytt inlägg"}
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

          <div className={editModal.row}>
            <label className={editModal.field}>
              <span className={editModal.label}>Datum</span>
              <input
                className={editModal.input}
                type="date"
                value={form.date}
                onChange={(event) =>
                  setForm((current) => ({ ...current, date: event.target.value }))
                }
                required
              />
            </label>

            <label className={editModal.field}>
              <span className={editModal.label}>Hund</span>
              <select
                className={editModal.input}
                value={form.dog}
                onChange={(event) =>
                  setForm((current) => ({ ...current, dog: event.target.value }))
                }
                required
              >
                <option value="">Välj hund</option>
                {dogs.map((dog) => (
                  <option value={dog.name} key={dog.id}>
                    {dog.name}
                  </option>
                ))}
                <option value="other">Annan hund</option>
              </select>
            </label>
          </div>

          {form.dog === "other" ? (
            <label className={editModal.field}>
              <span className={editModal.label}>Annan hund</span>
              <input
                className={editModal.input}
                value={form.otherDog}
                onChange={(event) =>
                  setForm((current) => ({ ...current, otherDog: event.target.value }))
                }
                placeholder="Hundens namn"
                required
              />
            </label>
          ) : null}

          <label className={editModal.field}>
            <span className={editModal.label}>Rubrik</span>
            <input
              className={editModal.input}
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              placeholder="Vad tränade ni?"
              required
            />
          </label>

          <label className={editModal.field}>
            <span className={editModal.label}>Anteckning</span>
            <textarea
              className={editModal.textarea}
              value={form.text}
              onChange={(event) =>
                setForm((current) => ({ ...current, text: event.target.value }))
              }
              placeholder="Skriv hur passet gick..."
              rows={7}
              required
            />
          </label>

          <div className={modalButtons.actions}>
            <button className={modalButtons.saveButton} type="submit">
              {isEditing ? "Spara ändringar" : "Spara inlägg"}
            </button>

            {entry ? (
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
        message="Är du säker på att du vill ta bort inlägget?"
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onConfirm={() => {
          if (entry) {
            onDelete(entry);
          }
        }}
      />

      <DeleteConfirmModal
        open={isSaveConfirmOpen}
        message="Är du säker på att du vill spara ändringarna?"
        variant="save"
        onCancel={() => setIsSaveConfirmOpen(false)}
        onConfirm={saveEntry}
      />
    </>
  );
}

export default function LogbookPage() {
  const [entries, setEntries] = useState<LogbookEntry[]>(initialEntries);
  const [dogs, setDogs] = useState<DogOption[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<LogbookEntry | null>(null);
  const [dogFilter, setDogFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [page, setPage] = useState(1);
  const [expandedEntryIds, setExpandedEntryIds] = useState<string[]>([]);
  const filterDogs = Array.from(
    new Set([...dogs.map((dog) => dog.name), ...entries.map((entry) => entry.dog)]),
  ).filter(Boolean);
  const visibleEntries = entries
    .filter((entry) => dogFilter === "all" || entry.dog === dogFilter)
    .sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();

      return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
    });
  const totalPages = Math.max(1, Math.ceil(visibleEntries.length / PAGE_SIZE));
  const paginatedEntries = visibleEntries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    let active = true;

    async function loadDogs() {
      try {
        const response = await fetch(getApiUrl("/api/dogs"), {
          credentials: "include",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as DogsResponse;

        if (active) {
          setDogs(data.dogs.map((dog) => ({ id: dog.id, name: dog.name })));
        }
      } catch {
        if (active) {
          setDogs([]);
        }
      }
    }

    void loadDogs();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [dogFilter, sortOrder]);

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  function openNewEntry() {
    setSelectedEntry(null);
    setIsModalOpen(true);
  }

  function openEntry(entry: LogbookEntry) {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  }

  function toggleEntry(entryId: string) {
    setExpandedEntryIds((current) =>
      current.includes(entryId)
        ? current.filter((id) => id !== entryId)
        : [...current, entryId],
    );
  }

  function handleSave(entry: LogbookEntry) {
    setEntries((current) => {
      const exists = current.some((item) => item.id === entry.id);

      if (exists) {
        return current.map((item) => (item.id === entry.id ? entry : item));
      }

      return [entry, ...current];
    });

    setIsModalOpen(false);
    setSelectedEntry(null);
  }

  function handleDelete(entry: LogbookEntry) {
    setEntries((current) => current.filter((item) => item.id !== entry.id));
    setIsModalOpen(false);
    setSelectedEntry(null);
  }

  function resetFilters() {
    setDogFilter("all");
    setSortOrder("newest");
    setPage(1);
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />

        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />

              <div className={styles.overview}>
                <div>
                  <h1 className={styles.title}>Dagbok</h1>
                  <p className={styles.lead}>
                    Överblicka passen, öppna ett inlägg och ändra när du vill.
                  </p>
                </div>
              </div>

              <div className={styles.filterBar}>
                <label className={styles.filterField}>
                  <span>Filtrera på hund:</span>
                  <select value={dogFilter} onChange={(event) => setDogFilter(event.target.value)}>
                    <option value="all">Alla hundar</option>
                    {filterDogs.map((dog) => (
                      <option value={dog} key={dog}>
                        {dog}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={styles.filterField}>
                  <span>Sortera:</span>
                  <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                    <option value="newest">Datum: Nyaste</option>
                    <option value="oldest">Datum: Äldsta</option>
                  </select>
                </label>

                <button
                  className={styles.clearButton}
                  type="button"
                  onClick={resetFilters}
                >
                  Rensa filter
                </button>
              </div>

              <div className={styles.entries}>
                {paginatedEntries.length > 0 ? (
                  paginatedEntries.map((entry) => (
                    <article
                      className={`${styles.entry} ${
                        expandedEntryIds.includes(entry.id) ? styles.expandedEntry : ""
                      }`}
                      key={entry.id}
                    >
                      <div>
                        <h2 className={styles.entryTitle}>{entry.title}</h2>
                        <p className={styles.entryMeta}>
                          {getShortDateLabel(entry.date)} · {entry.dog}
                        </p>
                      </div>
                      <p className={styles.entryText}>{entry.text}</p>
                      <button
                        className={styles.editButton}
                        type="button"
                        onClick={() => openEntry(entry)}
                        aria-label="Redigera inlägg"
                      >
                        <PenIcon />
                      </button>
                      <button
                        className={styles.entryArrow}
                        type="button"
                        onClick={() => toggleEntry(entry.id)}
                        aria-label={
                          expandedEntryIds.includes(entry.id)
                            ? "Fäll ihop inlägg"
                            : "Expandera inlägg"
                        }
                      >
                        <span aria-hidden />
                      </button>
                    </article>
                  ))
                ) : (
                  <p className={styles.empty}>Du har inte skrivit några dagboksinlägg än.</p>
                )}
              </div>

              {visibleEntries.length > PAGE_SIZE ? (
                <div className={styles.pagination}>
                  <p>
                    Visar {(page - 1) * PAGE_SIZE + 1}-
                    {Math.min(page * PAGE_SIZE, visibleEntries.length)} av{" "}
                    {visibleEntries.length} inlägg
                  </p>
                  <div className={styles.pageActions}>
                    <button
                      type="button"
                      onClick={() => setPage((current) => Math.max(1, current - 1))}
                      disabled={page === 1}
                    >
                      Föregående
                    </button>
                    <button
                      type="button"
                      onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                      disabled={page === totalPages}
                    >
                      Nästa
                    </button>
                  </div>
                </div>
              ) : null}

              <div className={styles.actionsRow}>
                <button className={styles.addButton} type="button" onClick={openNewEntry}>
                  Lägg till inlägg
                </button>
              </div>
            </section>

            <aside className={styles.aside}>
              <AsideNav />
            </aside>
          </div>
        </main>

        <Footer />
      </div>

      <EntryModal
        entry={selectedEntry}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDelete}
        onSave={handleSave}
        dogs={dogs}
      />
    </div>
  );
}

