import { getProfile } from "@/api/get-profile";
import { getRestaurant } from "@/api/get-restaurant";
import { updateProfileRestaurant } from "@/api/update-profile-restaurant";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { GetRestaurant } from "@/interfaces/get-restaurant.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const restaurantProfileSchema = z.object({
  name: z.string(),
  description: z.string(),
});
type RestaurantProfileSchema = z.infer<typeof restaurantProfileSchema>;

export function useProfile() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading: loadingProfile } = useQuery({
    queryKey: ["profile", "details"],
    queryFn: getProfile,
  });
  const profileFallbackName = profile?.name.charAt(0).toUpperCase();

  const { data: restaurant, isLoading: loadingRestaurant } = useQuery({
    queryKey: ["restaurant", "details"],
    queryFn: getRestaurant,
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<RestaurantProfileSchema>({
    resolver: zodResolver(restaurantProfileSchema),
    values: {
      name: restaurant?.name || "",
      description: restaurant?.description || "",
    },
  });

  function updateRestaurantDataOnCache({
    name,
    description,
  }: RestaurantProfileSchema) {
    //Buscar os dados do perfil da loja em cache
    const cached = queryClient.getQueryData<GetRestaurant>([
      "profile",
      "details",
    ]);

    if (cached) {
      queryClient.setQueryData<GetRestaurant>(["profile", "details"], {
        ...cached,
        name,
        description,
      });
    }

    return { cached };
  }

  const { mutateAsync: updateRestaurant } = useMutation({
    mutationFn: updateProfileRestaurant,
    onMutate: ({ name, description }) => {
      const { cached } = updateRestaurantDataOnCache({
        name,
        description,
      });

      return { previousProfile: cached };
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateRestaurantDataOnCache(context.previousProfile);
      }
    },
  });

  const handleUpdateRestaurantProfile = async (
    data: RestaurantProfileSchema
  ) => {
    try {
      await updateRestaurant({
        name: data.name,
        description: data.description,
      });

      toast({
        title: "Perfil atualizado com sucesso!",
        description: "As informações da sua loja foram atualizadas!",
      });
    } catch {
      toast({
        title: "Não foi possível atualizar o perfil",
        description: "Ocorreu um erro ao tentar atualizar o perfil",
        action: (
          <ToastAction
            altText="Tente novamente"
            onClick={async () =>
              await updateProfileRestaurant({
                name: data.name,
                description: data.description,
              })
            }
          >
            Tente novamente
          </ToastAction>
        ),
        variant: "destructive",
      });
    }
  };

  return {
    profile: {
      ...profile,
      profileFallbackName,
      loadingProfile,
    },
    restaurant: {
      ...restaurant,
      loadingRestaurant,

      updateProfile: {
        register,
        handleSubmit,
        isSubmitting,
        reset,
        handleUpdateRestaurantProfile,
      },
    },
  };
}
