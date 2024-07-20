import { approveOrder } from "@/api/approve-order";
import { getOrderDetails } from "@/api/get-order-details";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { totalPriceFn } from "@/lib/total-price-function";
import { CheckIcon, Pencil1Icon, UpdateIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { UpdateOrderDetailsSkeleton } from "./update-order-details-skeleton";
import { GetOrdersResponse, OrderProps, OrderStatus } from "@/api/get-orders";
import { useToast } from "@/components/ui/use-toast";
import { dispatchOrder } from "@/api/dispatch-order";
import { ToastAction } from "@/components/ui/toast";
import { deliverOrder } from "@/api/deliver-order";

type UpdateOrderDetailsProps = {
  orderId: string;
  disabledFn: boolean;
};

export const UpdateOrderDetails = ({
  orderId,
  disabledFn,
}: UpdateOrderDetailsProps) => {
  const [open, setIsOpen] = useState(false);
  const { toast } = useToast();

  const { data: order, isLoading } = useQuery({
    queryFn: () => getOrderDetails({ orderId }),
    queryKey: ["order", "details", orderId],
    staleTime: 1000 * 60 * 15,
    enabled: open,
  });

  const queryClient = useQueryClient();

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListingCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["order", "list", "page"],
    });

    ordersListingCache.forEach(([cacheKey, cached]) => {
      if (!cached) {
        return;
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cached,
        orders: cached.orders.map((order) => {
          if (order.orderId !== orderId) {
            return order;
          }

          return {
            ...order,
            status,
          };
        }),
      });
    });

    queryClient.setQueryData(
      ["order", "details", orderId],
      (cachedOrder: OrderProps) =>
        cachedOrder
          ? {
              ...cachedOrder,
              status,
            }
          : cachedOrder
    );

    toast({
      title: "Pedido atualizado",
      description: "O pedido foi atualizado com sucesso",
    });
  }

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess: async (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, "processing");
        // queryClient.invalidateQueries({ queryKey: ["order", "details", "page"] });
        setIsOpen(false);
      },
      onError: () => {
        toast({
          title: "Ops! Ouve um erro",
          description: "Parece que ouve um erro ao tentar aprovar o pedido",
          variant: "destructive",
          action: (
            <ToastAction
              altText="Tentar novamente"
              onClick={() => approveOrder({ orderId })}
            >
              Tentar novamente
            </ToastAction>
          ),
        });
      },
    });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess: async (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, "delivering");
        setIsOpen(false);
      },
      onError: () => {
        toast({
          title: "Ops! Ouve um erro",
          description: "Parece que ouve um erro ao tentar enviar o pedido",
          variant: "destructive",
          action: (
            <ToastAction
              altText="Tentar novamente"
              onClick={() => dispatchOrder({ orderId })}
            >
              Tentar novamente
            </ToastAction>
          ),
        });
      },
    });

  const { mutateAsync: deliverOrderFn, isPending: isDeliverOrder } = useMutation({
    mutationFn: deliverOrder,
    onSuccess: async (_, { orderId }) => {
      updateOrderStatusOnCache(orderId, "delivered");
      setIsOpen(false);
    },
  });
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={disabledFn} className="gap-2">
          <Pencil1Icon />
          Atualizar
        </Button>
      </DialogTrigger>

      <DialogContent>
        {isLoading && !order && <UpdateOrderDetailsSkeleton />}

        {!isLoading && order && (
          <div className="flex gap-4 flex-col">
            <DialogHeader>
              <DialogTitle>Atualizar pedido {order?.id}</DialogTitle>
              <DialogDescription>
                Atualize os status do pedido, veja as informações.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6">
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <h3 className="font-medium">Nome:</h3>
                <span>{order?.customer.name}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <h3 className="font-medium">Telefone:</h3>
                <span className="tracking-wider">{order?.customer.phone}</span>
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
                  {order?.orderItems.map((item) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{item.product.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{totalPriceFn(item.priceInCents)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between">
                <div className="font-medium">Total:</div>
                {order?.totalInCents && (
                  <div className="text-2xl font-bold">
                    {totalPriceFn(order?.totalInCents)}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Fechar</Button>
              </DialogClose>
              {order?.status === "pending" && (
                <Button
                  disabled={isApprovingOrder}
                  onClick={() => approveOrderFn({ orderId: order.id })}
                >
                  Aprovar
                  {isApprovingOrder ? (
                    <UpdateIcon className="ml-2 animate-spin" />
                  ) : (
                    <CheckIcon className="ml-2" />
                  )}
                </Button>
              )}

              {order?.status === "processing" && (
                <Button
                  disabled={isDispatchOrder}
                  onClick={() => dispatchOrderFn({ orderId: order.id })}
                >
                  Em entrega
                  {isDispatchOrder ? (
                    <UpdateIcon className="ml-2 animate-spin" />
                  ) : (
                    <CheckIcon className="ml-2" />
                  )}
                </Button>
              )}

              {order?.status === "delivering" && (
                <Button
                  disabled={isDeliverOrder}
                  onClick={() => deliverOrderFn({ orderId: order.id })}
                >
                  Entregado
                  {isDispatchOrder ? (
                    <UpdateIcon className="ml-2 animate-spin" />
                  ) : (
                    <CheckIcon className="ml-2" />
                  )}
                </Button>
              )}
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
