import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

const CAPABILITIES = [
  {
    title: "Search as you type",
    body: "Results are debounced and cached, so the grid keeps up without hammering the API.",
  },
  {
    title: "Filter and sort",
    body: "Narrow the catalogue by genre, then order it by rating, release year or title.",
  },
  {
    title: "Keep a watchlist",
    body: "Save anything you want to come back to. It stays on your device between visits.",
  },
];

export default function Home() {
  useDocumentTitle("Discover movies and shows");

  return (
    <>
      <section className="border-b border-line bg-panel bg-[radial-gradient(120%_90%_at_50%_-25%,rgba(242,193,78,0.22),transparent_62%),radial-gradient(90%_70%_at_88%_115%,rgba(224,95,122,0.2),transparent_60%)]">
        <div className="container-wrap max-w-[760px] py-20 text-center sm:py-24">
          <p className="mb-3.5 text-sm font-semibold text-gold">
            Powered by the TVMaze database
          </p>

          <h1 className="mb-4 font-display text-[clamp(2.6rem,8vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
            Discover movies
          </h1>

          <p className="mx-auto mb-8 max-w-[56ch] text-[1.08rem] text-muted">
            Search thousands of titles, compare ratings, and open any card for the
            full story — cast, genres, network and release date.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/movies" className="btn btn-primary btn-lg">
              Explore now
            </Link>
            <Link to="/watchlist" className="btn btn-ghost btn-lg btn-auto">
              View watchlist
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-label="What you can do here"
        className="container-wrap grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:py-20"
      >
        {CAPABILITIES.map((item) => (
          <div key={item.title}>
            <h2 className="mb-2 border-t-2 border-gold pt-3.5 font-display text-[1.15rem]">
              {item.title}
            </h2>
            <p className="max-w-[42ch] text-muted">{item.body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
