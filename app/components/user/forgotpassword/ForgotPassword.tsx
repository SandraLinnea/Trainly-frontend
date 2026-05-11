"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { getApiUrl, readApiError } from "../../../lib/api";
import LogoLink from "../../brand/LogoLink";
import styles from "./ForgotPassword.module.css";

type ForgotPasswordResponse = {
  message?: string;
  resetUrl?: string;
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setResetUrl("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(getApiUrl("/api/auth/forgot-password"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setError(await readApiError(response, "Kunde inte skicka återställning."));
        return;
      }

      const data = (await response.json()) as ForgotPasswordResponse;
      setMessage(data.message || "Om kontot finns får du instruktioner för återställning.");
      setResetUrl(data.resetUrl || "");
    } catch {
      setError("Kunde inte skicka återställning just nu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.headerRow}>
          <LogoLink width={138} height={75} />
        </div>

        <main className={styles.main}>
          <section className={styles.card} aria-label="Glömt lösenord">
            <h1 className={styles.title}>Glömt lösenord</h1>
            <p className={styles.subtitle}>
              Skriv in din email så hjälper vi dig vidare.
            </p>

            <form className={styles.form} onSubmit={onSubmit}>
              <label className={styles.srOnly} htmlFor="forgot-email">
                Email
              </label>
              <input
                id="forgot-email"
                className={styles.input}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                placeholder="Email"
                required
              />

              {message ? <div className={styles.message}>{message}</div> : null}

              {resetUrl ? (
                <Link className={styles.resetLink} href={resetUrl}>
                  Öppna återställningslänk
                </Link>
              ) : null}

              {error ? <div className={styles.error}>{error}</div> : null}

              <button className={styles.submit} type="submit" disabled={loading}>
                {loading ? "Skickar..." : "Skicka återställning"}
              </button>
            </form>

            <div className={styles.links}>
              <Link href="/auth/login">Tillbaka till login</Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
