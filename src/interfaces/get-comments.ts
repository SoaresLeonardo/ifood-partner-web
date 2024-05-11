interface EvaluationProps {
  evaluationId: string;
  createdAt: Date | null;
  customerName: string;
  comment: string;
  rate: number;
}

export interface GetEvaluationsResponse {
  evaluations: EvaluationProps[];
  meta: {
    perPage: number;
    pageIndex: number;
    totalCount: number;
  };
}
