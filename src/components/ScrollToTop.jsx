import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Browsers keep the old scroll position on client-side navigation. */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  return null;
}
