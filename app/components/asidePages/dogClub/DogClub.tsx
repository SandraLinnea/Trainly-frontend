import AsideNav from "../../nav/AsideNav";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import styles from "./DogClub.module.css";

export function DogClubContent() {
  return (
    <div className={styles.panel}>
      <h1 className={styles.title}>Brukshundsklubbar</h1>
      <p className={styles.lead}>Här kommer brukshundsklubbar att visas.</p>
    </div>
  );
}

export default function DogClub() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />
        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />
              <DogClubContent />
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
