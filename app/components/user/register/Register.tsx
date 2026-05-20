"use client";

import { FocusEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getApiUrl, readApiError } from "../../../lib/api";
import LogoLink from "../../brand/LogoLink";
import styles from "./Register.module.css";

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function clearSelection(event: FocusEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    const caretPosition = value.length;

    if (
      event.currentTarget.type === "text" ||
      event.currentTarget.type === "search" ||
      event.currentTarget.type === "tel" ||
      event.currentTarget.type === "url" ||
      event.currentTarget.type === "password"
    ) {
      event.currentTarget.setSelectionRange(caretPosition, caretPosition);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(getApiUrl("/api/auth/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        setError(await readApiError(response, "Kunde inte skapa konto."));
        return;
      }

      router.push("/home");
      router.refresh();
    } catch {
      setError("Kunde inte skapa konto. Forsok igen.");
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
          <section className={styles.card} aria-label="Registrera dig">
            <h1 className={styles.title}>Registrera dig</h1>
            <p className={styles.subtitle}>Skapa ett konto på Trainly</p>

            <form className={styles.form} onSubmit={onSubmit}>
              <label className={styles.srOnly} htmlFor="firstName">
                Förnamn
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="firstName"
                  className={styles.input}
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  onFocus={clearSelection}
                  autoComplete="given-name"
                  placeholder="Förnamn"
                  required
                />
              </div>

              <label className={styles.srOnly} htmlFor="lastName">
                Efternamn
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="lastName"
                  className={styles.input}
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  onFocus={clearSelection}
                  autoComplete="family-name"
                  placeholder="Efternamn"
                  required
                />
              </div>

              <label className={styles.srOnly} htmlFor="email">
                Email
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="email"
                  className={styles.input}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onFocus={clearSelection}
                  autoComplete="email"
                  placeholder="Email"
                  required
                />
              </div>

              <label className={styles.srOnly} htmlFor="password">
                Lösenord
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="password"
                  className={styles.input}
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onFocus={clearSelection}
                  autoComplete="new-password"
                  placeholder="Lösenord"
                  required
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPw((value) => !value)}
                  aria-pressed={showPw}
                  aria-label={showPw ? "Dölj lösenord" : "Visa lösenord"}
                >
                  <EyeIcon />
                </button>
              </div>

              {error ? <div className={styles.error}>{error}</div> : null}

              <button className={styles.submit} disabled={loading}>
                {loading ? "Skapar..." : "Skapa"}
              </button>
            </form>

            <div className={styles.links}>
              <Link href="/auth/login">Har du redan ett konto? Logga in</Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
