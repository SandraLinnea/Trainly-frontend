"use client";

import Link from "next/link";
import styles from "./Hero.module.css";
import { DogClubIcon, CoursesIcon, TrophyIcon, VetIcon, ShoppingIcon, } from "../icons/NavIcons";
import LogoLink from "../brand/LogoLink";
import Image from "next/image";

export default function Hero() {
  return (
    <main className={styles.main}>
      <div className={styles.topRow}>
        <div className={styles.brand}>
          <LogoLink width={170} height={70} />
        </div>

        <div className={styles.topActions}>
          <Link href="/auth/login" className={styles.topLink}>
            Logga in
          </Link>
          <Link href="/auth/register" className={styles.topButton}>
            Skapa konto
          </Link>
        </div>
      </div>

      {/* Hero innehåll */}
<div className={styles.content}>
  <section className={styles.text}>
    <h1 className={styles.title}>
      Planera, dokumentera
      <br />
      och utveckla din hundträning
    </h1>

    <p className={styles.subtitle}>
      Ett samlat verktyg för seriösa hundförare –
      <br />
      från vardagsträning till tävling.
    </p>

    <div className={styles.actions}>
      <Link href="/auth/register" className={styles.primary}>
        Skapa konto
      </Link>
      <Link href="/auth/login" className={styles.ghost}>
        Logga in
      </Link>
    </div>
  </section>

  <aside className={styles.rightCol} aria-label="Snabblänkar">
    <div className={styles.rightLine} />
    <ul className={styles.list}>
  <li>
    <Link href="/shopping" className={styles.listItem}>
      <ShoppingIcon className={styles.icon} />
      Shopping
    </Link>
  </li>

  <li>
    <Link href="/dogclub" className={styles.listItem}>
      <DogClubIcon className={styles.icon} />
      Brukshundsklubbar
    </Link>
  </li>

  <li>
    <Link href="/competitions" className={styles.listItem}>
      <TrophyIcon className={styles.icon} />
      SBK Tävling
    </Link>
  </li>

  <li>
    <Link href="/vets" className={styles.listItem}>
      <VetIcon className={styles.icon} />
      Veterinär
    </Link>
  </li>

  <li>
    <Link href="/courses" className={styles.listItem}>
      <CoursesIcon className={styles.icon} />
      Kurser
    </Link>
  </li>
</ul>
  </aside>

      <div className={styles.laptopWrap}>
      <Image
        src="/Laptop.png"
        alt="Trainly förhandsvisning"
        width={820}
        height={520}
        priority
        className={styles.laptop}
      />
    </div>
</div>

    </main>
  );
}
