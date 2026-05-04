"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { getApiUrl } from "../../lib/api";
import LogoLink from "../brand/LogoLink";
import styles from "./Header.module.css";

function navClass(
  baseClass: string,
  activeClass: string,
  active: boolean
) {
  return active ? `${baseClass} ${activeClass}` : baseClass;
}

type HeaderProps = {
  requireAuth?: boolean;
};

export default function Header({ requireAuth = true }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;

    async function requireAuth() {
      try {
        const response = await fetch(getApiUrl("/api/me"), {
          credentials: "include",
        });
        const data = (await response.json()) as { authenticated?: boolean };

        if (active && !data.authenticated) {
          router.replace("/auth/login");
        }
      } catch {
        if (active) {
          router.replace("/auth/login");
        }
      }
    }

    if (requireAuth) {
      void requireAuth();
    }

    return () => {
      active = false;
    };
  }, [requireAuth, router]);

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
        <LogoLink
          width={175}
          height={73}
          className={styles.logoLink}
          imageClassName={styles.logo}
          href={requireAuth ? "/home" : "/"}
        />
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
          Vänner
        </Link>
      </nav>

      <div className={styles.actions}>
        {requireAuth ? (
          <button
            type="button"
            className={styles.button}
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? "Loggar ut..." : "Logga ut"}
          </button>
        ) : (
          <>
            <Link href="/auth/login" className={styles.button} prefetch={false}>
              Logga in
            </Link>
            <Link href="/auth/register" className={styles.button} prefetch={false}>
              Skapa konto
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
