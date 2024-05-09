import { getComments } from "@/api/get-comments";
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

export const Comments = () => {
  const { data: comments, isLoading } = useQuery({
    queryFn: getComments,
    queryKey: ["comment", "list"],
  });

  return (
    <CardContent>
      {isLoading && <CommentsSkeleton />}
      {!isLoading && (
        <ScrollArea className="h-96 w-full pr-4 border-t">
          <div className="flex flex-col pt-5">
            {comments?.map((comment) => (
              <Card
                className="border-none"
                key={`${comment.id} ${comment.comment} ${comment.rate}`}
              >
                <CardContent className="flex gap-4 items-center relative">
                  <Avatar>
                    <AvatarFallback>
                      {comment.customer.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-start gap-2">
                    <CardTitle>{comment.customer.name}</CardTitle>
                    <CardDescription>{comment.comment}</CardDescription>
                  </div>
                  <StarRate rating={comment.rate} />
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </CardContent>
  );
};
