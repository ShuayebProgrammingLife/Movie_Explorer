const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://api.tvmaze.com";
const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_RETRIES = 2;

const cache = new Map();

export class ApiError extends Error {
  constructor(message, { status = 0, cause } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.cause = cause;
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function readCache(key) {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.storedAt > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return hit.value;
}

async function request(path, { signal } = {}) {
  const cached = readCache(path);
  if (cached) return cached;

  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        signal,
        headers: { Accept: "application/json" },
      });

      // 404 from TVMaze means "nothing matched", not a failure.
      if (response.status === 404) return [];

      if (response.status >= 500) {
        throw new ApiError("The movie database is temporarily unavailable.", {
          status: response.status,
        });
      }

      if (!response.ok) {
        throw new ApiError("That request could not be completed.", {
          status: response.status,
        });
      }

      const data = await response.json();
      cache.set(path, { value: data, storedAt: Date.now() });
      return data;
    } catch (error) {
      if (error.name === "AbortError") throw error;
      lastError = error;

      const retryable = !(error instanceof ApiError) || error.status >= 500;
      if (!retryable || attempt === MAX_RETRIES) break;

      await sleep(2 ** attempt * 400);
    }
  }

  throw lastError instanceof ApiError
    ? lastError
    : new ApiError("Could not reach the movie database.", { cause: lastError });
}

/** Catalogue page. TVMaze returns 250 shows per page, page 0 is the first. */
export function fetchShows(page = 0, options) {
  return request(`/shows?page=${page}`, options);
}

/** Title search. TVMaze wraps each hit as { score, show }. */
export async function searchShows(query, options) {
  const results = await request(
    `/search/shows?q=${encodeURIComponent(query)}`,
    options
  );
  return results.map((entry) => entry.show);
}

/** Full record for one show, including cast, via TVMaze embedding. */
export function fetchShowById(id, options) {
  return request(`/shows/${id}?embed=cast`, options);
}
