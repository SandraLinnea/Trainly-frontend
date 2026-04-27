"use client";

import { useState } from "react";
import AsideNav from "../nav/AsideNav";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import AddDogModal, { NewDogFormData } from "./AddDogModal";
import DogDetailsModal, { DogCard, getDogAgeLabel } from "./DogDetailsModal";
import styles from "./DogsPage.module.css";

const initialDogs: DogCard[] = [
  {
    id: "perry",
    name: "Perry",
    breed: "Beagle",
    birthDate: "2022-04-27",
    height: "41",
    weight: "14",
    registrationNumber: "SE12345/2022",
    imageSrc: "/images/Playingdog.jpg",
    imagePosition: "center 38%",
  },
  {
    id: "bella",
    name: "Bella",
    breed: "Border Collie",
    birthDate: "2024-04-27",
    height: "53",
    weight: "18",
    registrationNumber: "SE54321/2024",
    imageSrc: "/images/Playingdog.jpg",
    imagePosition: "center 45%",
  },
];

export default function DogsPage() {
  const [dogs, setDogs] = useState(initialDogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState<DogCard | null>(null);
  const [editingDog, setEditingDog] = useState<DogCard | null>(null);

  const handleAddDog = (dog: NewDogFormData) => {
    if (editingDog) {
      const updatedDog: DogCard = {
        ...editingDog,
        name: dog.name,
        breed: dog.breed,
        birthDate: dog.birthDate,
        height: dog.height,
        weight: dog.weight,
        registrationNumber: dog.registrationNumber,
        imageSrc: dog.imageSrc,
      };

      setDogs((current) =>
        current.map((entry) => (entry.id === editingDog.id ? updatedDog : entry)),
      );
      setSelectedDog(updatedDog);
      setEditingDog(null);
      setIsModalOpen(false);
      return;
    }

    setDogs((current) => {
      const newDog: DogCard = {
        id: crypto.randomUUID(),
        name: dog.name,
        breed: dog.breed,
        birthDate: dog.birthDate,
        height: dog.height,
        weight: dog.weight,
        registrationNumber: dog.registrationNumber,
        imageSrc: dog.imageSrc,
        imagePosition: "center center",
      };

      return [...current, newDog];
    });

    setIsModalOpen(false);
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

  const handleDeleteDog = () => {
    if (!editingDog) {
      return;
    }

    setDogs((current) => current.filter((dog) => dog.id !== editingDog.id));
    setSelectedDog(null);
    setEditingDog(null);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />

        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />

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
                      style={{
                        backgroundImage: `url("${dog.imageSrc}")`,
                        backgroundPosition: dog.imagePosition,
                      }}
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
