"use client";

import { useEffect, useMemo, useState } from "react";
import AsideNav from "../nav/AsideNav";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import CloseIcon from "../icons/CloseIcon";
import PenIcon from "../icons/PenIcon";
import { getApiUrl, readApiError } from "../../lib/api";
import {
  dismissSharedCalendarEvent,
  isSharedCalendarEventDismissed,
} from "../../lib/calendarNotifications";
import AddActivityModal, { ActivityFriend, CalendarEvent } from "./AddActivityModal";
import styles from "./CalendarPage.module.css";

const weekdays = ["Man", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];
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

const today = new Date();

type CalendarResponse = {
  events: CalendarEvent[];
};

type CalendarEventResponse = {
  event: CalendarEvent;
};

type FriendsResponse = {
  friends: ActivityFriend[];
};

function getMonthLabel(monthIndex: number, year: number) {
  return `${monthNames[monthIndex]} ${year}`;
}

function getWeekdayOffset(year: number, monthIndex: number) {
  const jsDay = new Date(year, monthIndex, 1).getDay();
  return (jsDay + 6) % 7;
}

function getEventDateLabel(event: CalendarEvent) {
  return `${event.day} ${monthNames[event.month].toLowerCase()} ${event.year}`;
}

function sortEvents(events: CalendarEvent[]) {
  return [...events].sort((a, b) => {
    const aValue = new Date(a.year, a.month, a.day).getTime();
    const bValue = new Date(b.year, b.month, b.day).getTime();

    if (aValue !== bValue) {
      return aValue - bValue;
    }

    return a.time.localeCompare(b.time);
  });
}

function getSharedWithName(event: CalendarEvent, friends: ActivityFriend[]) {
  return (
    event.sharedWithName ||
    friends.find((friend) => friend.id === event.sharedWithUserId)?.name ||
    ""
  );
}

export default function CalendarPage() {
  const [visibleMonth, setVisibleMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isActivityListOpen, setIsActivityListOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [sharedNoticeEvent, setSharedNoticeEvent] = useState<CalendarEvent | null>(null);
  const [friends, setFriends] = useState<ActivityFriend[]>([]);

  useEffect(() => {
    let active = true;

    async function loadEvents() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(getApiUrl("/api/calendar"), {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(await readApiError(response, "Kunde inte hämta aktiviteter."));
        }

        const data = (await response.json()) as CalendarResponse;

        if (active) {
          const sortedEvents = sortEvents(data.events);
          setEvents(sortedEvents);
          setSharedNoticeEvent(
            sortedEvents.find(
              (event) => event.addedByName && !isSharedCalendarEventDismissed(event.id),
            ) ?? null,
          );
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Kunde inte hämta aktiviteter.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadEvents();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadFriends() {
      try {
        const response = await fetch(getApiUrl("/api/friends"), {
          credentials: "include",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as FriendsResponse;

        if (active) {
          setFriends(data.friends);
        }
      } catch {
        if (active) {
          setFriends([]);
        }
      }
    }

    void loadFriends();

    return () => {
      active = false;
    };
  }, []);

  const monthEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          event.year === visibleMonth.year && event.month === visibleMonth.month,
      ),
    [events, visibleMonth],
  );

  const upcomingEvents = useMemo(() => {
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

    return events.filter((event) => {
      return new Date(event.year, event.month, event.day).getTime() >= startOfToday;
    });
  }, [events]);

  const nextActivity = upcomingEvents[0] ?? events[0] ?? null;
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

  const handleAddActivity = async (event: CalendarEvent) => {
    setError("");

    try {
      const response = await fetch(getApiUrl("/api/calendar"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          date: event.date,
          title: event.title,
          time: event.time,
          type: event.type,
          location: event.location,
          sharedWithUserId: event.sharedWithUserId,
        }),
      });

      if (!response.ok) {
        throw new Error(await readApiError(response, "Kunde inte spara aktivitet."));
      }

      const data = (await response.json()) as CalendarEventResponse;
      const sharedWithName =
        data.event.sharedWithName ||
        friends.find((friend) => friend.id === event.sharedWithUserId)?.name ||
        "";
      setEvents((current) =>
        sortEvents([
          ...current,
          {
            ...data.event,
            sharedWithUserId: data.event.sharedWithUserId || event.sharedWithUserId,
            sharedWithName,
          },
        ]),
      );
      setIsAddModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunde inte spara aktivitet.");
    }
  };

  const handleUpdateActivity = async (event: CalendarEvent) => {
    setError("");

    try {
      const response = await fetch(getApiUrl(`/api/calendar/${event.id}`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          date: event.date,
          title: event.title,
          time: event.time,
          type: event.type,
          location: event.location,
        }),
      });

      if (!response.ok) {
        throw new Error(await readApiError(response, "Kunde inte uppdatera aktivitet."));
      }

      const data = (await response.json()) as CalendarEventResponse;
      setEvents((current) =>
        sortEvents(current.map((entry) => (entry.id === data.event.id ? data.event : entry))),
      );
      setSelectedEvent(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunde inte uppdatera aktivitet.");
    }
  };

  const handleDeleteActivity = async (event: CalendarEvent) => {
    setError("");

    try {
      const response = await fetch(getApiUrl(`/api/calendar/${event.id}`), {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await readApiError(response, "Kunde inte ta bort aktivitet."));
      }

      setEvents((current) => current.filter((entry) => entry.id !== event.id));
      setSelectedEvent(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunde inte ta bort aktivitet.");
    }
  };

  const handleCloseSharedNotice = () => {
    if (sharedNoticeEvent) {
      dismissSharedCalendarEvent(sharedNoticeEvent.id);
    }

    setSharedNoticeEvent(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />

        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />

              {error ? <p className={styles.status}>{error}</p> : null}
              {loading ? <p className={styles.status}>Hämtar aktiviteter...</p> : null}

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
                          aria-label="Förra månaden"
                        >
                          ↑
                        </button>
                        <button
                          className={styles.monthButton}
                          type="button"
                          onClick={goToNextMonth}
                          aria-label="Nästa månaden"
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
                                {cell.dayEvents.map((event) => (
                                  <span key={event.id} className={styles.eventDot} />
                                ))}
                              </div>

                              <div className={styles.tooltip} role="note">
                                {cell.dayEvents.map((event) => (
                                  <button
                                    key={event.id}
                                    className={styles.tooltipEvent}
                                    type="button"
                                    onClick={() => setSelectedEvent(event)}
                                  >
                                    <strong>{event.title}</strong>
                                    <span>
                                      {event.time} · {event.type}
                                    </span>
                                    <span>{event.location}</span>
                                    {event.addedByName ? (
                                      <span>Tillagd av {event.addedByName}</span>
                                    ) : null}
                                    {getSharedWithName(event, friends) ? (
                                      <span>Delas med {getSharedWithName(event, friends)}</span>
                                    ) : null}
                                  </button>
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
                      Lägg till aktivitet
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
                  <p className={styles.nextLabel}>Näst kommande</p>
                  <h2 className={styles.nextTitle}>
                    {nextActivity ? nextActivity.title : "Ingen aktivitet"}
                  </h2>

                  {nextActivity ? (
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
                      {nextActivity.addedByName ? (
                        <div className={styles.nextRow}>
                          <dt>Tillagd av</dt>
                          <dd>{nextActivity.addedByName}</dd>
                        </div>
                      ) : null}
                      {getSharedWithName(nextActivity, friends) ? (
                        <div className={styles.nextRow}>
                          <dt>Delas med</dt>
                          <dd>{getSharedWithName(nextActivity, friends)}</dd>
                        </div>
                      ) : null}
                    </dl>
                  ) : (
                    <p className={styles.nextHint}>Lägg till din första aktivitet.</p>
                  )}
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
        friends={friends}
      />

      <AddActivityModal
        open={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
        onSave={handleUpdateActivity}
        onDelete={handleDeleteActivity}
        defaultYear={visibleMonth.year}
        defaultMonth={visibleMonth.month}
        event={selectedEvent}
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
                aria-label="Stäng"
              >
                <CloseIcon />
              </button>
            </div>

            <div className={styles.activityList}>
              {events.length > 0 ? (
                events.map((event) => (
                  <button
                    className={styles.activityItem}
                    key={event.id}
                    type="button"
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsActivityListOpen(false);
                    }}
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
                      {event.addedByName ? <span>Tillagd av {event.addedByName}</span> : null}
                      {getSharedWithName(event, friends) ? (
                        <span>Delas med {getSharedWithName(event, friends)}</span>
                      ) : null}
                    </div>
                    <span className={styles.editIcon}>
                      <PenIcon />
                    </span>
                  </button>
                ))
              ) : (
                <p className={styles.status}>Du har inte lagt till några aktiviteter än.</p>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {sharedNoticeEvent ? (
        <div
          className={styles.activityOverlay}
          onClick={handleCloseSharedNotice}
          role="presentation"
        >
          <div
            className={styles.shareNoticeModal}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-notice-title"
          >
            <div className={styles.activityModalHeader}>
              <h2 id="share-notice-title" className={styles.activityModalTitle}>
                Delad aktivitet
              </h2>

              <button
                className={styles.activityCloseButton}
                type="button"
                onClick={handleCloseSharedNotice}
                aria-label="Stäng"
              >
                <CloseIcon />
              </button>
            </div>

            <p className={styles.shareNoticeText}>
              {sharedNoticeEvent.addedByName} vill dela en aktivitet den{" "}
              {getEventDateLabel(sharedNoticeEvent)} med dig.
            </p>

            <div className={styles.shareNoticeActions}>
              <button
                className={styles.shareNoticeButton}
                type="button"
                onClick={handleCloseSharedNotice}
              >
                Okej
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
