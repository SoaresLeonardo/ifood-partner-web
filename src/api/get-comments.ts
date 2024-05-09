import { GetCommentsResponse } from "@/interfaces/get-comments";
import { api } from "@/lib/axios";

type GetCommentsProps = {
  pageIndex?: number;
};

export async function getComments({ pageIndex = 0 }: GetCommentsProps) {
  const response = await api.get<GetCommentsResponse[]>("/evaluations", {
    params: { pageIndex },
  });
  return response.data;
}
