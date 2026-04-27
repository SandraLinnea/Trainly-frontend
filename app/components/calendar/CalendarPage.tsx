"use client";

import { useMemo, useState } from "react";
import AsideNav from "../nav/AsideNav";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import CloseIcon from "../icons/CloseIcon";
import AddActivityModal, { CalendarEvent } from "./AddActivityModal";
import styles from "./CalendarPage.module.css";

const weekdays = ["Man", "Tis", "Ons", "Tor", "Fre", "Lor", "Son"];
const monthNames = [
  "Januari",
  "Februari",
  "Mars",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "Augusti",
  "September",
  "Oktober",
  "November",
  "December",
];

const today = new Date(2026, 3, 14);

const initialEvents: CalendarEvent[] = [
  {
    year: 2026,
    month: 3,
    day: 3,
    title: "Valpkurs",
    time: "18:00",
    type: "Kurs",
    location: "Svenska brukshundsklubben",
  },
  {
    year: 2026,
    month: 3,
    day: 3,
    title: "Kvallsrastning",
    time: "20:00",
    type: "Pass",
    location: "Skogsslingan",
  },
  {
    year: 2026,
    month: 3,
    day: 8,
    title: "Vardagslydnad",
    time: "17:30",
    type: "Traning",
    location: "Appellplanen",
  },
  {
    year: 2026,
    month: 3,
    day: 14,
    title: "Veterinar kontroll",
    time: "09:15",
    type: "Veterinar",
    location: "Djurkliniken Syd",
  },
  {
    year: 2026,
    month: 3,
    day: 14,
    title: "Promenadgrupp",
    time: "18:30",
    type: "Socialt",
    location: "Stadsparken",
  },
  {
    year: 2026,
    month: 3,
    day: 18,
    title: "SBK Tavling",
    time: "10:00",
    type: "Tavling",
    location: "Klubbfaltet",
  },
  {
    year: 2026,
    month: 3,
    day: 23,
    title: "Nose work-pass",
    time: "19:00",
    type: "Pass",
    location: "Inomhushallen",
  },
  {
    year: 2026,
    month: 3,
    day: 27,
    title: "Kloklippning",
    time: "15:00",
    type: "Omsorg",
    location: "Hundsalongen",
  },
  {
    year: 2026,
    month: 4,
    day: 5,
    title: "Sparpass",
    time: "11:00",
    type: "Pass",
    location: "Skogsangen",
  },
  {
    year: 2026,
    month: 4,
    day: 12,
    title: "Kursavslutning",
    time: "18:00",
    type: "Kurs",
    location: "Klubbhuset",
  },
];

function getMonthLabel(
  monthIndex: number,
  year: number
) {
  return `${monthNames[monthIndex]} ${year}`;
}

function getWeekdayOffset(
  year: number,
  monthIndex: number
) {
  const jsDay = new Date(year, monthIndex, 1).getDay();
  return (jsDay + 6) % 7;
}

function getEventDateLabel(event: CalendarEvent) {
  return `${event.day} ${monthNames[event.month].toLowerCase()} ${event.year}`;
}

export default function CalendarPage() {
  const [visibleMonth, setVisibleMonth] = useState({ year: 2026, month: 3 });
  const [events, setEvents] = useState(initialEvents);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isActivityListOpen, setIsActivityListOpen] = useState(false);

  const monthEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          event.year === visibleMonth.year && event.month === visibleMonth.month,
      ),
    [events, visibleMonth],
  );

  const nextActivity = monthEvents[0] ?? events[0];
  const leadingEmptyDays = getWeekdayOffset(visibleMonth.year, visibleMonth.month);
  const daysInMonth = new Date(
    visibleMonth.year,
    visibleMonth.month + 1,
    0,
  ).getDate();

  const calendarCells = [
    ...Array.from({ length: leadingEmptyDays }, (_, index) => ({
      key: `empty-start-${index}`,
      type: "empty" as const,
    })),
    ...Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const dayEvents = monthEvents.filter((entry) => entry.day === day);

      return {
        key: `day-${visibleMonth.year}-${visibleMonth.month}-${day}`,
        type: "day" as const,
        day,
        dayEvents,
      };
    }),
  ];

  const isTodayVisible =
    visibleMonth.year === today.getFullYear() &&
    visibleMonth.month === today.getMonth();

  const monthLabel = getMonthLabel(visibleMonth.month, visibleMonth.year);

  const goToPreviousMonth = () => {
    setVisibleMonth((current) => {
      if (current.month === 0) {
        return { year: current.year - 1, month: 11 };
      }

      return { year: current.year, month: current.month - 1 };
    });
  };

  const goToNextMonth = () => {
    setVisibleMonth((current) => {
      if (current.month === 11) {
        return { year: current.year + 1, month: 0 };
      }

      return { year: current.year, month: current.month + 1 };
    });
  };

  const handleAddActivity = (event: CalendarEvent) => {
    setEvents((current) =>
      [...current, event].sort((a, b) => {
        const aValue = new Date(a.year, a.month, a.day).getTime();
        const bValue = new Date(b.year, b.month, b.day).getTime();

        if (aValue !== bValue) {
          return aValue - bValue;
        }

        return a.time.localeCompare(b.time);
      }),
    );

    setIsAddModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />

        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />

              <div className={styles.layout}>
                <section className={styles.calendarCard}>
                  <div className={styles.calendarHeader}>
                    <div>
                      <h1 className={styles.title}>Kalender</h1>
                    </div>

                    <div className={styles.monthControls}>
                      <div className={styles.monthStepper}>
                        <button
                          className={styles.monthButton}
                          type="button"
                          onClick={goToPreviousMonth}
                          aria-label="Forra manaden"
                        >
                          ↑
                        </button>
                        <button
                          className={styles.monthButton}
                          type="button"
                          onClick={goToNextMonth}
                          aria-label="Nasta manaden"
                        >
                          ↓
                        </button>
                      </div>

                      <button className={styles.monthBadge} type="button">
                        {monthLabel}
                      </button>
                    </div>
                  </div>

                  <div className={styles.weekdays} aria-hidden>
                    {weekdays.map((weekday) => (
                      <span key={weekday} className={styles.weekday}>
                        {weekday}
                      </span>
                    ))}
                  </div>

                  <div className={styles.grid}>
                    {calendarCells.map((cell) => {
                      if (cell.type === "empty") {
                        return <div key={cell.key} className={styles.emptyCell} aria-hidden />;
                      }

                      const hasEvents = cell.dayEvents.length > 0;
                      const isToday = isTodayVisible && cell.day === today.getDate();

                      return (
                        <div
                          key={cell.key}
                          className={`${styles.dayCell} ${hasEvents ? styles.bookedDay : ""} ${isToday ? styles.today : ""}`}
                        >
                          <span className={styles.dayNumber}>{cell.day}</span>

                          {hasEvents ? (
                            <>
                              <div className={styles.eventDots} aria-hidden>
                                {cell.dayEvents.map((event, index) => (
                                  <span key={`${event.title}-${index}`} className={styles.eventDot} />
                                ))}
                              </div>

                              <div className={styles.tooltip} role="note">
                                {cell.dayEvents.map((event, index) => (
                                  <div key={`${event.title}-${index}`} className={styles.tooltipEvent}>
                                    <strong>{event.title}</strong>
                                    <span>
                                      {event.time} · {event.type}
                                    </span>
                                    <span>{event.location}</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>

                  <div className={styles.footerActions}>
                    <button
                      className={styles.addButton}
                      type="button"
                      onClick={() => setIsAddModalOpen(true)}
                    >
                      Lagg till aktivitet
                    </button>
                    <button
                      className={styles.viewAllButton}
                      type="button"
                      onClick={() => setIsActivityListOpen(true)}
                    >
                      Se alla
                    </button>
                  </div>
                </section>

                <aside className={styles.nextCard}>
                  <p className={styles.nextLabel}>Nast kommande</p>
                  <h2 className={styles.nextTitle}>{nextActivity.title}</h2>

                  <dl className={styles.nextDetails}>
                    <div className={styles.nextRow}>
                      <dt>Datum</dt>
                      <dd>{getEventDateLabel(nextActivity)}</dd>
                    </div>
                    <div className={styles.nextRow}>
                      <dt>Tid</dt>
                      <dd>{nextActivity.time}</dd>
                    </div>
                    <div className={styles.nextRow}>
                      <dt>Typ</dt>
                      <dd>{nextActivity.type}</dd>
                    </div>
                    <div className={styles.nextRow}>
                      <dt>Plats</dt>
                      <dd>{nextActivity.location}</dd>
                    </div>
                  </dl>
                </aside>
              </div>
            </section>

            <aside className={styles.aside}>
              <AsideNav />
            </aside>
          </div>
        </main>

        <Footer />
      </div>

      <AddActivityModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddActivity}
        defaultYear={visibleMonth.year}
        defaultMonth={visibleMonth.month}
      />

      {isActivityListOpen ? (
        <div
          className={styles.activityOverlay}
          onClick={() => setIsActivityListOpen(false)}
          role="presentation"
        >
          <div
            className={styles.activityModal}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="activity-list-title"
          >
            <div className={styles.activityModalHeader}>
              <h2 id="activity-list-title" className={styles.activityModalTitle}>
                Alla aktiviteter
              </h2>

              <button
                className={styles.activityCloseButton}
                type="button"
                onClick={() => setIsActivityListOpen(false)}
                aria-label="Stang"
              >
                <CloseIcon />
              </button>
            </div>

            <div className={styles.activityList}>
              {events.map((event, index) => (
                <article
                  className={styles.activityItem}
                  key={`${event.year}-${event.month}-${event.day}-${event.time}-${event.title}-${index}`}
                >
                  <div>
                    <h3 className={styles.activityTitle}>{event.title}</h3>
                    <p className={styles.activityMeta}>
                      {getEventDateLabel(event)} · {event.time}
                    </p>
                  </div>

                  <div className={styles.activityDetails}>
                    <span>{event.type}</span>
                    <span>{event.location}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
