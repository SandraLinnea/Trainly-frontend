import AsideNav from "../nav/AsideNav";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import styles from "./TrainingInspirationPage.module.css";

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
