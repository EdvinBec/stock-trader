import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const StockPageSkeleton = () => {
  return (
    <>
      <div className="w-full mt-4 flex justify-between">
        <Skeleton className="w-42 h-10" />
        <div className="flex gap-4">
          <Skeleton className="w-42 h-10" />
          <Skeleton className="w-12 h-10" />
        </div>
      </div>
      <div>
        <div className="flex gap-4 mt-8">
          <Skeleton className="w-20 h-12" />
          <Skeleton className="w-100 h-12" />
        </div>
        <Separator className="mt-4" />
        <div className="mt-4 flex gap-4 items-center">
          <Skeleton className="w-40 h-16" />
          <Skeleton className="w-42 h-10" />
        </div>
        <Skeleton className="w-86 h-6 mt-2" />
      </div>
      <div className="flex gap-12 w-full">
        <div className="w-full">
          <div>
            <div className="flex justify-between mt-8">
              <Skeleton className="w-40 h-6 mt-2" />
              <div className="flex gap-2">
                <Skeleton className="w-12 h-6 mt-2" />
                <Skeleton className="w-12 h-6 mt-2" />
                <Skeleton className="w-12 h-6 mt-2" />
              </div>
            </div>
          </div>
          <Skeleton className="w-full h-80 mt-4" />
        </div>
        <Skeleton className="w-1/3 h-80 mt-10" />
      </div>
    </>
  );
};

export default StockPageSkeleton;
