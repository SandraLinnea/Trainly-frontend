"use client";

import { FocusEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getApiUrl, readApiError } from "../../../lib/api";
import LogoLink from "../../brand/LogoLink";
import styles from "./Login.module.css";

export default function Login() {
  const router = useRouter();
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
      const response = await fetch(getApiUrl("/api/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError(await readApiError(response, "Fel email eller lösenord."));
        return;
      }

      router.push("/home");
      router.refresh();
    } catch {
      setError("Kunde inte logga in just nu.");
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
          <section className={styles.card} aria-label="Logga in">
            <h1 className={styles.title}>Logga in</h1>
            <p className={styles.subtitle}>Logga in på ditt konto i Trainly</p>

            <form className={styles.form} onSubmit={onSubmit}>
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
                  aria-invalid={error ? "true" : undefined}
                  aria-describedby={error ? "login-error" : undefined}
                />
                <span className={styles.inputIcon} aria-hidden>
                  👤
                </span>
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
                  autoComplete="current-password"
                  placeholder="Lösenord"
                  required
                  aria-invalid={error ? "true" : undefined}
                  aria-describedby={error ? "login-error" : undefined}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPw((value) => !value)}
                  aria-pressed={showPw}
                  aria-label={showPw ? "Dölj lösenord" : "Visa lösenord"}
                >
                  👁
                </button>
              </div>

              {error ? (
                <div id="login-error" className={styles.error} role="alert">
                  {error}
                </div>
              ) : null}

              <button className={styles.submit} disabled={loading}>
                {loading ? "Loggar in..." : "Logga in"}
              </button>
            </form>

            <div className={styles.links}>
              <Link href="/auth/register">Registrera dig</Link>
              <Link href="/auth/forgot" prefetch={false}>
                Glömt lösenord?
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
