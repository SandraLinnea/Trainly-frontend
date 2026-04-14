"use client";

import Image from "next/image";
import Link from "next/link";

import LogoLink from "../brand/LogoLink";
import {
  CoursesIcon,
  DogClubIcon,
  ShoppingIcon,
  TrophyIcon,
  VetIcon,
} from "../icons/NavIcons";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <main className={styles.main}>
      <div className={styles.topRow}>
        <div className={styles.brand}>
          <LogoLink width={360} height={150} />
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

      <div className={styles.content}>
        <section className={styles.text}>
          <h1 className={styles.title}>
            Planera, dokumentera
            <br />
            och utveckla din hundträning
          </h1>

          <p className={styles.subtitle}>
            Ett samlat verktyg för seriösa hundförare -
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

        <aside className={styles.rightCol} aria-label="Snabblankar">
          <div className={styles.rightLine} />
          <ul className={styles.list}>
            <li>
              <Link href="/courses" className={styles.listItem} prefetch={false}>
                <CoursesIcon className={styles.icon} />
                Kurser
              </Link>
            </li>

            <li>
              <Link
                href="/competitions"
                className={styles.listItem}
                prefetch={false}
              >
                <TrophyIcon className={styles.icon} />
                SBK Tävling
              </Link>
            </li>

            <li>
              <Link href="/shopping" className={styles.listItem} prefetch={false}>
                <ShoppingIcon className={styles.icon} />
                Shopping
              </Link>
            </li>

            <li>
              <Link
                href="https://brukshundklubben.se/om-oss/"
                className={styles.listItem}
                prefetch={false}
                target="_blank"
                rel="noreferrer"
              >
                <DogClubIcon className={styles.icon} />
                Svenska brukshundsklubben
              </Link>
            </li>

            <li>
              <Link href="/vets" className={styles.listItem} prefetch={false}>
                <VetIcon className={styles.icon} />
                Veterinär
              </Link>
            </li>
          </ul>
        </aside>

        <div className={styles.laptopWrap}>
          <Image
            src="/images/Laptop.png"
            alt="Trainly forhandsvisning"
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
