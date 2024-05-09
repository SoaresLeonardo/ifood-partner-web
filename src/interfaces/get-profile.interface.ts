export interface GetProfileResponse {
  name: string;
  id: string;
  email: string;
  phone: string;
  role: "manager" | "customer";
  createdAt: Date | null;
  updatedAt: Date | null;
}
