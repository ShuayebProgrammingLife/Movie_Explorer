import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import SkeletonGrid from "./components/SkeletonGrid.jsx";
import Home from "./pages/Home.jsx";

// Route-level code splitting: the landing page does not download the
// catalogue or watchlist bundles until they are needed.
const Movies = lazy(() => import("./pages/Movies.jsx"));
const Watchlist = lazy(() => import("./pages/Watchlist.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />

      <main id="main" className="flex-1">
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="container-wrap pb-20 pt-11">
                <SkeletonGrid count={8} />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}
