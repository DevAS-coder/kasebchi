export default function CategoryLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Skeleton for Category Header */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
        <div className="h-4 w-full max-w-2xl bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Skeleton for Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="w-full md:w-64 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="w-full md:w-48 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Skeleton for Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-square bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 