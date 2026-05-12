"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getApiUrl, readApiError } from "../../lib/api";
import AsideNav from "../nav/AsideNav";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import styles from "./MyPage.module.css";

type MeResponse = {
  authenticated?: boolean;
  name?: string;
  email?: string;
  createdAt?: string;
};

function formatCreatedAt(value?: string) {
  if (!value) {
    return "Okänt datum";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Okänt datum";
  }

  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function MyPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<MeResponse>({});
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadMe() {
      try {
        const response = await fetch(getApiUrl("/api/me"), {
          credentials: "include",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as MeResponse;

        if (active) {
          setProfile(data);
          setError("");
        }
      } catch {
        if (active) {
          setProfile({});
          setError("Kunde inte hämta användarens uppgifter.");
        }
      }
    }

    void loadMe();

    return () => {
      active = false;
    };
  }, []);

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Är du säker på att du vill ta bort ditt konto? Detta går inte att ångra.",
    );

    if (!confirmed || deleting) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      const response = await fetch(getApiUrl("/api/me"), {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        setError(await readApiError(response, "Kunde inte ta bort kontot."));
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("Kunde inte ta bort kontot just nu.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />

        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />

              <div className={styles.overview}>
                <p className={styles.kicker}>Konto</p>
                <h1 className={styles.title}>Min profil</h1>
              </div>

              <div className={styles.profilePanel}>
                {error ? <p className={styles.error}>{error}</p> : null}

                <dl className={styles.details}>
                  <div className={styles.detailRow}>
                    <dt>Namn</dt>
                    <dd>{profile.name || "Hämtar konto..."}</dd>
                  </div>
                  <div className={styles.detailRow}>
                    <dt>Mailadress</dt>
                    <dd>{profile.email || "Hämtar konto..."}</dd>
                  </div>
                  <div className={styles.detailRow}>
                    <dt>Konto skapat</dt>
                    <dd>{formatCreatedAt(profile.createdAt)}</dd>
                  </div>
                </dl>

                <div className={styles.accountActions}>
                  <button className={styles.secondaryButton} type="button">
                    Ändra lösenord
                  </button>
                  <button
                    className={styles.dangerButton}
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                  >
                    {deleting ? "Tar bort konto..." : "Ta bort konto"}
                  </button>
                </div>
              </div>
            </section>

            <aside className={styles.aside}>
              <AsideNav />
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
