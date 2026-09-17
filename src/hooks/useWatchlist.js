import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "movie-explorer:watchlist";

function read() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Watchlist of show ids, persisted locally and synced across browser tabs. */
export default function useWatchlist() {
  const [ids, setIds] = useState(read);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Storage can be full or blocked in private mode; the app still works.
    }
  }, [ids]);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY) setIds(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((id) => {
    setIds((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    );
  }, []);

  const has = useCallback((id) => ids.includes(id), [ids]);

  return { ids, toggle, has, count: ids.length };
}
