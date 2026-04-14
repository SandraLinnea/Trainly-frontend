"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { getApiUrl } from "../../lib/api";
import LogoLink from "../brand/LogoLink";
import styles from "./Header.module.css";

function navClass(baseClass: string, activeClass: string, active: boolean) {
  return active ? `${baseClass} ${activeClass}` : baseClass;
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await fetch(getApiUrl("/api/auth/logout"), {
        method: "POST",
        credentials: "include",
      });
    } finally {
      router.replace("/");
      router.refresh();
      setLoggingOut(false);
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <LogoLink width={310} height={128} />
      </div>

      <nav className={styles.actions} aria-label="Huvudnavigation">
        <Link
          href="/logbook"
          className={navClass(styles.link, styles.active, pathname === "/logbook")}
          prefetch={false}
        >
          Dagbok
        </Link>
        <Link
          href="/calendar"
          className={navClass(styles.link, styles.active, pathname === "/calendar")}
          prefetch={false}
        >
          Kalender
        </Link>
        <Link
          href="/dogs"
          className={navClass(styles.link, styles.active, pathname === "/dogs")}
          prefetch={false}
        >
          Mina hundar
        </Link>
        <Link
          href="/friends"
          className={navClass(styles.link, styles.active, pathname === "/friends")}
          prefetch={false}
        >
          Vanner
        </Link>
      </nav>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? "Loggar ut..." : "Logga ut"}
        </button>
      </div>
    </header>
  );
}
