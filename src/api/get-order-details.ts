import { api } from "@/lib/axios";
import { OrderStatus } from "./get-orders";

type GetEvaluationsProps = {
  orderId: string;
};

type CustomerProps = {
  name: string;
  phone: number;
  email: string;
};

type ProductProps = {
  name: string;
};

type OrderItemsProps = {
  id: string;
  priceInCents: number;
  quantity: number;
  product: ProductProps;
};

type GetOrdersResponse = {
  id: string;
  createdAt: Date | null;
  status: OrderStatus;
  totalInCents: number;
  customer: CustomerProps;
  orderItems: OrderItemsProps[];
};

export async function getOrderDetails({ orderId }: GetEvaluationsProps) {
  const response = await api.get<GetOrdersResponse>(`/order/${orderId}`);
  return response.data;
}
