"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span className={styles.copy}>© 2026 Trainly</span>
      </div>

      <div className={styles.center}>
        <div className={styles.links}>
          <Link href="/about" prefetch={false}>Om Trainly</Link>
          <span>·</span>
          <Link href="/privacy" prefetch={false}>Integritetspolicy</Link>
          <span>·</span>
          <Link href="/terms" prefetch={false}>Anvandarvillkor</Link>
          <span>·</span>
          <Link href="/contact" prefetch={false}>Kontakt</Link>
        </div>
      </div>

      <div className={styles.right}>
        <a href="mailto:hej@trainly.se" className={styles.mail}>
          hej@trainly.se
        </a>
      </div>
    </footer>
  );
}
