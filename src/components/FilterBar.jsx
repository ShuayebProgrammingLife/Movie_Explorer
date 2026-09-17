import { SORTS } from "../lib/shows.js";

const fieldClass =
  "flex items-center gap-2.5 rounded-full border border-line bg-panel py-1.5 pl-4 pr-2";
const selectClass =
  "min-h-[36px] cursor-pointer rounded-full border-0 bg-panel2 px-2.5 py-1.5 text-paper outline-none";

export default function FilterBar({ genres, genre, onGenreChange, sort, onSortChange }) {
  return (
    <div className="mt-3.5 flex flex-wrap gap-3.5">
      <label className={fieldClass}>
        <span className="text-[0.88rem] text-muted">Genre</span>
        <select
          value={genre}
          onChange={(event) => onGenreChange(event.target.value)}
          className={selectClass}
        >
          <option value="all">All genres</option>
          {genres.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </label>

      <label className={fieldClass}>
        <span className="text-[0.88rem] text-muted">Sort</span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className={selectClass}
        >
          {Object.entries(SORTS).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
