import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProfile } from "../hooks/useProfile";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const RestaurantProfile = () => {
  const {
    restaurant: {
      loadingRestaurant,
      updateProfile: {
        handleSubmit,
        handleUpdateRestaurantProfile,
        isSubmitting,
        register,
        reset,
      },
    },
  } = useProfile();

  return (
    <DialogContent>
      <DialogHeader className="border-b pb-5">
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>Informações publicas da sua loja!</DialogDescription>
      </DialogHeader>
      <form
        className="grid gap-4 items-center py-4 w-full"
        onSubmit={handleSubmit(handleUpdateRestaurantProfile)}
      >
        <div className="flex flex-col items-start gap-3">
          <Label className="text-right" htmlFor="name">
            Nome
          </Label>
          <Input
            type="text"
            id="name"
            disabled={loadingRestaurant}
            {...register("name")}
          />
        </div>
        <div className="flex flex-col items-start gap-3">
          <Label className="text-right" htmlFor="description">
            Descrição
          </Label>
          <Textarea
            className="min-h-48"
            id="description"
            disabled={loadingRestaurant}
            {...register("description")}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" onClick={() => reset()}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
