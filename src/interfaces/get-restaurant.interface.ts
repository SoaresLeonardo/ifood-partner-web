export interface GetRestaurant {
  id: string;
  name: string;
  description: string;
  managerId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
