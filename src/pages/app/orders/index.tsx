import { CardDescription, CardTitle } from "@/components/ui/card";

import { FilterOrders } from "./_components/filters-orders";
import { OrdersList } from "./_components/orders-list";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";
import { OrdersListSkeleton } from "./_components/orders-list-skeleton";

function Orders() {
  const { data: orders, isLoading } = useQuery({
    queryFn: () => getOrders({ params: {} }),
    queryKey: ["order", "list", "page"],
  });
  console.log(orders);
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
          {!isLoading && orders?.orders.length !== 0 && <FilterOrders />}
        </div>
        {isLoading && <OrdersListSkeleton />}
        {orders && <OrdersList orders={orders.orders} />}
      </div>
    </div>
  );
}

export default Orders;
