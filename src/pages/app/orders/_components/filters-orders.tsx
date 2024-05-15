import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FilterOrders = () => {
  return (
    <form className="flex items-center gap-2">
      <Input className="w-40 sm:w-60" placeholder="Buscar pedido por cliente" />
      <Input className="w-40 sm:w-60" placeholder="Buscar pedido por ID" />
      <Select defaultValue="all">
        <SelectTrigger className="w-40 sm:w-60">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="preparing">Preparing</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
        </SelectContent>
      </Select>
      <Button>Aplicar Filtros</Button>
      <Button variant="outline">Limpar Filtros</Button>
    </form>
  );
};
