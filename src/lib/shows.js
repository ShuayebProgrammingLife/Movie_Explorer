export function stripHtml(html) {
  if (!html) return "";
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
  const el = typeof document !== "undefined" ? document.createElement("textarea") : null;
  if (!el) return text.trim();
  el.innerHTML = text;
  return el.value.trim();
}

export function getYear(show) {
  return show?.premiered ? Number(show.premiered.slice(0, 4)) : null;
}

export function getRating(show) {
  return typeof show?.rating?.average === "number" ? show.rating.average : null;
}

export function getPoster(show, size = "medium") {
  return show?.image?.[size] || show?.image?.medium || null;
}

export function formatDate(iso) {
  if (!iso) return "Unknown";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatRuntime(minutes) {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
}

/** Unique, alphabetically sorted genre list across a set of shows. */
export function collectGenres(shows) {
  const set = new Set();
  shows.forEach((show) => show?.genres?.forEach((genre) => set.add(genre)));
  return [...set].sort((a, b) => a.localeCompare(b));
}

export const SORTS = {
  relevance: { label: "Default order", compare: null },
  ratingDesc: {
    label: "Highest rated",
    compare: (a, b) => (getRating(b) ?? -1) - (getRating(a) ?? -1),
  },
  yearDesc: {
    label: "Newest first",
    compare: (a, b) => (getYear(b) ?? 0) - (getYear(a) ?? 0),
  },
  titleAsc: {
    label: "Title A–Z",
    compare: (a, b) => a.name.localeCompare(b.name),
  },
};

/** Apply genre filter + sort without mutating the source array. */
export function applyFilters(shows, { genre, sort }) {
  let output = shows;

  if (genre !== "all") {
    output = output.filter((show) => show.genres?.includes(genre));
  }

  const compare = SORTS[sort]?.compare;
  if (compare) output = [...output].sort(compare);

  return output;
}
