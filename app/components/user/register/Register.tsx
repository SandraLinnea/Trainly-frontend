"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getApiUrl, readApiError } from "../../../lib/api";
import LogoLink from "../../brand/LogoLink";
import styles from "./Register.module.css";

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function clearSelection(
    e: React.FocusEvent<HTMLInputElement>
  ) {
    const { value } = e.currentTarget;
    const caretPosition = value.length;

    if (
      e.currentTarget.type === "text" ||
      e.currentTarget.type === "search" ||
      e.currentTarget.type === "tel" ||
      e.currentTarget.type === "url" ||
      e.currentTarget.type === "password"
    ) {
      e.currentTarget.setSelectionRange(caretPosition, caretPosition);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
          username,
          email,
          phone,
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
          <LogoLink width={190} height={78} />
        </div>

        <main className={styles.main}>
          <section className={styles.card} aria-label="Registrera dig">
            <h1 className={styles.title}>Registrera dig</h1>
            <p className={styles.subtitle}>Skapa ett konto pa Trainly</p>

            <form className={styles.form} onSubmit={onSubmit}>
              <label className={styles.srOnly} htmlFor="firstName">
                Förnamn
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="firstName"
                  className={styles.input}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
                  onFocus={clearSelection}
                  autoComplete="family-name"
                  placeholder="Efternamn"
                  required
                />
              </div>

              <label className={styles.srOnly} htmlFor="username">
                Användarnamn
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="username"
                  className={styles.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={clearSelection}
                  autoComplete="username"
                  placeholder="Användarnamn"
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
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={clearSelection}
                  autoComplete="email"
                  placeholder="Email"
                  required
                />
              </div>

              <label className={styles.srOnly} htmlFor="phone">
                Telefon
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="phone"
                  className={styles.input}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={clearSelection}
                  autoComplete="tel"
                  placeholder="Telefon"
                />
              </div>

              <label className={styles.srOnly} htmlFor="password">
                Losenord
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="password"
                  className={styles.input}
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={clearSelection}
                  autoComplete="new-password"
                  placeholder="Lösenord"
                  required
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Dolj losenord" : "Visa losenord"}
                >
                  Visa
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
