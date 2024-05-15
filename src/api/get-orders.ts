import { api } from "@/lib/axios";

type GetOrderProps = {
  params?: {
    customerName: number;
    orderId: string;
    status: string;
  };
};

export type OrderProps = {
  orderId: string;
  createdAt: Date | null;
  status: OrderStatus;
  customerName: string;
  total: number;
};

export type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

type GetOrdersResponse = {
  orders: OrderProps[];
  meta: {
    totalCount: number;
  };
};

export async function getOrders({ params }: GetOrderProps) {
  const response = await api.get<GetOrdersResponse>("/orders", {
    params: params,
  });
  return response.data;
}
