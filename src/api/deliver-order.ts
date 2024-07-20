import { api } from "@/lib/axios";

type DeliverOrderProps = {
  orderId: string;
};

export async function deliverOrder({ orderId }: DeliverOrderProps) {
  await api.patch(`/orders/${orderId}/deliver`);
}
