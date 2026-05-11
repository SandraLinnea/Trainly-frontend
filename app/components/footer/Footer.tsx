"use client";

import { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";

import { getApiUrl } from "../../lib/api";
import { FooterInfoContent } from "../footerPages/FooterInfoPage";
import {
  footerInfoPageList,
  type FooterInfoPageData,
} from "../footerPages/footerInfoContent";
import styles from "./Footer.module.css";

export default function Footer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState<FooterInfoPageData | null>(null);

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      try {
        const response = await fetch(getApiUrl("/api/me"), {
          credentials: "include",
        });
        const data = (await response.json()) as { authenticated?: boolean };

        if (active) {
          setIsAuthenticated(Boolean(data.authenticated));
        }
      } catch {
        if (active) {
          setIsAuthenticated(false);
        }
      }
    }

    void checkAuth();

    return () => {
      active = false;
    };
  }, []);

  function handleFooterLinkClick(
    event: MouseEvent<HTMLAnchorElement>,
    page: FooterInfoPageData,
  ) {
    if (isAuthenticated) {
      return;
    }

    event.preventDefault();
    setActivePage(page);
  }

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.left}>
          <span className={styles.copy}>© 2026 Trainly</span>
        </div>

        <div className={styles.center}>
          <div className={styles.links}>
            {footerInfoPageList.map((page, index) => (
              <span className={styles.linkGroup} key={page.href}>
                {index > 0 ? <span>·</span> : null}
                <Link
                  href={page.href}
                  prefetch={false}
                  onClick={(event) => handleFooterLinkClick(event, page)}
                >
                  {page.label}
                </Link>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <a href="mailto:hej@trainly.se" className={styles.mail}>
            hej@trainly.se
          </a>
        </div>
      </footer>

      {activePage ? (
        <div
          className={styles.modalOverlay}
          role="presentation"
          onMouseDown={() => setActivePage(null)}
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label={activePage.label}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <nav className={styles.modalNav} aria-label="Footerlänkar">
                {footerInfoPageList.map((page) => (
                  <button
                    type="button"
                    key={page.href}
                    className={`${styles.modalNavItem} ${
                      activePage.href === page.href ? styles.modalNavItemActive : ""
                    }`}
                    onClick={() => setActivePage(page)}
                  >
                    {page.label}
                  </button>
                ))}
              </nav>

              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setActivePage(null)}
                aria-label="Stäng"
              >
                x
              </button>
            </div>

            <div className={styles.modalBody}>
              <FooterInfoContent {...activePage} />
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
