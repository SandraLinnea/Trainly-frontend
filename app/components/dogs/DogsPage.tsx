import AsideNav from "../nav/AsideNav";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import styles from "./DogsPage.module.css";

const dogs = [
  {
    name: "Perry",
    breed: "Beagle",
    age: "4 ar",
    imagePosition: "center 38%",
  },
  {
    name: "Bella",
    breed: "Border Collie",
    age: "2 ar",
    imagePosition: "center 45%",
  },
];

export default function DogsPage() {
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
                  <article key={dog.name} className={styles.card}>
                    <div
                      className={styles.cardImage}
                      style={{ backgroundPosition: dog.imagePosition }}
                      aria-hidden
                    />

                    <div className={styles.cardBody}>
                      <div>
                        <h2 className={styles.cardTitle}>{dog.name}</h2>
                        <p className={styles.cardMeta}>{dog.breed}</p>
                      </div>
                      <span className={styles.cardAge}>{dog.age}</span>
                    </div>
                  </article>
                ))}
              </div>

              <button className={styles.addButton} type="button">
                <span className={styles.plus} aria-hidden>
                  +
                </span>
                Lagg till hund
              </button>
            </section>

            <aside className={styles.aside}>
              <AsideNav />
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
