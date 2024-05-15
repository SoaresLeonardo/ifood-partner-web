import { OrderProps } from "@/api/get-orders";
import { OrderCard } from "./orders-card";

type OrdersListProps = {
  orders: OrderProps[];
};

export const OrdersList = ({ orders }: OrdersListProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {orders.map((order) => (
        <OrderCard {...order} key={order.orderId} />
      ))}
    </div>
  );
};
