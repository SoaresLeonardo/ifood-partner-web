import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export const CommentsSkeleton = () => {
  return (
    <>
      <ScrollArea className="h-96 w-full pr-4 border-t">
        <div className="flex flex-col pt-5">
          {Array.from({ length: 10 }).map((_, i) => {
            return (
              <div
                className="flex items-center relative p-6 pt-0 space-x-4"
                key={i}
              >
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[270px]" />
                  <Skeleton className="h-3 w-[200px]" />
                </div>
                <Skeleton className="h-3 w-[90px] absolute right-3" />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
};
