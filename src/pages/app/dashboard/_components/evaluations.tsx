import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { StarRate } from "./start-rate";
import { CommentsSkeleton } from "./comments-list-skeleton";
import { getEvaluations } from "@/api/get-evaluations";

export const Evaluations = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => getEvaluations({ params: { pageIndex: 0 } }),
    queryKey: ["evaluations", "list"],
  });

  return (
    <CardContent>
      {isLoading && <CommentsSkeleton />}
      {!isLoading && (
        <ScrollArea className="h-96 w-full pr-4 border-t">
          <div className="flex flex-col pt-5">
            {data?.evaluations?.map((evaluation) => (
              <Card
                className="border-none"
                key={`${evaluation.evaluationId} ${evaluation.comment} ${evaluation.rate}`}
              >
                <CardContent className="flex gap-4 items-center relative">
                  <Avatar>
                    <AvatarFallback>
                      {evaluation.customerName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-start gap-2">
                    <CardTitle>{evaluation.customerName}</CardTitle>
                    <CardDescription>{evaluation.comment}</CardDescription>
                  </div>
                  <StarRate rating={evaluation.rate} />
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </CardContent>
  );
};
