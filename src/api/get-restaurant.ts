import { GetRestaurant } from "@/interfaces/get-restaurant.interface";
import { api } from "@/lib/axios";

export async function getRestaurant() {
  const response = await api.get<GetRestaurant>("/managed-restaurant");
  return response.data;
}
