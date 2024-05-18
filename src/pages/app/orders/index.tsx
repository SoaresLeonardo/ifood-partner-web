import { CardDescription, CardTitle } from "@/components/ui/card";

import { FilterOrders } from "./_components/filters-orders";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";
import {
  CalendarIcon,
  MagnifyingGlassIcon,
  PersonIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchParams } from "react-router-dom";
import { TableOrderRow } from "./_components/table-order-row";
import { OrdersListSkeleton } from "./_components/orders-table-skeleton";

function Orders() {
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const { data: orders, isLoading } = useQuery({
    queryFn: () =>
      getOrders({
        params: {
          customerName,
          orderId,
          status: status === "all" ? null : status,
        },
      }),
    queryKey: ["order", "list", "page", customerName, orderId, status],
  });

  return (
    <div className="w-full py-12 md:py-24">
      <div className="grid gap-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8">
          <div className="grid gap-1">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Pedidos do restaurante
            </CardTitle>
            <CardDescription>
              Acompanhe os pedidos do restaurante por aqui!
            </CardDescription>
          </div>
          {!isLoading && <FilterOrders />}
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">
                  <span className="flex gap-2 items-center">
                    <MagnifyingGlassIcon />
                    Id do pedido
                  </span>
                </TableHead>
                <TableHead className="w-[180px]">
                  <span className="flex gap-2 items-center">
                    <CalendarIcon />
                    Realizado há
                  </span>
                </TableHead>
                <TableHead>
                  <span className="flex gap-2 items-center">
                    <Pencil1Icon />
                    Status
                  </span>
                </TableHead>
                <TableHead>
                  <span className="flex gap-2 items-center">
                    <PersonIcon />
                    Nome do cliente
                  </span>
                </TableHead>
                <TableHead className="text-right w-[140px]">R$ Total</TableHead>
                <TableHead className="w-[164px]"></TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && !orders && <OrdersListSkeleton />}

              {orders?.orders && orders.orders.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-10 text-center text-muted-foreground"
                  >
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
              {orders?.orders.map((order) => {
                return <TableOrderRow {...order} key={order.orderId} />;
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
