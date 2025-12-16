import React from 'react';

export default function Loading() {
  return (
    <div className="h-screen  gap-5 bg-blue-50 p-6 space-y-6">
<div className="w-full  bg-white px-6 py-5 rounded-md"></div>
    <div className="flex items-center gap-4 bg-blue-100 px-6 py-5 rounded-md">
  {/* Back button */}
  <div className="h-10 w-10 rounded-md bg-white/30 animate-pulse" />
  {/* Icon */}
  <div className="h-8 w-8 rounded bg-white/30 animate-pulse" />
  {/* Title */}
  <div className="h-6 w-32 rounded bg-white/30 animate-pulse" />
</div>


      {/* Questions Skeleton */}
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-6 shadow-sm space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg bg-blue-50 p-4 animate-pulse"
          >
            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-blue-200"></div>
              <div className="h-3 w-24 rounded bg-blue-200"></div>
            </div>

            <div className="h-3 w-28 rounded bg-blue-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
