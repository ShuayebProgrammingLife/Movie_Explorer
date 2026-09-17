import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useWatchlistContext } from "../lib/WatchlistContext.jsx";

const linkClass = ({ isActive }) =>
  [
    "inline-flex items-center gap-2 rounded-full px-3 py-2 font-medium transition-colors",
    isActive ? "text-paper" : "text-muted hover:text-paper",
  ].join(" ");

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useWatchlistContext();
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-md">
      <a
        href="#main"
        className="absolute left-[-9999px] top-2 z-50 rounded-full bg-gold px-4 py-2 text-gold-ink focus:left-5"
      >
        Skip to content
      </a>

      <div className="container-wrap flex h-[68px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2" aria-label="MovieExplorer home">
          <span className="text-xl" aria-hidden="true">🎬</span>
          <span className="font-display text-xl font-extrabold tracking-tight">
            MovieExplorer
          </span>
        </Link>

        <button
          className="rounded-full border border-lineStrong px-4 py-2 md:hidden"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav
          id="primary-nav"
          aria-label="Primary"
          className={[
            "absolute left-0 right-0 top-[68px] flex-col gap-1 border-b border-line bg-panel px-5 pb-5 pt-3",
            open ? "flex" : "hidden",
            "md:static md:flex md:flex-row md:items-center md:gap-1.5 md:border-0 md:bg-transparent md:p-0",
          ].join(" ")}
        >
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={linkClass}>
            Browse
          </NavLink>
          <NavLink to="/watchlist" className={linkClass}>
            Watchlist
            {count > 0 && (
              <span className="min-w-[20px] rounded-full bg-rose px-[7px] text-center text-xs font-semibold text-white">
                {count}
              </span>
            )}
          </NavLink>
          <Link to="/movies" className="btn btn-primary btn-sm mt-2 md:ml-2 md:mt-0">
            Movies
          </Link>
        </nav>
      </div>
    </header>
  );
}
