export default function SearchBar({ value, onChange, resultCount, busy }) {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2.5 rounded-full border border-line bg-panel py-1.5 pl-4.5 pr-2 transition-colors focus-within:border-gold">
        <span aria-hidden="true" className="opacity-70">🔍</span>

        <input
          id="movie-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search for a movie or show..."
          autoComplete="off"
          aria-label="Search titles by name"
          aria-describedby="search-status"
          className="min-w-0 flex-1 border-0 bg-transparent py-3 text-paper outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
        />

        {value && (
          <button
            onClick={() => onChange("")}
            aria-label="Clear the search field"
            className="rounded-full bg-panel2 px-4 py-2.5 text-muted transition-colors hover:text-paper"
          >
            Clear
          </button>
        )}
      </div>

      <p id="search-status" role="status" className="mt-2 min-h-[1.2em] px-1 text-[0.88rem] text-muted">
        {busy
          ? "Searching…"
          : resultCount === null
            ? ""
            : `${resultCount} ${resultCount === 1 ? "title" : "titles"}`}
      </p>
    </div>
  );
}
