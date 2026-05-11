"use client";

import { useEffect, useMemo, useState } from "react";
import AsideNav from "../nav/AsideNav";
import CloseIcon from "../icons/CloseIcon";
import DeleteIcon from "../icons/DeleteIcon";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import DeleteConfirmModal from "../shared/DeleteConfirmModal";
import editModal from "../shared/EditModal.module.css";
import { getApiUrl, readApiError } from "../../lib/api";
import styles from "./FriendsPage.module.css";

const FRIEND_REQUESTS_CHANGED_EVENT = "trainly:friendRequestsChanged";

type Friend = {
  id: string;
  name: string;
  username: string;
  dogs?: FriendDog[];
};

type FriendDog = {
  id: string;
  name: string;
  breed: string;
  age: string;
};

type FriendsResponse = {
  friends: Friend[];
  requests?: Friend[];
};

type FriendSearchResponse = {
  users: Friend[];
};

type FriendResponse = {
  friend?: Friend;
  request?: Friend;
};

function AddFriendModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      setError("");
      return;
    }

    const search = query.trim();

    if (search.length < 2) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    async function searchUsers() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          getApiUrl(`/api/friends/search?q=${encodeURIComponent(search)}`),
          {
            credentials: "include",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(await readApiError(response, "Kunde inte söka användare."));
        }

        const data = (await response.json()) as FriendSearchResponse;
        setResults(data.users);
      } catch (err) {
        if (!controller.signal.aborted) {
          setResults([]);
          setError(err instanceof Error ? err.message : "Kunde inte söka användare.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    const timeout = window.setTimeout(() => {
      void searchUsers();
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [open, query]);

  if (!open) {
    return null;
  }

  async function addFriend(friend: Friend) {
    try {
      setError("");

      const response = await fetch(getApiUrl("/api/friends"), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendUserId: friend.id }),
      });

      if (!response.ok) {
        throw new Error(await readApiError(response, "Kunde inte lägga till vän."));
      }

      await response.json() as FriendResponse;
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunde inte lägga till vän.");
    }
  }

  return (
    <div className={editModal.overlay} onClick={onClose} role="presentation">
      <div
        className={`${editModal.modal} ${editModal.compactModal}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-friend-title"
      >
        <div className={editModal.form}>
          <div className={editModal.header}>
            <h2 id="add-friend-title" className={editModal.title}>
              Lägg till vän
            </h2>

            <button
              className={editModal.closeButton}
              type="button"
              onClick={onClose}
              aria-label="Stäng"
            >
              <CloseIcon />
            </button>
          </div>

          <label className={editModal.field}>
            <span className={editModal.label}>Sök användare</span>
            <input
              className={editModal.input}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Namn, användarnamn eller email"
              autoFocus
            />
          </label>

          <div className={styles.searchResults}>
            {loading ? <p className={styles.status}>Söker...</p> : null}
            {error ? <p className={styles.status}>{error}</p> : null}

            {!loading && !error && query.trim().length >= 2 && results.length === 0 ? (
              <p className={styles.status}>Ingen användare hittades.</p>
            ) : null}

            {results.map((friend) => (
              <button
                className={styles.resultItem}
                key={friend.id}
                type="button"
                onClick={() => void addFriend(friend)}
              >
                <span className={styles.avatar} aria-hidden>
                  {friend.name.slice(0, 1)}
                </span>
                <span>
                  <strong>{friend.name}</strong>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<Friend[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState<Friend | null>(null);
  const [friendRequestToAccept, setFriendRequestToAccept] = useState<Friend | null>(null);

  const visibleFriends = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return friends;
    }

    return friends.filter((friend) =>
      `${friend.name} ${friend.username}`.toLowerCase().includes(search),
    );
  }, [friends, query]);

  async function loadFriends() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(getApiUrl("/api/friends"), {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await readApiError(response, "Kunde inte hämta vänner."));
      }

      const data = (await response.json()) as FriendsResponse;
      setFriends(data.friends);
      setFriendRequests(data.requests ?? []);
    } catch (err) {
      setFriends([]);
      setFriendRequests([]);
      setError(err instanceof Error ? err.message : "Kunde inte hämta vänner.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadFriends();
  }, []);

  async function handleAcceptFriendRequest(friend: Friend) {
    try {
      setError("");

      const response = await fetch(getApiUrl("/api/friends"), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendUserId: friend.id }),
      });

      if (!response.ok) {
        throw new Error(await readApiError(response, "Kunde inte lägga till vän."));
      }

      setFriendRequestToAccept(null);
      window.dispatchEvent(new Event(FRIEND_REQUESTS_CHANGED_EVENT));
      await loadFriends();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunde inte lägga till vän.");
    }
  }

  async function handleDeclineFriendRequest(friend: Friend) {
    try {
      setError("");

      const response = await fetch(getApiUrl(`/api/friends/${friend.id}`), {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await readApiError(response, "Kunde inte neka vänförfrågan."));
      }

      setFriendRequestToAccept(null);
      window.dispatchEvent(new Event(FRIEND_REQUESTS_CHANGED_EVENT));
      await loadFriends();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunde inte neka vänförfrågan.");
    }
  }

  async function handleDeleteFriend(friend: Friend) {
    try {
      setError("");

      const response = await fetch(getApiUrl(`/api/friends/${friend.id}`), {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await readApiError(response, "Kunde inte ta bort vän."));
      }

      setFriendToDelete(null);
      await loadFriends();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunde inte ta bort vän.");
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />

        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />

              <div className={styles.overview}>
                <div>
                  <h1 className={styles.title}>Vänner</h1>
                  <p className={styles.lead}>Håll koll på dina träningsvänner.</p>
                </div>
              </div>

              <div className={styles.filterBar}>
                <label className={styles.filterField}>
                  <span>Sök vän:</span>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Sök på namn"
                  />
                </label>
                {friendRequests[0] ? (
                  <button
                    className={styles.friendRequestNotice}
                    type="button"
                    onClick={() => setFriendRequestToAccept(friendRequests[0])}
                  >
                    {friendRequests[0].name} vill bli din vän!
                  </button>
                ) : null}
              </div>

              <div className={styles.list}>
                {error ? <p className={styles.empty}>{error}</p> : null}

                {loading ? (
                  <p className={styles.empty}>Hämtar vänner...</p>
                ) : visibleFriends.length > 0 ? (
                  visibleFriends.map((friend) => (
                    <article className={styles.friendItem} key={friend.id}>
                      <div className={styles.friendHeader}>
                        <div className={styles.avatar} aria-hidden>
                          {friend.name.slice(0, 1)}
                        </div>
                        <div>
                          <h2 className={styles.friendName}>{friend.name}</h2>
                        </div>

                        {friend.dogs && friend.dogs.length > 0 ? (
                          <div className={styles.friendDogs}>
                            {friend.dogs.map((dog) => (
                              <div className={styles.dogItem} key={dog.id}>
                                <strong>{dog.name}</strong>
                                <span>{dog.breed}</span>
                              </div>
                            ))}
                          </div>
                        ) : null}

                        <div className={styles.friendActions}>
                          <button
                            className={styles.iconButton}
                            type="button"
                            onClick={() => setFriendToDelete(friend)}
                            aria-label={`Ta bort ${friend.name}`}
                          >
                            <DeleteIcon size={21} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className={styles.empty}>Du har inte lagt till några vänner än.</p>
                )}
              </div>

              <div className={styles.actionsRow}>
                <button
                  className={styles.addButton}
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  Lägg till vän
                </button>
              </div>
            </section>

            <aside className={styles.aside}>
              <AsideNav />
            </aside>
          </div>
        </main>

        <Footer />
      </div>

      <AddFriendModal
        open={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          void loadFriends();
        }}
      />
      <DeleteConfirmModal
        open={friendToDelete !== null}
        message="Är du säker på att du vill ta bort vännen?"
        onCancel={() => setFriendToDelete(null)}
        onConfirm={() => {
          if (friendToDelete) {
            void handleDeleteFriend(friendToDelete);
          }
        }}
      />
      <DeleteConfirmModal
        open={friendRequestToAccept !== null}
        message={`Vill du lägga till ${friendRequestToAccept?.name ?? ""} som vän?`}
        variant="save"
        onDismiss={() => setFriendRequestToAccept(null)}
        onCancel={() => {
          if (friendRequestToAccept) {
            void handleDeclineFriendRequest(friendRequestToAccept);
          }
        }}
        onConfirm={() => {
          if (friendRequestToAccept) {
            void handleAcceptFriendRequest(friendRequestToAccept);
          }
        }}
      />
    </div>
  );
}
