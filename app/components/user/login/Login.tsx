"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // TODO: koppla till backend senare (Hono + Supabase)
      // Ex: await fetch("/api/auth/login", { method:"POST", headers:{...}, body: JSON.stringify({ username, password }) })
      await new Promise((r) => setTimeout(r, 450));
    } catch {
      setError("Fel användarnamn eller lösenord.");
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
          <section className={styles.card} aria-label="Logga in">
            <h1 className={styles.title}>Logga in</h1>

            <form className={styles.form} onSubmit={onSubmit}>
              <label className={styles.label}>
                Användarnamn
                <div className={styles.inputWrap}>
                  <input
                    className={styles.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                  />
                  <span className={styles.inputIcon} aria-hidden>
                    {/* använd ikon nu, byt till svg sen */}
                    👤
                  </span>
                </div>
              </label>

              <label className={styles.label}>
                Lösenord
                <div className={styles.inputWrap}>
                  <input
                    className={styles.input}
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
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
              </label>

              {error ? <div className={styles.error}>{error}</div> : null}

              <button className={styles.submit} disabled={loading}>
                {loading ? "Loggar in…" : "Logga in"}
              </button>
            </form>

            <div className={styles.links}>
              <Link href="/auth/register">Registrera dig</Link>
              <Link href="/auth/forgot">Glömt lösenord?</Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
