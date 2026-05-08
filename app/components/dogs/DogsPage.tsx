"use client";

import { useEffect, useState } from "react";
import AsideNav from "../nav/AsideNav";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { getApiUrl, readApiError } from "../../lib/api";
import AddDogModal, { NewDogFormData } from "./AddDogModal";
import DogDetailsModal, { DogCard, getDogAgeLabel } from "./DogDetailsModal";
import styles from "./DogsPage.module.css";

type DogsResponse = {
  dogs: DogCard[];
};

type DogResponse = {
  dog: DogCard;
};

export default function DogsPage() {
  const [dogs, setDogs] = useState<DogCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState<DogCard | null>(null);
  const [editingDog, setEditingDog] = useState<DogCard | null>(null);

  useEffect(() => {
    let active = true;

    async function loadDogs() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(getApiUrl("/api/dogs"), {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(await readApiError(response, "Kunde inte hämta hundar."));
        }

        const data = (await response.json()) as DogsResponse;

        if (active) {
          setDogs(data.dogs);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Kunde inte hämta hundar.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadDogs();

    return () => {
      active = false;
    };
  }, []);

  const handleAddDog = async (dog: NewDogFormData) => {
    if (saving) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch(
        getApiUrl(editingDog ? `/api/dogs/${editingDog.id}` : "/api/dogs"),
        {
          method: editingDog ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(dog),
        },
      );

      if (!response.ok) {
        throw new Error(await readApiError(response, "Kunde inte spara hund."));
      }

      const data = (await response.json()) as DogResponse;

      if (editingDog) {
        setDogs((current) =>
          current.map((entry) => (entry.id === editingDog.id ? data.dog : entry)),
        );
        setSelectedDog(data.dog);
      } else {
        setDogs((current) => [...current, data.dog]);
      }

      setEditingDog(null);
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunde inte spara hund.");
    } finally {
      setSaving(false);
    }
  };

  const handleCloseAddModal = () => {
    setEditingDog(null);
    setIsModalOpen(false);
  };

  const handleEditDog = (dog: DogCard) => {
    setSelectedDog(null);
    setEditingDog(dog);
    setIsModalOpen(true);
  };

  const handleDeleteDog = async () => {
    if (!editingDog || saving) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch(getApiUrl(`/api/dogs/${editingDog.id}`), {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await readApiError(response, "Kunde inte ta bort hund."));
      }

      setDogs((current) => current.filter((dog) => dog.id !== editingDog.id));
      setSelectedDog(null);
      setEditingDog(null);
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunde inte ta bort hund.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />

        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />

              {error ? <p className={styles.status}>{error}</p> : null}
              {loading ? <p className={styles.status}>Hämtar hundar...</p> : null}

              {!loading && dogs.length === 0 ? (
                <p className={styles.status}>
                  Du har inte lagt till någon hund än.
                </p>
              ) : null}

              <div className={styles.grid}>
                {dogs.map((dog) => (
                  <button
                    key={dog.id}
                    className={styles.card}
                    type="button"
                    onClick={() => setSelectedDog(dog)}
                  >
                    <div
                      className={styles.cardImage}
                      style={
                        dog.imageSrc
                          ? {
                              backgroundImage: `url("${dog.imageSrc}")`,
                              backgroundPosition: dog.imagePosition,
                            }
                          : undefined
                      }
                      aria-hidden
                    />

                    <div className={styles.cardBody}>
                      <div>
                        <h2 className={styles.cardTitle}>{dog.name}</h2>
                        <p className={styles.cardMeta}>{dog.breed}</p>
                      </div>
                      <span className={styles.cardAge}>{getDogAgeLabel(dog.birthDate)}</span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                className={styles.addButton}
                type="button"
                onClick={() => setIsModalOpen(true)}
              >
                Lägg till hund
              </button>
            </section>

            <aside className={styles.aside}>
              <AsideNav />
            </aside>
          </div>
        </main>

        <Footer />
      </div>

      <AddDogModal
        open={isModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleAddDog}
        onDelete={handleDeleteDog}
        initialData={editingDog}
      />

      <DogDetailsModal
        dog={selectedDog}
        onClose={() => setSelectedDog(null)}
        onEdit={handleEditDog}
      />
    </div>
  );
}
