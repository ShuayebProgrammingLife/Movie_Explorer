export default function SkeletonGrid({ count = 12 }) {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="card-surface overflow-hidden">
          <div className="skeleton aspect-[2/3] rounded-none" />
          <div className="flex flex-col gap-2 p-4">
            <div className="skeleton h-3.5" />
            <div className="skeleton h-3.5 w-[55%]" />
            <div className="skeleton mt-1.5 h-11 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
