export default function Loading() {
  return (
  <>
    <div className="w-full  bg-white px-6 py-5 rounded-md"></div>
    <div className="flex items-center gap-4 bg-blue-100 px-6 py-5 rounded-md">
  {/* Back button */}
  <div className="h-10 w-10 rounded-md bg-white/30 animate-pulse" />
  {/* Icon */}
  <div className="h-8 w-8 rounded bg-white/30 animate-pulse" />
  {/* Title */}
  <div className="h-6 w-32 rounded bg-white/30 animate-pulse" />
</div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="w-[363px] h-[448px] bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  </>
  );
}
