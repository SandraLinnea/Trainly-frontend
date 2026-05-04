import Image from "next/image";

import AsideNav from "../../nav/AsideNav";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import styles from "./SvWorkingDog.module.css";

export function SvWorkingDogContent() {
  return (
    <div className={styles.panel}>
      <h1 className={styles.title}>Svenska Brukshundsklubben</h1>
      <p className={styles.lead}>
        Här hittar du länken till Svenska Brukshundsklubbens egen webbplats.
      </p>

      <a
        className={styles.sbkLink}
        href="https://brukshundklubben.se/om-oss/"
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
        <span>Till Svenska brukshundsklubben</span>
      </a>
    </div>
  );
}

export default function SvWorkingDog() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />
        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />
              <SvWorkingDogContent />
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
