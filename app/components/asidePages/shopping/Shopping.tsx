import Image from "next/image";

import AsideNav from "../../nav/AsideNav";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import styles from "./Shopping.module.css";

const shoppingLinks = [
  {
    name: "Tassavtryck Hundsport",
    href: "https://tassavtryck.com/",
    logoSrc: "/images/TassavtryckHundsportLogo.png",
    logoWidth: 160,
    logoHeight: 46,
  },
  {
    name: "Arken zoo",
    href: "https://www.arkenzoo.se/",
    logoSrc: "/images/ArkenZooLogo.png",
    logoWidth: 150,
    logoHeight: 28,
  },
  {
    name: "Jaktia",
    href: "https://www.jaktia.se/jakt",
    logoSrc: "/images/JaktiaLogo.png",
    logoWidth: 72,
    logoHeight: 22,
  },
];

const ads = [
  {
    src: "/images/TH reklam.png",
    alt: "Tassavtryck Hundsport reklam",
    href: "https://tassavtryck.com/",
  },
  {
    src: "/images/TH reklam.2.png",
    alt: "Tassavtryck Hundsport reklam",
    href: "https://tassavtryck.com/",
  },
  {
    src: "/images/TH reklam.3.png",
    alt: "Tassavtryck Hundsport reklam",
    href: "https://tassavtryck.com/",
  },
];

export function ShoppingContent() {
  return (
    <div className={styles.panel}>
      <div className={styles.layout}>
        <div>
          <h1 className={styles.title}>Shopping</h1>
          <p className={styles.lead}>
            Här hittar du länkar till butiker och utrustning för hundträning.
          </p>

          <div className={styles.links}>
            {shoppingLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.card}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.cardTitle}>
                  {link.logoSrc ? (
                    <Image
                      src={link.logoSrc}
                      alt={`${link.name} logga`}
                      width={link.logoWidth}
                      height={link.logoHeight}
                      className={styles.logoImage}
                    />
                  ) : null}
                </span>
                <span className={styles.cardUrl}>
                  {link.href.replace("https://", "").replace(/\/$/, "")}
                </span>
              </a>
            ))}
          </div>
        </div>

        <aside className={styles.ads} aria-label="Reklam">
          {ads.map((ad) => (
            <a
              key={ad.src}
              href={ad.href}
              className={styles.ad}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={ad.src}
                alt={ad.alt}
                width={320}
                height={180}
                className={styles.adImage}
              />
            </a>
          ))}
        </aside>
      </div>
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
