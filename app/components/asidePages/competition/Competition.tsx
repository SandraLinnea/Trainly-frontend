import Image from "next/image";

import AsideNav from "../../nav/AsideNav";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import styles from "./Competition.module.css";

export function CompetitionContent() {
  return (
    <div className={styles.panel}>
      <h1 className={styles.title}>SBK Tävling</h1>
      <p className={styles.lead}>
        Här hittar du länken till SBK tävling för att se kommande tävlingar och anmäla dig.
      </p>

      <a
        className={styles.competitionLink}
        href="https://brukshundklubben.se/sbktavling"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/images/SbkLogo.png"
          alt="Svenska Brukshundklubben logga"
          width={64}
          height={64}
          className={styles.sbkLogo}
        />
        <span>Till SBK Tävling</span>
      </a>
    </div>
  );
}

export default function Competition() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />
        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />
              <CompetitionContent />
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
