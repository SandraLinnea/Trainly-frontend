import AsideNav from "../../nav/AsideNav";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import styles from "./Shopping.module.css";

export function ShoppingContent() {
  return (
    <div className={styles.panel}>
      <h1 className={styles.title}>Shopping</h1>
      <p className={styles.lead}>
        Här kommer shoppinglänkar och rekommendationer att visas.
      </p>
    </div>
  );
}

export default function Shopping() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />
        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />
              <ShoppingContent />
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
