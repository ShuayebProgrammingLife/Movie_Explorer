import useWatchlist from "../hooks/useWatchlist.js";
import WatchlistContext from "./watchlistContext.js";

/** One shared watchlist for the whole tree, so the navbar badge, the cards and
 *  the modal all read and write the same source of truth. */
export function WatchlistProvider({ children }) {
  const watchlist = useWatchlist();
  return (
    <WatchlistContext.Provider value={watchlist}>
      {children}
    </WatchlistContext.Provider>
  );
}
