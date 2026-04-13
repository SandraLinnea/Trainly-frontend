"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getApiUrl } from "../../lib/api";
import LogoLink from "../brand/LogoLink";
import styles from "./Header.module.css";

export default function Header() {
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
        <LogoLink width={170} height={64} />
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
