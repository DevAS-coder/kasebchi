
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ProductCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-5 w-3/4 mb-3" />
        <Skeleton className="h-4 w-1/2 mb-2" />
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4 rounded-full" />
      </CardFooter>
    </Card>
  );
};

export default ProductCardSkeleton;
