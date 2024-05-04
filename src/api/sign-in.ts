import { SignInRequest } from "@/interfaces/signIn.interface";
import { api } from "@/lib/axios";

export async function signIn(data: SignInRequest) {
  await api.post("/authenticate", data);
}
