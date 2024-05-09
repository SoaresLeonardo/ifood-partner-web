import { GetProfileResponse } from "@/interfaces/get-profile.interface";
import { api } from "@/lib/axios";

export async function getProfile() {
  const response = await api.get<GetProfileResponse>("/me");
  return response.data;
}
