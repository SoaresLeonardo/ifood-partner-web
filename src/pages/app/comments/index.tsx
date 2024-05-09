import { getComments } from "@/api/get-comments";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";

function Comments() {
  const { data: comments } = useQuery({
    queryFn: () => getComments({ pageIndex: 0 }),
    queryKey: ["comment", "list", "page"],
  });

  console.log(comments)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Comentários</h2>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 pr-4 py-2"
              placeholder="Buscar por pessoa"
              type="text"
            />
          </div>
          <div className="relative">
            <ReplyIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 pr-4"
              placeholder="Filtrar por comentário"
              type="text"
            />
          </div>
          <Button>Filtrar comentário</Button>
        </div>
        {/* {comments && comments?.length > 0 && (
          <PaginationComponent
            onPageChange={handlePaginate}
            totalCount={}
          />
        )} */}
      </div>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Avatar className="shrink-0">
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">John Doe</h3>
              <time className="text-sm text-gray-500 dark:text-gray-400">
                2 days ago
              </time>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              This is a great product! I've been using it for a week and it's
              been a game-changer.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="shrink-0">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Jane Doe</h3>
              <time className="text-sm text-gray-500 dark:text-gray-400">
                1 week ago
              </time>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              I love the design and functionality of this product. It's a
              must-have for anyone looking to improve their productivity.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="shrink-0">
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Alice Smith</h3>
              <time className="text-sm text-gray-500 dark:text-gray-400">
                3 weeks ago
              </time>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              I was hesitant at first, but after trying this product, I'm
              completely sold. It's a game-changer!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReplyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default Comments;
