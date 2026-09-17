import { useContext } from "react";
import WatchlistContext from "./watchlistContext.js";

export default function useWatchlistContext() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlistContext must be used inside <WatchlistProvider>");
  }
  return context;
}