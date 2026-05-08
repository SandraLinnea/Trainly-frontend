"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { getApiUrl } from "../../lib/api";
import LogoLink from "../brand/LogoLink";
import styles from "./Header.module.css";

const FRIEND_REQUESTS_CHANGED_EVENT = "trainly:friendRequestsChanged";

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

type FriendNotificationsResponse = {
  requests?: unknown[];
};

export default function Header({ requireAuth = true }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);

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

  useEffect(() => {
    async function updateUnreadMessages() {
      let requestCount = 0;

      if (requireAuth) {
        try {
          const response = await fetch(getApiUrl("/api/friends"), {
            credentials: "include",
          });

          if (response.ok) {
            const data = (await response.json()) as FriendNotificationsResponse;
            requestCount = data.requests?.length ?? 0;
          }
        } catch {
          requestCount = 0;
        }
      }

      setUnreadMessages(requestCount);
    }

    const handleUnreadMessagesChange = () => {
      void updateUnreadMessages();
    };

    handleUnreadMessagesChange();
    window.addEventListener(FRIEND_REQUESTS_CHANGED_EVENT, handleUnreadMessagesChange);
    window.addEventListener("storage", handleUnreadMessagesChange);

    return () => {
      window.removeEventListener(FRIEND_REQUESTS_CHANGED_EVENT, handleUnreadMessagesChange);
      window.removeEventListener("storage", handleUnreadMessagesChange);
    };
  }, [requireAuth]);

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
          width={132}
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
          <span>Vänner</span>
          {unreadMessages > 0 ? (
            <span className={styles.badge} aria-label={`${unreadMessages} notifieringar`}>
              {unreadMessages}
            </span>
          ) : null}
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
