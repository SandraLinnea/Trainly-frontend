"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { getApiUrl, readApiError } from "../../../lib/api";
import LogoLink from "../../brand/LogoLink";
import styles from "../forgotpassword/ForgotPassword.module.css";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("Återställningslänken saknar token.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(getApiUrl("/api/auth/reset-password"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ token, password }),
      });

      if (!response.ok) {
        setError(await readApiError(response, "Kunde inte uppdatera lösenordet."));
        return;
      }

      setMessage("Lösenordet är uppdaterat. Du kan logga in med ditt nya lösenord.");
      setPassword("");
      setConfirmPassword("");
    } catch {
      setError("Kunde inte uppdatera lösenordet just nu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.card} aria-label="Återställ lösenord">
      <h1 className={styles.title}>Nytt lösenord</h1>
      <p className={styles.subtitle}>Välj ett nytt lösenord till ditt Trainly-konto.</p>

      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.srOnly} htmlFor="new-password">
          Nytt lösenord
        </label>
        <input
          id="new-password"
          className={styles.input}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          placeholder="Nytt lösenord"
          minLength={8}
          required
        />

        <label className={styles.srOnly} htmlFor="confirm-password">
          Upprepa lösenord
        </label>
        <input
          id="confirm-password"
          className={styles.input}
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
          placeholder="Upprepa lösenord"
          minLength={8}
          required
        />

        {message ? <div className={styles.message}>{message}</div> : null}
        {error ? <div className={styles.error}>{error}</div> : null}

        <button className={styles.submit} type="submit" disabled={loading || !token}>
          {loading ? "Sparar..." : "Spara nytt lösenord"}
        </button>
      </form>

      <div className={styles.links}>
        <Link href="/auth/login">Tillbaka till login</Link>
      </div>
    </section>
  );
}

export default function ResetPassword() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.headerRow}>
          <LogoLink width={138} height={75} />
        </div>

        <main className={styles.main}>
          <Suspense fallback={null}>
            <ResetPasswordForm />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
