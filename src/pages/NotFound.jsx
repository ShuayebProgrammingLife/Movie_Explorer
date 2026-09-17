import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

export default function NotFound() {
  useDocumentTitle("Page not found");

  return (
    <section className="container-wrap py-20 text-center">
      <h1 className="mb-2 font-display text-2xl">That page does not exist</h1>
      <p className="mx-auto mb-5 max-w-[46ch] text-muted">
        The link may be out of date. Everything is still one click away.
      </p>
      <Link to="/movies" className="btn btn-primary">
        Browse titles
      </Link>
    </section>
  );
}
