import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const OrdersListSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <Skeleton className="bg-transparent border" key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-[280px]" />

                <Skeleton className="h-4 w-[100px]" />
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2 text-sm">
                {Array.from({ length: 3 }).map((_, i) => {
                  return (
                    <div className="flex items-center justify-between" key={i}>
                      <Skeleton className="h-3 w-[210px]" />
                      <Skeleton className="h-3 w-[80px]" />
                    </div>
                  );
                })}
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <Skeleton className="h-4 w-[70px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="bg-transparent border w-[100px] h-[28px]" />
            </CardFooter>
          </Skeleton>
        );
      })}
    </div>
  );
};
