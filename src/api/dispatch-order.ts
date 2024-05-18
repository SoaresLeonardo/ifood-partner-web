import { api } from "@/lib/axios";

type DispatchOrderProps = {
  orderId: string;
};

export async function dispatchOrder({ orderId }: DispatchOrderProps) {
  await api.patch(`/orders/${orderId}/dispatch`);
}
