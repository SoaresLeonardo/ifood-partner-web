export interface CustomerProps {
    name: string;
    email: string;
    phone: string;
}


export interface GetCommentsResponse {
  id: string;
  customerId: string;
  restaurantId: string;
  rate: number
  comment: string
  createdAt: Date | null;
  updatedAt: Date | null;
  customer: CustomerProps
}
