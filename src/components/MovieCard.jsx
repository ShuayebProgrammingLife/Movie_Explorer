import { memo } from "react";
import { getPoster, getRating, getYear } from "../lib/shows.js";
import useWatchlistContext from "../lib/useWatchlistContext.js";

function MovieCard({ show, onSelect }) {
  const { has, toggle } = useWatchlistContext();
  const poster = getPoster(show);
  const rating = getRating(show);
  const year = getYear(show);
  const saved = has(show.id);

  return (
    <article className="card-surface flex flex-col overflow-hidden transition-colors hover:border-lineStrong">
      <div className="relative aspect-[2/3] bg-panel2">
        {poster ? (
          <img
            src={poster}
            alt={`Poster for ${show.name}`}
            loading="lazy"
            decoding="async"
            width="210"
            height="295"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted">
            No poster available
          </div>
        )}

        {rating !== null && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-ink/85 px-3 py-1 text-[0.82rem] font-semibold text-gold">
            ★ {rating.toFixed(1)}
          </span>
        )}

        <button
          onClick={() => toggle(show.id)}
          aria-pressed={saved}
          title={saved ? "Remove from watchlist" : "Save to watchlist"}
          aria-label={
            saved
              ? `Remove ${show.name} from your watchlist`
              : `Save ${show.name} to your watchlist`
          }
          className={[
            "absolute right-2 top-2 h-10 w-10 rounded-full border bg-ink/80 text-lg leading-none transition-colors",
            saved
              ? "border-rose text-rose"
              : "border-line text-paper hover:border-rose hover:text-rose",
          ].join(" ")}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3
          title={show.name}
          className="line-clamp-2-title font-display text-[1.05rem] leading-tight"
        >
          {show.name}
        </h3>

        <p className="flex items-center gap-2 text-[0.88rem] text-muted">
          <span>★ {rating !== null ? rating.toFixed(1) : "Not rated"}</span>
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-current"
          />
          <span>{year ?? "Year unknown"}</span>
        </p>

        {show.genres?.length > 0 && (
          <p className="text-[0.82rem] text-muted/80">
            {show.genres.slice(0, 3).join(" · ")}
          </p>
        )}

        <button
          className="btn btn-ghost mt-auto"
          onClick={() => onSelect(show)}
        >
          See details
        </button>
      </div>
    </article>
  );
}

export default memo(MovieCard);
