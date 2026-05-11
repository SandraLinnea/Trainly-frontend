import Footer from "../footer/Footer";
import Header from "../header/Header";
import type { FooterInfoPageData } from "./footerInfoContent";
import styles from "./FooterInfoPage.module.css";

export function FooterInfoContent({
  eyebrow,
  title,
  lead,
  sections,
}: FooterInfoPageData) {
  return (
    <div className={styles.content}>
      <div className={styles.topLine} aria-hidden />

      <section className={styles.intro}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lead}>{lead}</p>
      </section>

      <div className={styles.sections}>
        {sections.map((section) => (
          <section className={styles.section} key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export default function FooterInfoPage(props: FooterInfoPageData) {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header requireAuth={false} />

        <main className={styles.main}>
          <FooterInfoContent {...props} />
        </main>

        <Footer />
      </div>
    </div>
  );
}
