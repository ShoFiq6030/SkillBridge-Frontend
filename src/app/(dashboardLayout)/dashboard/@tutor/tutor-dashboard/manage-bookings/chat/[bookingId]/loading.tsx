export default function ChatLoading() {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-10">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 bg-muted rounded animate-pulse" />
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
      </div>
      <div className="h-96 bg-muted rounded animate-pulse" />
    </div>
  );
}
