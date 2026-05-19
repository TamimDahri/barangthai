export default function CartLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-48 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-56 bg-gray-200 rounded-2xl" />
          <div className="h-56 bg-gray-200 rounded-2xl" />
        </div>
        <div className="space-y-4">
          <div className="h-32 bg-gray-200 rounded-2xl" />
          <div className="h-52 bg-gray-200 rounded-2xl" />
          <div className="h-52 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
