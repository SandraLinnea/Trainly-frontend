import AsideNav from "../../nav/AsideNav";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import styles from "./Courses.module.css";

export function CoursesContent() {
  return (
    <div className={styles.panel}>
      <h1 className={styles.title}>Kurser</h1>
      <p className={styles.lead}>Här kommer kurser att visas.</p>
    </div>
  );
}

export default function Courses() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />
        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />
              <CoursesContent />
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
