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
            {/* Vänster innehåll */}
            <section className={styles.content}>
              <div className={styles.heroCard}>
                <div className={styles.heroImage} aria-hidden>
                  {/* Bilden som i mocken: byt till riktig fil sen */}
                  {/* Lägg gärna en fil i /public t.ex. /landing-dog.jpg */}
                </div>

                <div className={styles.heroOverlay}>
                  <h1 className={styles.heroTitle}>Välkommen tillbaka.</h1>

                  <button className={styles.primaryBtn} type="button">
                    <span className={styles.plus} aria-hidden>
                      +
                    </span>
                    Lägg till pass
                  </button>
                </div>
              </div>

              <div className={styles.textBlock}>
                <h2 className={styles.kicker}>Plan. Träna. Följ.</h2>
                <p className={styles.lead}>
                  Logga dina träningspassen för följ ditt och din hunds
                  utveckling.
                </p>
              </div>
            </section>

            {/* Höger aside */}
            <aside className={styles.aside}>
              <AsideNav />
              <div className={styles.asideFiller} aria-hidden />
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
