import AsideNav from "../nav/AsideNav";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import styles from "./TrainingInspirationPage.module.css";

const branches = [
  "Lydnad",
  "Bruks",
  "Rallylydnad",
  "IGP",
  "Mondioring",
  "Specialsök",
  "Nosework",
  "Drag",
  "HTM",
  "Freestyle",
];

const tipCategories = ["Rehab", "Valp", "Senior", "Vardag", "Tricks"];

export default function TrainingInspirationPage() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />

        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />
              <div className={styles.panel}>
                <h1 className={styles.title}>Träningsinspiration</h1>
                <p className={styles.lead}>
                  Här kan vi samla övningar, pass och idéer för hundträningen.
                </p>

                <div className={styles.filters}>
                  <label className={styles.field}>
                    <span>Grenar</span>
                    <select className={styles.select} defaultValue="">
                      <option value="" disabled>
                        Välj gren
                      </option>
                      {branches.map((branch) => (
                        <option value={branch} key={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>Tips</span>
                    <select className={styles.select} defaultValue="">
                      <option value="" disabled>
                        Välj typ av tips
                      </option>
                      {tipCategories.map((category) => (
                        <option value={category} key={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
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
