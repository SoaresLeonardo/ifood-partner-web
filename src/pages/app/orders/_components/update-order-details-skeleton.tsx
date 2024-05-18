import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateIcon } from "@radix-ui/react-icons";

export const UpdateOrderDetailsSkeleton = () => {
  return (
    <div className="flex gap-4 flex-col">
      <DialogHeader>
        <Skeleton className="h-4 w-[380px]" />
        <DialogDescription>
          Atualize os status do pedido, veja as informações.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-6">
        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
          <h3 className="font-medium">Nome:</h3>
          <Skeleton className="h-4 w-[272px]" />
        </div>
        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
          <h3 className="font-medium">Telefone:</h3>
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>

      <Separator />
      <div className="grid gap-4">
        <div className="font-medium">Detalhes do pedido</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Items</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 4 }).map((_, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-3 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-3 w-[62px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-3 w-[80px]" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between">
          <div className="font-medium">Total:</div>
          <div className="text-2xl font-bold">
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" disabled>
            Fechar
          </Button>
        </DialogClose>
        <Button variant="default" disabled>
          Aguarde
          <UpdateIcon className="ml-2 animate-spin" />
        </Button>
      </DialogFooter>
    </div>
  );
};
