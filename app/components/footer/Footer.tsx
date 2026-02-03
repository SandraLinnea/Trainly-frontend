"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span className={styles.brand}>Trainly</span>

        <div className={styles.links}>
          <Link href="/about">Om Trainly</Link>
          <span>·</span>
          <Link href="/privacy">Integritetspolicy</Link>
          <span>·</span>
          <Link href="/terms">Användarvillkor</Link>
          <span>·</span>
          <Link href="/contact">Kontakt</Link>
        </div>

        <a href="mailto:hej@trainly.se" className={styles.mail}>
          hej@trainly.se
        </a>
      </div>

    </footer>
  );
}
