"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { getApiUrl } from "../../lib/api";
import {
  CALENDAR_NOTIFICATIONS_CHANGED_EVENT,
  isSharedCalendarEventDismissed,
} from "../../lib/calendarNotifications";
import LogoLink from "../brand/LogoLink";
import { AccountIcon } from "../icons/NavIcons";
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

type CalendarNotificationsResponse = {
  events?: {
    id: string;
    addedByName?: string;
  }[];
};

export default function Header({ requireAuth = true }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [friendNotifications, setFriendNotifications] = useState(0);
  const [calendarNotifications, setCalendarNotifications] = useState(0);

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      try {
        const response = await fetch(getApiUrl("/api/me"), {
          credentials: "include",
        });
        const data = (await response.json()) as { authenticated?: boolean };
        const authenticated = Boolean(data.authenticated);

        if (!active) {
          return;
        }

        setIsAuthenticated(authenticated);

        if (requireAuth && !authenticated) {
          router.replace("/auth/login");
        }
      } catch {
        if (active) {
          setIsAuthenticated(false);

          if (!requireAuth) {
            return;
          }

          router.replace("/auth/login");
        }
      }
    }

    void checkAuth();

    return () => {
      active = false;
    };
  }, [requireAuth, router]);

  useEffect(() => {
    async function updateFriendNotifications() {
      let requestCount = 0;

      if (isAuthenticated) {
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

      setFriendNotifications(requestCount);
    }

    const handleFriendNotificationsChange = () => {
      void updateFriendNotifications();
    };

    handleFriendNotificationsChange();
    window.addEventListener(FRIEND_REQUESTS_CHANGED_EVENT, handleFriendNotificationsChange);
    window.addEventListener("storage", handleFriendNotificationsChange);

    return () => {
      window.removeEventListener(FRIEND_REQUESTS_CHANGED_EVENT, handleFriendNotificationsChange);
      window.removeEventListener("storage", handleFriendNotificationsChange);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    let active = true;

    async function updateCalendarNotifications() {
      if (!isAuthenticated) {
        setCalendarNotifications(0);
        return;
      }

      try {
        const response = await fetch(getApiUrl("/api/calendar"), {
          credentials: "include",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as CalendarNotificationsResponse;
        const sharedEvents =
          data.events?.filter(
            (event) => event.addedByName && !isSharedCalendarEventDismissed(event.id),
          ) ?? [];

        if (active) {
          setCalendarNotifications(sharedEvents.length);
        }
      } catch {
        if (active) {
          setCalendarNotifications(0);
        }
      }
    }

    const handleCalendarNotificationsChange = () => {
      void updateCalendarNotifications();
    };

    handleCalendarNotificationsChange();
    window.addEventListener(
      CALENDAR_NOTIFICATIONS_CHANGED_EVENT,
      handleCalendarNotificationsChange,
    );

    return () => {
      active = false;
      window.removeEventListener(
        CALENDAR_NOTIFICATIONS_CHANGED_EVENT,
        handleCalendarNotificationsChange,
      );
    };
  }, [isAuthenticated]);

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
          href={isAuthenticated ? "/home" : "/"}
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
          <span>Kalender</span>
          {calendarNotifications > 0 ? (
            <span className={styles.badge} aria-label={`${calendarNotifications} kalendernotifieringar`}>
              {calendarNotifications}
            </span>
          ) : null}
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
          {friendNotifications > 0 ? (
            <span className={styles.badge} aria-label={`${friendNotifications} notifieringar`}>
              {friendNotifications}
            </span>
          ) : null}
        </Link>
      </nav>

      <div className={styles.actions}>
        {isAuthenticated ? (
          <>
            <Link
              href="/min-sida"
              className={navClass(styles.profileLink, styles.active, pathname === "/min-sida")}
              prefetch={false}
            >
              <AccountIcon className={styles.profileIcon} />
              <span>Min profil</span>
            </Link>
            <button
              type="button"
              className={styles.button}
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut ? "Loggar ut..." : "Logga ut"}
            </button>
          </>
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
