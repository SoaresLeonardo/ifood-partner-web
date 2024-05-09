import { UpdateProfileRestaurant } from "@/interfaces/update-profile-restaurant";
import { api } from "@/lib/axios";

export async function updateProfileRestaurant(data: UpdateProfileRestaurant) {
  await api.put("/update-profile-restaurant", data);
}
