# 🎬 MovieExplorer

A responsive movie and TV show discovery app built with React, Tailwind CSS and Vite, using the public [TVMaze API](https://www.tvmaze.com/api). Search the catalogue, filter by genre, sort by rating or year, open any title for full details, and keep a personal watchlist that survives a refresh.

**Live demo:** _add your deployment URL here_

---

## Features

| Area | What it does |
|---|---|
| Home | Hero banner with CTA, capability summary, sticky navbar, multi-column footer |
| Browse | Debounced title search, genre filter, four sort orders, "load more" paging |
| Details | Modal with artwork, summary, rating, premiere date, runtime, network, genres and top-billed cast |
| Watchlist | Save any title; persisted in `localStorage` and synced across open tabs |
| Resilience | Retry with backoff on 5xx, request cancellation, cached responses, skeleton loaders, error boundary, 404 route |
| Accessibility | Skip link, focus trap in the modal, `aria-pressed` toggles, visible focus rings, `prefers-reduced-motion` respected |

---

## Engineering notes

A few decisions worth calling out, since they are the difference between a demo and something maintainable:

**Every request is abortable.** `useShows` creates an `AbortController` per effect run. Without it, a slow search for `"bat"` can resolve *after* a fast search for `"batman"` and overwrite the newer results — a race that only shows up on bad networks, which is exactly where users are.

**The transport layer is isolated.** `src/lib/api.js` is the only file that knows the base URL, retry policy or cache. Swapping TVMaze for TMDB means editing one module, not hunting through components.

**Responses are cached with a TTL.** Typing, backspacing and retyping the same query is the common case; an in-memory `Map` with a 5-minute TTL makes the repeat free.

**Display logic is pure.** `src/lib/shows.js` holds formatting, filtering and sorting as plain functions with no React dependency, so they are trivial to unit test.

**Routes are code-split.** The landing page does not pay for the catalogue or watchlist bundles. Vendor chunks are split in `vite.config.js` so a release that touches only app code leaves the cached React chunk alone.

**Search state lives in the URL.** `?q=batman` is bookmarkable, shareable, and survives a refresh.

---

## Tech stack

React 18 · React Router 6 · Tailwind CSS 3 · Vite 5 · ESLint · GitHub Actions

The design system lives in `tailwind.config.js` (`theme.extend`): brand colours, fonts and animations are named tokens, so `bg-panel` or `text-gold` means the same thing everywhere. Repeated patterns (`.btn`, `.card-surface`, `.skeleton`) sit in `@layer components` inside `src/index.css`; everything else is inline utilities.

---

## API reference

| Purpose | Endpoint |
|---|---|
| Catalogue page | `GET https://api.tvmaze.com/shows?page=0` |
| Title search | `GET https://api.tvmaze.com/search/shows?q=:query` |
| Single title + cast | `GET https://api.tvmaze.com/shows/:id?embed=cast` |

No API key required.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # production bundle into dist/
npm run preview  # serve the production build locally
npm run lint     # ESLint, zero warnings allowed
```

Optional: set `VITE_API_BASE_URL` in a `.env` file to point at a different backend or a local mock.

---

## Project structure

```
src/
├── components/
│   ├── Navbar.jsx         sticky nav, mobile menu, watchlist count
│   ├── Footer.jsx
│   ├── SearchBar.jsx      controlled input with live result count
│   ├── FilterBar.jsx      genre + sort selects
│   ├── MovieCard.jsx      memoised card with save toggle
│   ├── MovieModal.jsx     accessible dialog, focus trap, lazy detail fetch
│   ├── SkeletonGrid.jsx   shimmer placeholders
│   ├── States.jsx         empty + error states
│   ├── ErrorBoundary.jsx
│   └── ScrollToTop.jsx
├── hooks/
│   ├── useShows.js           remote state: loading / success / error + retry
│   ├── useDebouncedValue.js
│   ├── useWatchlist.js       localStorage + cross-tab sync
│   └── useDocumentTitle.js
├── lib/
│   ├── api.js                fetch, retry, cache, abort
│   ├── shows.js              pure formatting, filtering, sorting
│   └── WatchlistContext.jsx
├── pages/                    Home, Movies, Watchlist, NotFound
├── App.jsx                   routes + suspense boundaries
└── index.css                 Tailwind directives + shared component classes
```

---

## Deployment

Either host works with zero configuration; the SPA rewrite rules are already committed (`vercel.json`, `netlify.toml`, `public/_redirects`) so deep links like `/watchlist` do not 404 on refresh.

1. Push the repository to GitHub.
2. Import it at [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com).
3. Vite is auto-detected — build command `npm run build`, output directory `dist`.

---

## Possible next steps

- Swap the hand-rolled cache for TanStack Query
- Server-side pagination across all TVMaze catalogue pages
- Vitest + Testing Library coverage for `lib/shows.js` and the modal
- A light theme driven by `prefers-color-scheme`

---

## License

MIT
