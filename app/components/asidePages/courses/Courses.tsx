import Image from "next/image";

import AsideNav from "../../nav/AsideNav";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import styles from "./Courses.module.css";

const courseLinks = [
  {
    name: "Mhundlydnad AB",
    href: "http://www.mhundlydnad.se/",
    logoSrc: "/images/Mhundlydnad.png",
    logoWidth: 150,
    logoHeight: 46,
  },
  {
    name: "Hundläroverket",
    hideName: true,
    href: "https://hundlaroverket.se/",
    logoSrc: "/images/HundlaroverketLogo.png",
    logoWidth: 150,
    logoHeight: 46,
  },
  {
    name: "Norra stockholms hundcenter",
    hideName: true,
    href: "https://norrastockholmshundcenter.se/",
    logoSrc: "/images/NorraStockholmHundcenterLogo.png",
    logoWidth: 150,
    logoHeight: 46,
  },
];

export function CoursesContent() {
  return (
    <div className={styles.panel}>
      <h1 className={styles.title}>Kurser</h1>
      <p className={styles.lead}>
        Här hittar du länkar till kursarrangörer och hundutbildningar.
      </p>

      <div className={styles.links}>
        {courseLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.card}
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.cardTitle}>
              <Image
                src={link.logoSrc}
                alt={`${link.name} logga`}
                width={link.logoWidth}
                height={link.logoHeight}
                className={styles.logoImage}
              />
              {link.hideName ? null : link.name}
            </span>
            <span className={styles.cardUrl}>
              {link.href.replace("https://", "").replace("http://", "").replace(/\/$/, "")}
            </span>
          </a>
        ))}
      </div>
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
