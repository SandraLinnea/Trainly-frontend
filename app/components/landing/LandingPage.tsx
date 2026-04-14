import Header from "../header/Header";
import Footer from "../footer/Footer";
import AsideNav from "../nav/AsideNav";
import styles from "./LandingHome.module.css";

export default function LandingHome() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />

        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.heroCard}>
                <div className={styles.heroImage} aria-hidden />

                <div className={styles.heroOverlay}>

                  <button className={styles.primaryBtn} type="button">
                    <span className={styles.plus} aria-hidden>
                      +
                    </span>
                    Lägg till pass
                  </button>
                </div>
              </div>

              <div className={styles.textBlock}>
                <h2 className={styles.kicker}>Planera. Träna. Följ upp.</h2>
                <p className={styles.lead}>
                  Logga dina träningspass och följ ditt och din hunds
                  utveckling.
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
