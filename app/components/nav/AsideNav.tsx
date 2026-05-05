"use client";

import type { ComponentType, SVGProps } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { getApiUrl } from "../../lib/api";
import styles from "./AsideNav.module.css";
import {
  CoursesIcon,
  DogClubIcon,
  DogIcon,
  ShoppingIcon,
  TrainingInspirationIcon,
  TrophyIcon,
  VetIcon,
} from "../icons/NavIcons";

type NavItem = {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  external?: boolean;
};

const items: NavItem[] = [
  { href: "/clubs", label: "Brukshundsklubbar", Icon: DogIcon },
  { href: "/courses", label: "Kurser", Icon: CoursesIcon },
  { href: "/competitions", label: "SBK Tävling", Icon: TrophyIcon },
  { href: "/shopping", label: "Shopping", Icon: ShoppingIcon },
  {
    href: "/svenska-brukshundsklubben",
    label: "Svenska brukshundsklubben",
    Icon: DogClubIcon,
  },
  { href: "/vets", label: "Veterinär", Icon: VetIcon },
];

const authenticatedItems: NavItem[] = [
  {
    href: "/training-inspiration",
    label: "Träningsinspiration",
    Icon: TrainingInspirationIcon,
  },
];

export default function AsideNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      try {
        const response = await fetch(getApiUrl("/api/me"), {
          credentials: "include",
        });
        const data = (await response.json()) as { authenticated?: boolean };

        if (active) {
          setIsAuthenticated(Boolean(data.authenticated));
        }
      } catch {
        if (active) {
          setIsAuthenticated(false);
        }
      }
    }

    void checkAuth();

    return () => {
      active = false;
    };
  }, []);

  const visibleItems = isAuthenticated ? [...items, ...authenticatedItems] : items;

  return (
    <aside className={styles.aside} aria-label="Snabblänkar">
      <h2 className={styles.heading}>Snabblänkar</h2>
      <div className={styles.rightLine} aria-hidden />
      <ul className={styles.list}>
        {visibleItems.map(({ href, label, Icon, external }) => (
          <li key={href}>
            <Link
              href={href}
              className={styles.listItem}
              prefetch={false}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
            >
              <Icon className={styles.icon} />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
