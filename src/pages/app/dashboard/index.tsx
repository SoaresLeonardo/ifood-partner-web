import { DayOrdersAmountCard } from "./_components/day-orders-amount-card";
import { MounthCanceledOrdersCard } from "./_components/month-canceled-orders-card";
import { MounthOrdersAmountCard } from "./_components/month-orders-amount-card";
import { MounthReceiptCard } from "./_components/month-receipt-card";
import { ReceiptChart } from "./_components/receipt-chart";

export function Dashboard() {
  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <MounthReceiptCard />
        <MounthOrdersAmountCard />
        <DayOrdersAmountCard />
        <MounthCanceledOrdersCard />
      </div>

      <div className="grid grid-cols-9 gap-4">
        <ReceiptChart />
      </div>
    </div>
  );
}
