"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentType, KeyboardEvent, SVGProps } from "react";
import { useEffect, useRef, useState } from "react";

import { CompetitionContent } from "../asidePages/competition/Competition";
import { CoursesContent } from "../asidePages/courses/Courses";
import { DogClubContent } from "../asidePages/dogClub/DogClub";
import { ShoppingContent } from "../asidePages/shopping/Shopping";
import { SvWorkingDogContent } from "../asidePages/svWorkingDog/SvWorkingDog";
import { VeterinaryContent } from "../asidePages/vet/Veterinary";
import LogoLink from "../brand/LogoLink";
import {
  CoursesIcon,
  DogClubIcon,
  DogIcon,
  ShoppingIcon,
  TrophyIcon,
  VetIcon,
} from "../icons/NavIcons";
import styles from "./Hero.module.css";

type ModalKey =
  | "clubs"
  | "courses"
  | "competitions"
  | "shopping"
  | "svWorkingDog"
  | "vets";

type ModalItem = {
  key: ModalKey;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  Content: ComponentType;
};

const modalItems: ModalItem[] = [
  {
    key: "clubs",
    label: "Brukshundsklubbar",
    Icon: DogIcon,
    Content: DogClubContent,
  },
  {
    key: "courses",
    label: "Kurser",
    Icon: CoursesIcon,
    Content: CoursesContent,
  },
  {
    key: "competitions",
    label: "SBK Tävling",
    Icon: TrophyIcon,
    Content: CompetitionContent,
  },
  {
    key: "shopping",
    label: "Shopping",
    Icon: ShoppingIcon,
    Content: ShoppingContent,
  },
  {
    key: "svWorkingDog",
    label: "Svenska brukshundsklubben",
    Icon: DogClubIcon,
    Content: SvWorkingDogContent,
  },
  {
    key: "vets",
    label: "Veterinär",
    Icon: VetIcon,
    Content: VeterinaryContent,
  },
];

export default function Hero() {
  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);
  const modalRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const wasModalOpenRef = useRef(false);
  const activeItem = modalItems.find((item) => item.key === activeModal);
  const ActiveContent = activeItem?.Content;
  const modalTitleId = activeItem ? `quick-link-title-${activeItem.key}` : undefined;

  function closeModal() {
    setActiveModal(null);
  }

  function openModal(key: ModalKey) {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    setActiveModal(key);
  }

  function handleModalKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== "Tab" || !modalRef.current) {
      return;
    }

    const focusable = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    );

    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  useEffect(() => {
    if (!activeModal) {
      wasModalOpenRef.current = false;
      previouslyFocusedRef.current?.focus();
      return;
    }

    if (!wasModalOpenRef.current) {
      closeButtonRef.current?.focus();
    }

    wasModalOpenRef.current = true;
  }, [activeModal]);

  return (
    <main className={styles.main}>
      <div className={styles.topRow}>
        <div className={styles.brand}>
          <LogoLink width={138} height={75} />
        </div>

        <div className={styles.topActions}>
          <Link href="/auth/login" className={styles.topButton}>
            Logga in
          </Link>
          <Link href="/auth/register" className={styles.topLink}>
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
            <Link href="/auth/login" className={styles.primary}>
              Logga in
            </Link>
            <Link href="/auth/register" className={styles.ghost}>
              Skapa konto
            </Link>

          </div>
        </section>

        <aside className={styles.rightCol} aria-label="Snabblänkar">
          <div className={styles.rightLine} aria-hidden="true" />
          <ul className={styles.list}>
            {modalItems.map(({ key, label, Icon }) => (
              <li key={key}>
                <button
                  type="button"
                  className={styles.listItem}
                  onClick={() => openModal(key)}
                  aria-haspopup="dialog"
                  aria-expanded={activeModal === key}
                  aria-controls={activeModal === key ? "quick-link-dialog" : undefined}
                >
                  <Icon className={styles.icon} aria-hidden="true" focusable="false" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className={styles.laptopWrap}>
          <Image
            src="/images/Laptop.png"
            alt="Trainly förhandsvisning"
            width={820}
            height={520}
            priority
            className={styles.laptop}
          />
        </div>
      </div>

      {activeItem ? (
        <div
          className={styles.modalOverlay}
          role="presentation"
          onMouseDown={closeModal}
        >
          <section
            id="quick-link-dialog"
            ref={modalRef}
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            onMouseDown={(event) => event.stopPropagation()}
            onKeyDown={handleModalKeyDown}
          >
            <div className={styles.modalHeader}>
              <nav className={styles.modalNav} aria-label="Snabblänkar">
                {modalItems.map(({ key, label, Icon }) => (
                  <button
                    type="button"
                    key={key}
                    className={`${styles.modalNavItem} ${
                      activeModal === key ? styles.modalNavItemActive : ""
                    }`}
                    onClick={() => setActiveModal(key)}
                    aria-pressed={activeModal === key}
                  >
                    <Icon className={styles.icon} aria-hidden="true" focusable="false" />
                    {label}
                  </button>
                ))}
              </nav>

              <button
                type="button"
                ref={closeButtonRef}
                className={styles.closeButton}
                onClick={closeModal}
                aria-label="Stäng"
              >
                <span aria-hidden="true">x</span>
              </button>
            </div>

            <div className={styles.modalBody}>
              <h2 id={modalTitleId} className={styles.srOnly}>
                {activeItem.label}
              </h2>
              {ActiveContent ? <ActiveContent /> : null}
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
