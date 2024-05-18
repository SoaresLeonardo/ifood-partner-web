import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const filterOrdersSchema = z.object({
  customerName: z.string().optional(),
  status: z.string().optional(),
  orderId: z.string().optional(),
});

type FilterOrdersSchema = z.infer<typeof filterOrdersSchema>;

export const FilterOrders = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const { register, handleSubmit, control, reset } = useForm<FilterOrdersSchema>(
    {
      resolver: zodResolver(filterOrdersSchema),
      defaultValues: {
        orderId: orderId ?? "",
        customerName: customerName ?? "",
        status: status ?? "all",
      },
    }
  );

  const filterOrders = (data: FilterOrdersSchema) => {
    setSearchParams((prev) => {
      if (data.orderId) {
        prev.set("orderId", data.orderId);
      } else {
        prev.delete("orderId");
      }

      if (data.customerName) {
        prev.set("customerName", data.customerName);
      } else {
        prev.delete("customerName");
      }

      if (data.status) {
        prev.set("status", data.status);
      } else {
        prev.delete("status");
      }

      prev.set("page", "1");

      return prev;
    });
  };

  const clearFilters = () => {
    setSearchParams((prev) => {
      prev.delete("orderId");
      prev.delete("customerName");
      prev.delete("status");
      prev.set("page", "1");

      return prev;
    });

    reset({
      orderId: "",
      customerName: "",
      status: "all",
    });
  };

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(filterOrders)}
    >
      <Input
        className="w-40 sm:w-60"
        placeholder="Buscar pedido por ID"
        {...register("orderId")}
      />
      <Input
        className="w-40 sm:w-60"
        placeholder="Buscar pedido por cliente"
        {...register("customerName")}
      />
      <Controller
        control={control}
        name="status"
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />

      <Button type="submit">Aplicar Filtros</Button>
      <Button variant="outline" onClick={clearFilters}>
        Limpar Filtros
      </Button>
    </form>
  );
};
