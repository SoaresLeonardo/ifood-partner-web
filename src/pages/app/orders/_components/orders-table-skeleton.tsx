import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";

export const OrdersListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-4 w-[172px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[162px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[72px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[272px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[72px]" />
            </TableCell>

            <TableCell>
              <Button disabled variant="outline" className="gap-2">
                <Pencil1Icon />
                Atualizar
              </Button>
            </TableCell>
            <TableCell>
              <Button variant="ghost" disabled className="gap-2">
                <Cross1Icon />
                Cancelar
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};
