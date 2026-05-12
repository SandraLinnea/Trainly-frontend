"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import LogoLink from "../../brand/LogoLink";
import styles from "./ForgotPassword.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(`Ett mail har skickats till ${email.trim()}.`);
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

              {message ? (
                <div className={styles.message} role="status">
                  {message}
                </div>
              ) : null}

              <button className={styles.submit} type="submit">
                Skicka återställning
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
