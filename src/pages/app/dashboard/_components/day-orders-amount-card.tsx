import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReaderIcon } from "@radix-ui/react-icons";

export const DayOrdersAmountCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Pedidos {" (dia)"}
        </CardTitle>
        <ReaderIcon className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+12,234</div>
        <p className="text-xs text-muted-foreground">+19% from last month</p>
      </CardContent>
    </Card>
  );
};
