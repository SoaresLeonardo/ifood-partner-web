import { api } from "@/lib/axios";

type ApproveOrderProps = {
  orderId: string;
};

export async function approveOrder({ orderId }: ApproveOrderProps) {
  await api.patch(`/orders/${orderId}/approve`);
}
