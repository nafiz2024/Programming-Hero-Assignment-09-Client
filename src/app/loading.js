import LoadingSpinner from "@/component/LoadingSpinner";

export default function Loading() {
  return (
    <main className="min-h-[60vh] px-4 py-10">
      <LoadingSpinner label="Loading, please wait..." />
    </main>
  );
}
