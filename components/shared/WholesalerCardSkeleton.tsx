
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const WholesalerCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="h-32 overflow-hidden relative">
        <Skeleton className="h-full w-full" />
      </div>
      
      <CardContent className="p-4 pt-12 relative">
        <div className="absolute -top-8 right-4 h-16 w-16 rounded-full bg-white p-1 shadow-md">
          <Skeleton className="h-full w-full rounded-full" />
        </div>
        
        <Skeleton className="h-5 w-3/4 mb-3" />
        
        <div className="flex flex-wrap gap-2 mt-3">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-4 w-14 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default WholesalerCardSkeleton;
