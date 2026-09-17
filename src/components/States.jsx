export function EmptyState({ title, description, action }) {
  return (
    <div className="py-16 text-center">
      <h2 className="mb-2 font-display text-xl">{title}</h2>
      <p className="mx-auto mb-5 max-w-[46ch] text-muted">{description}</p>
      {action}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" className="py-16 text-center">
      <h2 className="mb-2 font-display text-xl text-rose">Something went wrong</h2>
      <p className="mx-auto mb-5 max-w-[46ch] text-muted">{message}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
