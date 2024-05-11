import { GetEvaluationsResponse } from "@/interfaces/get-comments";
import { api } from "@/lib/axios";

type GetEvaluationsProps = {
  params: {
    pageIndex: number;
  };
};

export async function getEvaluations({ params }: GetEvaluationsProps) {
  const response = await api.get<GetEvaluationsResponse>("/evaluations", {
    params: params,
  });
  return response.data;
}
