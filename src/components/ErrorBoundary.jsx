import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) console.error("Unhandled UI error", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div role="alert" className="container-wrap py-16 text-center">
        <h2 className="mb-2 font-display text-xl text-rose">
          This page stopped responding
        </h2>
        <p className="mx-auto mb-5 max-w-[46ch] text-muted">
          Reload the page to continue. If it keeps happening, clear your saved
          watchlist and try again.
        </p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Reload page
        </button>
      </div>
    );
  }
}
