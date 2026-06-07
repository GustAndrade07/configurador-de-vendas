export default function LoadingSkeleton() {
  return (
    <div className="p-8 animate-pulse">
      <div className="h-8 w-64 rounded bg-zinc-200" />
      <div className="mt-3 h-4 w-80 rounded bg-zinc-200" />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-28 rounded-xl bg-zinc-200" />
        ))}
      </div>

      <div className="mt-8 h-64 rounded-xl bg-zinc-200" />
    </div>
  );
}