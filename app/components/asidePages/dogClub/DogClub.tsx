import Image from "next/image";

import AsideNav from "../../nav/AsideNav";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import styles from "./DogClub.module.css";

export function DogClubContent() {
  return (
    <div className={styles.panel}>
      <h1 className={styles.title}>Brukshundsklubbar</h1>
      <p className={styles.lead}>
        Hitta en brukshundsklubb nära dig via Svenska Brukshundklubben.
      </p>

      <a
        className={styles.clubLink}
        href="https://brukshundklubben.se/om-oss/hitta-din-klubb/"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/images/SbkLogo.png"
          alt="Svenska Brukshundklubben logga"
          width={64}
          height={64}
          className={styles.clubLogo}
        />
        <span>Svenska brukshundsklubben - hitta klubbar i din närhet</span>
      </a>
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
