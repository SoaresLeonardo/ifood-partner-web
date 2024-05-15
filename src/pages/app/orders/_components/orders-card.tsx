import { OrderProps } from "@/api/get-orders";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatusOrder } from "./status-order";
import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "@/api/get-order-details";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

export const OrderCard = (order: OrderProps) => {
  const { data: details, isLoading } = useQuery({
    queryFn: () => getOrderDetails({ orderId: order.orderId }),
    queryKey: ["order", "details", order.orderId],
  });

  console.log(details);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{order.customerName}</h3>

          <StatusOrder status={order.status} />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2 text-sm">
          {isLoading && (
            <>
              {Array.from({ length: 3 }).map((_, i) => {
                return (
                  <div className="flex items-center justify-between" key={i}>
                    <Skeleton className="h-4 w-[210px]" />
                    <Skeleton className="h-4 w-[80px]" />
                  </div>
                );
              })}
            </>
          )}
          {details?.orderItems.map((orderItem) => (
            <div
              className="flex items-center justify-between"
              key={orderItem.id}
            >
              <span>{orderItem.product.name}</span>
              <span>
                {(orderItem.priceInCents / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex items-center justify-between font-medium">
          <span>Total</span>
          <span>
            {(order.total / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {formatDistanceToNow(new Date(order.createdAt!), {
            locale: ptBR,
            addSuffix: true,
          })}
        </div>
        <Button size="sm" variant="outline">
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};
