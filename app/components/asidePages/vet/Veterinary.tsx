import AsideNav from "../../nav/AsideNav";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import styles from "./Veterinary.module.css";

type Clinic = {
  name: string;
  area: string;
  web?: string;
  note?: string;
};

type ClinicGroup = {
  title: string;
  note?: string;
  clinics: Clinic[];
};

const clinicGroups: ClinicGroup[] = [
  {
    title: "Luleå / Boden / Piteå",
    clinics: [
      { name: "Lapplands Djurklinik Luleå", area: "Luleå", web: "https://lapplandsdjurklinik.se" },
      { name: "Lapplands Djurklinik Boden", area: "Boden", web: "https://lapplandsdjurklinik.se" },
      { name: "Lapplands Djurklinik Piteå", area: "Piteå", web: "https://lapplandsdjurklinik.se" },
      { name: "Evidensia Djursjukhuset Gammelstad", area: "Gammelstad", web: "https://evidensia.se" },
      { name: "Evidensia Djurkliniken Öjebyn", area: "Öjebyn", web: "https://evidensia.se" },
      { name: "Pet Vet Sweden AB", area: "Piteå", note: "Saknar tydlig publik sida" },
      { name: "Veterinärcentrum i Norr AB", area: "Rosvik", note: "Webb okänd" },
      { name: "Veterinär Anna Semrén AB", area: "Råneå", note: "Webb okänd" },
    ],
  },
  {
    title: "Umeå",
    note: "Umeå är största veterinärnavet i länet.",
    clinics: [
      { name: "Djurkliniken i Umeå", area: "Umeå", web: "https://dku.se" },
      { name: "Anium Vetcentrum", area: "Umeå", web: "https://aniumavetcentrum.se" },
      { name: "Björkstadens Djurklinik", area: "Umeå", web: "https://evidensia.se" },
      { name: "DinVet Umeå", area: "Umeå", web: "https://dinvetumea.se" },
      { name: "UmeVet", area: "Holmsund (Umeå)", web: "https://umevet.se" },
      { name: "Djurkliniken Våra Vänner", area: "Umeå", web: "https://lapplandsdjurklinik.se" },
      { name: "Veterinär Lars Göransson AB", area: "Umeå", note: "Katalogsida" },
    ],
  },
  {
    title: "Skellefteå",
    note: "Ungefär 40+ veterinärverksamheter i länet totalt.",
    clinics: [
      { name: "Djurkliniken i Skellefteå Anderstorg", area: "Skellefteå", web: "https://lapplandsdjurklinik.se" },
      { name: "Veterinär Linda Lundström AB", area: "Skellefteå", note: "Egen sida finns" },
      { name: "Distriktsveterinärerna Skellefteå", area: "Skellefteå", web: "https://distriktsveterinarerna.se" },
    ],
  },
  {
    title: "Inland",
    clinics: [
      { name: "Dolittle Veterinärklinik", area: "Lycksele", web: "https://dolittle-vet.com" },
      { name: "Distriktsveterinärerna Lycksele", area: "Lycksele", web: "https://distriktsveterinarerna.se" },
      { name: "Distriktsveterinärerna Vilhelmina", area: "Vilhelmina", web: "https://distriktsveterinarerna.se" },
      { name: "Åsele Veterinären", area: "Åsele", note: "Lokal sida" },
    ],
  },
  {
    title: "Vännäs / Bygdeå / mindre orter",
    clinics: [
      { name: "Distriktsveterinärerna Vännäs", area: "Vännäs", web: "https://distriktsveterinarerna.se" },
      { name: "Distriktsveterinärerna Umåker", area: "Umeå", web: "https://distriktsveterinarerna.se" },
      { name: "Distriktsveterinärerna Bygdeå", area: "Bygdeå", web: "https://distriktsveterinarerna.se" },
      { name: "Bovet i Sverige AB", area: "Okänd", note: "Komplettera ort och webb" },
    ],
  },
];

function getMapUrl(clinic: Clinic) {
  return `https://www.openstreetmap.org/search?query=${encodeURIComponent(
    `${clinic.name} ${clinic.area}`
  )}`;
}

export function VeterinaryContent() {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Här kan du hitta din närmsta veterinär</h1>
          <p className={styles.lead}>
            Sök på ort för att enkelt hitta kliniker och djursjukhus i din närhet.
          </p>
        </div>
      </div>

      <div className={styles.groups}>
        {clinicGroups.map((group) => (
          <section className={styles.group} key={group.title}>
            <div className={styles.groupHeader}>
              <h2 className={styles.groupTitle}>{group.title}</h2>
              {group.note ? <p className={styles.groupNote}>{group.note}</p> : null}
            </div>

            <div className={styles.list}>
              {group.clinics.map((clinic) => (
                <article className={styles.card} key={clinic.name}>
                  <div>
                    <p className={styles.area}>{clinic.area}</p>
                    <h3 className={styles.cardTitle}>{clinic.name}</h3>
                    {clinic.note ? <p className={styles.note}>{clinic.note}</p> : null}
                  </div>

                  <dl className={styles.details}>
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
        ))}
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

              <div className={styles.panel}>
                <div className={styles.header}>
                  <div>
                    <h1 className={styles.title}>Här kan du hitta din närmsta veterinär</h1>
                    <p className={styles.lead}>
                      Sök på ort för att enkelt hitta kliniker och djursjukhus i din närhet.
                    </p>
                  </div>
                </div>

                <div className={styles.groups}>
                  {clinicGroups.map((group) => (
                    <section className={styles.group} key={group.title}>
                      <div className={styles.groupHeader}>
                        <h2 className={styles.groupTitle}>{group.title}</h2>
                        {group.note ? <p className={styles.groupNote}>{group.note}</p> : null}
                      </div>

                      <div className={styles.list}>
                        {group.clinics.map((clinic) => (
                          <article className={styles.card} key={clinic.name}>
                            <div>
                              <p className={styles.area}>{clinic.area}</p>
                              <h3 className={styles.cardTitle}>{clinic.name}</h3>
                              {clinic.note ? <p className={styles.note}>{clinic.note}</p> : null}
                            </div>

                            <dl className={styles.details}>
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
                  ))}
                </div>
              </div>
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
