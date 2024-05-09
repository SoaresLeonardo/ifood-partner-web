import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaceIcon } from "@radix-ui/react-icons";
import { Comments } from "./comments";

export const CommentsListCard = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FaceIcon width={20} height={20} className="mr-2" />
          Avaliações
        </CardTitle>
        <CardDescription>Avaliações recentes do restaurante</CardDescription>
      </CardHeader>
      <Comments />
    </Card>
  );
};
