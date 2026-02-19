"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Link href="/home" aria-label="Trainly hem">
          <Image
            src="/Trainlylogo.png"
            alt="Trainly"
            width={150}
            height={56}
            priority
          />
        </Link>
      </div>

      <nav className={styles.actions} aria-label="Huvudnavigation">
        <Link href="/logbook" className={styles.link}>
          Dagbok
        </Link>
        <Link href="/calendar" className={styles.link}>
          Kalender
        </Link>
        <Link href="/dogs" className={styles.link}>
          Mina hundar
        </Link>
        <Link href="/friends" className={styles.link}>
          Vänner
        </Link>
      </nav>

      <div className={styles.actions}>
        <Link href="/auth/logout" className={styles.button}>
          Logga ut
        </Link>
      </div>
    </header>
  );
}
