import AsideNav from "../../nav/AsideNav";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import styles from "./WorkingDog.module.css";

export default function WorkingDog() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />
        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />
              <div className={styles.panel}>
                <h1 className={styles.title}>Brukshund</h1>
                <p className={styles.lead}>
                  Här kommer information om brukshundar att visas.
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
