import { createContext, useContext } from "react";
import useWatchlist from "../hooks/useWatchlist.js";

const WatchlistContext = createContext(null);

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

export function useWatchlistContext() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlistContext must be used inside <WatchlistProvider>");
  }
  return context;
}
