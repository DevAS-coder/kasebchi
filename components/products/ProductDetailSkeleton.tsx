import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function ProductDetailSkeleton() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            <div className="space-y-4">
              <Skeleton className="aspect-square rounded-lg w-full h-96" />
              <div className="grid grid-cols-3 gap-2">
                <Skeleton className="aspect-square rounded-md w-full h-24" />
                <Skeleton className="aspect-square rounded-md w-full h-24" />
                <Skeleton className="aspect-square rounded-md w-full h-24" />
              </div>
            </div>
            <div>
              <Skeleton className="h-8 w-1/3 mb-2" />
              <Skeleton className="h-10 w-2/3 mb-6" />
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-6 w-1/4 mb-6" />
              <Separator className="my-6" />
              <Skeleton className="h-20 rounded-lg mb-6" />
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-12 rounded-md" />
                <Skeleton className="h-12 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 