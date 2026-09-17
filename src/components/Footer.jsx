import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="container-wrap grid gap-7 pb-8 pt-11 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-2 text-[0.92rem] text-muted">
          <p className="font-display text-lg font-bold text-paper">MovieExplorer</p>
          <p className="max-w-[34ch]">
            Title data and artwork come from the TVMaze public API.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2 text-[0.92rem] text-muted">
          <p className="font-semibold text-paper">Explore</p>
          <Link to="/movies" className="hover:text-gold">Browse titles</Link>
          <Link to="/watchlist" className="hover:text-gold">Your watchlist</Link>
        </nav>

        <div className="flex flex-col gap-2 text-[0.92rem] text-muted">
          <p className="font-semibold text-paper">Built with</p>
          <a href="https://www.tvmaze.com/api" target="_blank" rel="noreferrer" className="hover:text-gold">
            TVMaze API
          </a>
          <a href="https://github.com/ShuayebProgrammingLife" target="_blank" rel="noreferrer" className="hover:text-gold">
            GitHub
          </a>
        </div>
      </div>

      <div className="container-wrap flex flex-wrap justify-between gap-x-5 gap-y-2 border-t border-line pb-8 pt-4 text-[0.85rem] text-muted">
        <p>© 2026 MovieExplorer. All rights reserved.</p>
        <p>Made for learning, not affiliated with TVMaze.</p>
      </div>
    </footer>
  );
}
