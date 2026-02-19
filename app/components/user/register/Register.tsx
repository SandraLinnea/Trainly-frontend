"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Register.module.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // TODO: koppla mot backend senare (Hono + Supabase)
      await new Promise((r) => setTimeout(r, 450));
    } catch {
      setError("Kunde inte skapa konto. Försök igen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.headerRow}>
          <Image
            src="/Trainlylogo.png"
            alt="Trainly"
            width={190}
            height={78}
            priority
          />
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
                  onChange={(e) => setFirstName(e.target.value)}
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
                  autoComplete="username"
                  placeholder="Användarnamn"
                  required
                />
                <span className={styles.inputIcon} aria-hidden>
                  👤
                </span>
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
                  autoComplete="email"
                  placeholder="Email"
                  required
                />
              </div>

              <label className={styles.srOnly} htmlFor="password">
                Lösen
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="password"
                  className={styles.input}
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  placeholder="Lösenord"
                  required
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Dölj lösenord" : "Visa lösenord"}
                >
                  👁
                </button>
              </div>

              {error ? <div className={styles.error}>{error}</div> : null}

              <button className={styles.submit} disabled={loading}>
                {loading ? "Skapar…" : "Skapa"}
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
