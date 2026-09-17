import { useCallback, useEffect, useState } from "react";
import { fetchShows, searchShows } from "../lib/api.js";

export default function useShows(query) {
  const [shows, setShows] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  const retry = useCallback(() => setReloadToken((n) => n + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    const trimmed = query.trim();

    setStatus("loading");
    setError(null);

    const load = trimmed
      ? searchShows(trimmed, { signal: controller.signal })
      : fetchShows(0, { signal: controller.signal });

    load
      .then((data) => {
        setShows(Array.isArray(data) ? data : []);
        setStatus("success");
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err);
        setStatus("error");
      });

    return () => controller.abort();
  }, [query, reloadToken]);

  return { shows, status, error, retry };
}
