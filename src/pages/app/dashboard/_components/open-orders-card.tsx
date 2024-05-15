import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrdersList } from "./orders-list";

export const OpenOrdersCard = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center">Pedidos em aberto</CardTitle>
        <CardDescription>Todos os pedidos em aberto</CardDescription>
      </CardHeader>
      <OrdersList />
    </Card>
  );
};
