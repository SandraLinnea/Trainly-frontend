"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { getApiUrl } from "../../../lib/api";
import AsideNav from "../../nav/AsideNav";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import styles from "./Veterinary.module.css";

type Clinic = {
  id: string | number;
  name: string;
  municipality: string;
  area: string;
  address?: string;
  web?: string;
  note?: string;
};

type ClinicGroup = {
  title: string;
  clinics: Clinic[];
};

type VetsResponse = {
  counties: {
    name: string;
    count: number;
  }[];
  groups: ClinicGroup[];
};

const INITIAL_PAGE_SIZE = 5;

function getMapUrl(clinic: Clinic) {
  return `https://www.openstreetmap.org/search?query=${encodeURIComponent(
    `${clinic.name} ${clinic.address ?? clinic.area}`
  )}`;
}

function getClinicCount(groups: ClinicGroup[]) {
  return groups.reduce((count, group) => count + group.clinics.length, 0);
}

function getPaginatedGroups(groups: ClinicGroup[], page: number) {
  const start = (page - 1) * INITIAL_PAGE_SIZE;
  const end = start + INITIAL_PAGE_SIZE;
  const clinics = groups.flatMap((group) =>
    group.clinics.map((clinic) => ({ clinic, groupTitle: group.title }))
  );

  return clinics.slice(start, end).reduce<ClinicGroup[]>((result, item) => {
    const group = result.find((entry) => entry.title === item.groupTitle);

    if (group) {
      group.clinics.push(item.clinic);
      return result;
    }

    result.push({ title: item.groupTitle, clinics: [item.clinic] });
    return result;
  }, []);
}

export function VeterinaryContent() {
  const [query, setQuery] = useState("");
  const [county, setCounty] = useState("all");
  const [counties, setCounties] = useState<VetsResponse["counties"]>([]);
  const [groups, setGroups] = useState<ClinicGroup[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const hasFilters = query.trim().length > 0 || county !== "all";
  const totalClinicCount = getClinicCount(groups);
  const totalPages = Math.max(1, Math.ceil(totalClinicCount / INITIAL_PAGE_SIZE));
  const visibleGroups = hasFilters ? groups : getPaginatedGroups(groups, page);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();

    if (query.trim()) {
      params.set("search", query.trim());
    }

    if (county !== "all") {
      params.set("county", county);
    }

    async function loadVets() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(getApiUrl(`/api/vets?${params.toString()}`), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Kunde inte hämta veterinärer.");
        }

        const data = (await response.json()) as VetsResponse;
        setCounties(data.counties);
        setGroups(data.groups);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        setError("Kunde inte hämta veterinärer just nu.");
        setGroups([]);
      } finally {
        setLoading(false);
      }
    }

    void loadVets();

    return () => {
      controller.abort();
    };
  }, [query, county]);

  useEffect(() => {
    setPage(1);
  }, [query, county]);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Här kan du hitta din närmsta veterinär</h1>
          <p className={styles.lead}>
            Sök på namn eller ort och filtrera efter län.
          </p>
        </div>
      </div>

      <div className={styles.filters}>
        <label className={styles.field}>
          <span>Sök</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Sök på klinik, ort eller webbadress"
          />
        </label>

        <label className={styles.field}>
          <span>Län</span>
          <select value={county} onChange={(event) => setCounty(event.target.value)}>
            <option value="all">Hela landet</option>
            {counties.map((countyOption) => (
              <option value={countyOption.name} key={countyOption.name}>
                {countyOption.name} ({countyOption.count} st)
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.layout}>
        <div className={styles.groups}>
          {loading ? <p className={styles.empty}>Hämtar veterinärer...</p> : null}
          {error ? <p className={styles.empty}>{error}</p> : null}

          {!loading && !error && visibleGroups.length > 0
            ? visibleGroups.map((group) => (
                <section className={styles.group} key={group.title}>
                  <div className={styles.groupHeader}>
                    <h2 className={styles.groupTitle}>{group.title}</h2>
                  </div>

                  <div className={styles.list}>
                    {group.clinics.map((clinic) => (
                      <article className={styles.card} key={clinic.id}>
                        <div>
                          <p className={styles.area}>{clinic.area}</p>
                          <h3 className={styles.cardTitle}>{clinic.name}</h3>
                          {clinic.address ? (
                            <p className={styles.address}>{clinic.address}</p>
                          ) : null}
                          {clinic.note ? <p className={styles.note}>{clinic.note}</p> : null}
                        </div>

                        <dl className={styles.details}>
                          <div>
                            <dt>Kommun</dt>
                            <dd>{clinic.municipality}</dd>
                          </div>
                          <div>
                            <dt>Ort</dt>
                            <dd>{clinic.area}</dd>
                          </div>
                          <div>
                            <dt>Webb</dt>
                            <dd>
                              {clinic.web ? (
                                <a href={clinic.web} target="_blank" rel="noreferrer">
                                  {clinic.web.replace("https://", "")}
                                </a>
                              ) : (
                                clinic.note ?? "Okänd"
                              )}
                            </dd>
                          </div>
                        </dl>

                        <a
                          className={styles.mapLink}
                          href={getMapUrl(clinic)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visa karta
                        </a>
                      </article>
                    ))}
                  </div>
                </section>
              ))
            : null}

          {!loading && !error && !hasFilters && totalClinicCount > INITIAL_PAGE_SIZE ? (
            <div className={styles.pagination}>
              <p>
                Visar {(page - 1) * INITIAL_PAGE_SIZE + 1}-
                {Math.min(page * INITIAL_PAGE_SIZE, totalClinicCount)} av{" "}
                {totalClinicCount} kliniker
              </p>
              <div className={styles.pageActions}>
                <button
                  type="button"
                  onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                  disabled={page === 1}
                >
                  Föregående
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPage((currentPage) => Math.min(totalPages, currentPage + 1))
                  }
                  disabled={page === totalPages}
                >
                  Nästa
                </button>
              </div>
            </div>
          ) : null}

          {!loading && !error && groups.length === 0 ? (
            <p className={styles.empty}>Inga veterinärer matchar din sökning.</p>
          ) : null}
        </div>

        <aside className={styles.ad} aria-label="Reklam">
          <Image
            src="/images/Arstakliniken.png"
            alt="Årstakliniken"
            width={320}
            height={480}
            className={styles.adImage}
          />
        </aside>
      </div>
    </div>
  );
}

export default function Veterinary() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />

        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />
              <VeterinaryContent />
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
