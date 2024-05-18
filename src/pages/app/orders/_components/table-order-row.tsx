import { TableCell, TableRow } from "@/components/ui/table";
import { StatusOrder } from "./status-order";
import { formatDistanceToNow } from "date-fns";
import { totalPriceFn } from "@/lib/total-price-function";
import { UpdateOrderDetails } from "./update-order-details";
import { Button } from "@/components/ui/button";
import { OrderProps } from "@/api/get-orders";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import { ToastAction } from "@/components/ui/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";

export const TableOrderRow = (order: OrderProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync: cancelOrderFn, isPending: isCanceledOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onError: () => {
        toast({
          title: "Ops! Ouve um erro",
          description: "Parece que ouve um erro ao tentar cancelar o pedido",
          variant: "destructive",
          action: (
            <ToastAction
              altText="Tentar novamente"
              onClick={() => cancelOrderFn({ orderId: order.orderId })}
            >
              Tentar novamente
            </ToastAction>
          ),
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["order", "list", "page"] });
        toast({
          title: "Pedido cancelado",
          description: "O pedido foi cancelado com sucesso",
        });
      },
    });

  return (
    <TableRow>
      <TableCell className="font-medium">{order.orderId}</TableCell>
      <TableCell className="font-medium text-muted-foreground">
        {formatDistanceToNow(new Date(order.createdAt as Date), {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <StatusOrder status={order.status} />
      </TableCell>
      <TableCell>{order.customerName}</TableCell>
      <TableCell className="text-right">{totalPriceFn(order.total)}</TableCell>

      <TableCell>
        <UpdateOrderDetails
          orderId={order.orderId}
          disabledFn={order.status === "canceled"}
        />
      </TableCell>
      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              disabled={isCanceledOrder || order.status === "canceled"}
              className="gap-2"
            >
              <Cross1Icon />
              Cancelar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja cancelar o pedido?</AlertDialogTitle>
              <AlertDialogDescription>
                O pedido será cancelado e não poderá ser reaberto.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Fechar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => cancelOrderFn({ orderId: order.orderId })}
              >
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};
