import AsideNav from "../../nav/AsideNav";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import styles from "./SvWorkingDog.module.css";

export default function SvWorkingDog() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />
        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />
              <div className={styles.panel}>
                <h1 className={styles.title}>Svenska Brukshundsklubben</h1>
                <p className={styles.lead}>
                  Här kommer information om Svenska Brukshundsklubben att visas.
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
