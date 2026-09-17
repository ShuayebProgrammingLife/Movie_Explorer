import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import FilterBar from "../components/FilterBar.jsx";
import MovieCard from "../components/MovieCard.jsx";
import MovieModal from "../components/MovieModal.jsx";
import SkeletonGrid from "../components/SkeletonGrid.jsx";
import { EmptyState, ErrorState } from "../components/States.jsx";
import useShows from "../hooks/useShows.js";
import useDebouncedValue from "../hooks/useDebouncedValue.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { applyFilters, collectGenres } from "../lib/shows.js";

const PAGE_SIZE = 24;
const GRID = "grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export default function Movies() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(() => params.get("q") ?? "");
  const [genre, setGenre] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState(null);

  const debouncedQuery = useDebouncedValue(query, 400);
  const { shows, status, error, retry } = useShows(debouncedQuery);

  useDocumentTitle(debouncedQuery ? `Results for “${debouncedQuery}”` : "Browse titles");

  useEffect(() => {
    setParams(debouncedQuery ? { q: debouncedQuery } : {}, { replace: true });
  }, [debouncedQuery, setParams]);

  const genres = useMemo(() => collectGenres(shows), [shows]);
  const filtered = useMemo(
    () => applyFilters(shows, { genre, sort }),
    [shows, genre, sort]
  );

  useEffect(() => setVisible(PAGE_SIZE), [debouncedQuery, genre, sort]);

  useEffect(() => {
    if (genre !== "all" && !genres.includes(genre)) setGenre("all");
  }, [genres, genre]);

  const isLoading = status === "loading";
  const page = filtered.slice(0, visible);

  return (
    <section className="container-wrap pb-20 pt-11">
      <header className="mb-7">
        <h1 className="mb-1.5 font-display text-[clamp(1.6rem,4vw,2.3rem)] tracking-[-0.03em]">
          {debouncedQuery ? `Results for “${debouncedQuery}”` : "Browse all titles"}
        </h1>

        <SearchBar
          value={query}
          onChange={setQuery}
          busy={isLoading}
          resultCount={isLoading ? null : filtered.length}
        />

        {!isLoading && shows.length > 0 && (
          <FilterBar
            genres={genres}
            genre={genre}
            onGenreChange={setGenre}
            sort={sort}
            onSortChange={setSort}
          />
        )}
      </header>

      {isLoading && <SkeletonGrid />}

      {status === "error" && <ErrorState message={error?.message} onRetry={retry} />}

      {status === "success" && filtered.length === 0 && (
        <EmptyState
          title="No titles matched"
          description={
            debouncedQuery
              ? "Try a shorter or differently spelled search, such as “girls”."
              : "Adjust the genre filter to see more titles."
          }
          action={
            <button
              className="btn btn-primary"
              onClick={() => {
                setQuery("");
                setGenre("all");
              }}
            >
              Reset filters
            </button>
          }
        />
      )}

      {status === "success" && filtered.length > 0 && (
        <>
          <div className={GRID}>
            {page.map((show) => (
              <MovieCard key={show.id} show={show} onSelect={setSelected} />
            ))}
          </div>

          {visible < filtered.length && (
            <div className="mt-10 text-center">
              <button
                className="btn btn-primary"
                onClick={() => setVisible((count) => count + PAGE_SIZE)}
              >
                Load {Math.min(PAGE_SIZE, filtered.length - visible)} more
              </button>
              <p className="mt-3 text-[0.88rem] text-muted">
                Showing {page.length} of {filtered.length}
              </p>
            </div>
          )}
        </>
      )}

      <MovieModal show={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
