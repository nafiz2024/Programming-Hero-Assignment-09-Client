"use client";

export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 py-8 text-slate-600">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-orange-200 border-t-orange-500" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
