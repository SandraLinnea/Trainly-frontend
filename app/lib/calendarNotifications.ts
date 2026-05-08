export const CALENDAR_NOTIFICATIONS_CHANGED_EVENT = "trainly:calendarNotificationsChanged";

const DISMISSED_SHARED_EVENTS_KEY = "trainly.dismissedSharedCalendarEvents";

function getDismissedSharedEventIds() {
  if (typeof window === "undefined") {
    return new Set<string>();
  }

  try {
    const stored = window.localStorage.getItem(DISMISSED_SHARED_EVENTS_KEY);
    return new Set(stored ? (JSON.parse(stored) as string[]) : []);
  } catch {
    return new Set<string>();
  }
}

export function isSharedCalendarEventDismissed(eventId: string) {
  return getDismissedSharedEventIds().has(eventId);
}

export function dismissSharedCalendarEvent(eventId: string) {
  if (typeof window === "undefined") {
    return;
  }

  const dismissedIds = getDismissedSharedEventIds();
  dismissedIds.add(eventId);
  window.localStorage.setItem(
    DISMISSED_SHARED_EVENTS_KEY,
    JSON.stringify([...dismissedIds]),
  );
  window.dispatchEvent(new Event(CALENDAR_NOTIFICATIONS_CHANGED_EVENT));
}
