'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-6 text-center space-y-4">
      <p className="text-red-600 font-semibold">
        {error.message || "Something went wrong"}
      </p>

      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white"
      >
        Try again
      </button>
    </div>
  );
}
