import { OrderStatus } from "@/api/get-orders";
import { Badge } from "@/components/ui/badge";

interface StatusOrderProps {
  status: OrderStatus;
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  processing: "Em preparo",
  delivering: "Em entrega",
  delivered: "Entregue",
};

export const StatusOrder = ({ status }: StatusOrderProps) => {
  return (
    <div className="flex items-center gap-3">
      {["pending"].includes(status) && (
        <Badge className="bg-slate-400 pointer-events-none">
          {orderStatusMap[status]}
        </Badge>
      )}
      {["processing", "delivering"].includes(status) && (
        <Badge className="bg-amber-500 pointer-events-none">
          {orderStatusMap[status]}
        </Badge>
      )}
      {["delivered"].includes(status) && (
        <Badge className="bg-emerald-500 pointer-events-none">
          {orderStatusMap[status]}
        </Badge>
      )}
      {["canceled"].includes(status) && (
        <Badge variant="destructive">{orderStatusMap[status]}</Badge>
      )}
    </div>
  );
};
