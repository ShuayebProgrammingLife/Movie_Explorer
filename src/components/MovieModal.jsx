import { useCallback, useEffect, useRef, useState } from "react";
import { fetchShowById } from "../lib/api.js";
import {
  formatDate,
  formatRuntime,
  getPoster,
  getRating,
  stripHtml,
} from "../lib/shows.js";
import useWatchlistContext from "../lib/useWatchlistContext.js";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

function Meta({ term, children }) {
  return (
    <div>
      <dt className="text-[0.8rem] text-muted">{term}</dt>
      <dd className="mt-0.5 font-semibold">{children}</dd>
    </div>
  );
}

export default function MovieModal({ show, onClose }) {
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const [detail, setDetail] = useState(null);
  const { has, toggle } = useWatchlistContext();

  useEffect(() => {
    if (show) openerRef.current = document.activeElement;
    else openerRef.current?.focus?.();
  }, [show]);

  useEffect(() => {
    if (!show) return undefined;
    const controller = new AbortController();
    setDetail(null);

    fetchShowById(show.id, { signal: controller.signal })
      .then(setDetail)
      .catch(() => setDetail(null));

    return () => controller.abort();
  }, [show]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = dialogRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!show) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.querySelector(FOCUSABLE)?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, handleKeyDown]);

  if (!show) return null;

  const data = detail ?? show;
  const artwork = getPoster(data, "original");
  const rating = getRating(data);
  const runtime = formatRuntime(data.runtime ?? data.averageRuntime);
  const cast = data._embedded?.cast?.slice(0, 6) ?? [];
  const saved = has(show.id);

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#05060a]/80 px-4 py-6 backdrop-blur-sm"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-[780px] animate-rise overflow-hidden rounded-[18px] border border-line bg-panel shadow-modal"
      >
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-3.5 top-3.5 z-10 h-10 w-10 rounded-full border border-line bg-ink/80 text-paper transition-colors hover:border-rose hover:bg-rose"
        >
          ✕
        </button>

        <div className="h-[220px] bg-panel2 sm:h-[300px]">
          {artwork ? (
            <img
              src={artwork}
              alt={`Artwork for ${data.name}`}
              className="h-full w-full object-cover object-[center_18%]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted">
              No artwork available
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6">
          <h2
            id="modal-title"
            className="mb-4 font-display text-2xl tracking-tight sm:text-3xl"
          >
            {data.name}
          </h2>

          <dl className="mb-5 grid grid-cols-2 gap-3.5 border-b border-line pb-5 sm:grid-cols-3">
            <Meta term="Rating">
              ★ {rating !== null ? rating.toFixed(1) : "Not rated"}
            </Meta>
            <Meta term="Premiered">{formatDate(data.premiered)}</Meta>
            {runtime && <Meta term="Runtime">{runtime}</Meta>}
            {data.status && <Meta term="Status">{data.status}</Meta>}
            {(data.network?.name || data.webChannel?.name) && (
              <Meta term="Network">
                {data.network?.name ?? data.webChannel?.name}
              </Meta>
            )}
            {data.language && <Meta term="Language">{data.language}</Meta>}
          </dl>

          {data.genres?.length > 0 && (
            <ul className="mb-5 flex list-none flex-wrap gap-2 p-0">
              {data.genres.map((genre) => (
                <li
                  key={genre}
                  className="rounded-full bg-panel2 px-3 py-1 text-[0.82rem]"
                >
                  {genre}
                </li>
              ))}
            </ul>
          )}

          <h3 className="mb-1.5 font-display text-base">Overview</h3>
          <p className="mb-5 max-w-[70ch] text-muted">
            {stripHtml(data.summary) ||
              "No summary has been published for this title yet."}
          </p>

          {cast.length > 0 && (
            <>
              <h3 className="mb-1.5 font-display text-base">Cast</h3>
              <p className="mb-5 max-w-[70ch] text-muted">
                {cast.map((member) => member.person.name).join(", ")}
              </p>
            </>
          )}

          <div className="mt-5 flex flex-wrap justify-end gap-2.5 border-t border-line pt-5">
            <button
              onClick={() => toggle(show.id)}
              aria-pressed={saved}
              className="btn btn-ghost btn-auto max-sm:flex-1"
            >
              {saved ? "Remove from watchlist" : "Save to watchlist"}
            </button>

            {data.officialSite && (
              <a
                href={data.officialSite}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost btn-auto max-sm:flex-1"
              >
                Official site
              </a>
            )}

            <button className="btn btn-primary max-sm:flex-1" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
