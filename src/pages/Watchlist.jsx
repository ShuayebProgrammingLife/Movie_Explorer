import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";
import MovieModal from "../components/MovieModal.jsx";
import SkeletonGrid from "../components/SkeletonGrid.jsx";
import { EmptyState, ErrorState } from "../components/States.jsx";
import { fetchShowById } from "../lib/api.js";
import useWatchlistContext from "../lib/useWatchlistContext.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

const GRID =
  "grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export default function Watchlist() {
  const { ids } = useWatchlistContext();
  const [shows, setShows] = useState([]);
  const [status, setStatus] = useState("loading");
  const [selected, setSelected] = useState(null);

  useDocumentTitle("Your watchlist");

  useEffect(() => {
    if (ids.length === 0) {
      setShows([]);
      setStatus("success");
      return undefined;
    }

    const controller = new AbortController();
    setStatus("loading");

    Promise.all(
      ids.map((id) =>
        fetchShowById(id, { signal: controller.signal }).catch(() => null),
      ),
    )
      .then((results) => {
        setShows(results.filter(Boolean));
        setStatus("success");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setStatus("error");
      });

    return () => controller.abort();
  }, [ids.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="container-wrap pb-20 pt-11">
      <header className="mb-7">
        <h1 className="mb-1.5 font-display text-[clamp(1.6rem,4vw,2.3rem)] tracking-[-0.03em]">
          Your watchlist
        </h1>
        <p className="text-muted">
          Saved on this device. Clearing your browser data will clear this list.
        </p>
      </header>

      {status === "loading" && <SkeletonGrid count={4} />}

      {status === "error" && (
        <ErrorState message="Your saved titles could not be loaded right now." />
      )}

      {status === "success" && shows.length === 0 && (
        <EmptyState
          title="Nothing saved yet"
          description="Tap the heart on any card to keep it here for later."
          action={
            <Link to="/movies" className="btn btn-primary">
              Browse titles
            </Link>
          }
        />
      )}

      {status === "success" && shows.length > 0 && (
        <div className={GRID}>
          {shows.map((show) => (
            <MovieCard key={show.id} show={show} onSelect={setSelected} />
          ))}
        </div>
      )}

      <MovieModal show={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
