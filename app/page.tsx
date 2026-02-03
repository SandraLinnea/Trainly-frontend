/* import Header from "./components/header/Header"; */
import Hero from "./components/hero/Hero";
import Footer from "./components/footer/Footer";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        {/* <Header /> */}
        <Hero />
        <Footer />
      </div>
    </div>
  );
}
