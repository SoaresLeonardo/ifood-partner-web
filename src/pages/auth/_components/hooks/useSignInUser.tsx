import { signIn } from "@/api/sign-in";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const userSignInSchema = z.object({
  email: z.string().email().min(6).max(255),
});

type UserSignInSchema = z.infer<typeof userSignInSchema>;

export function UseSignInUser() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserSignInSchema>();

  const { mutateAsync: signInUser } = useMutation({
    mutationFn: signIn,
  });

  const handleUserSignIn = async ({ email }: UserSignInSchema) => {
    try {
      await signInUser({
        email,
      });

      toast({
        title: "O código foi enviado com sucesso!",
        description: "Confira seu email.",
        action: (
          <ToastAction altText="Reenviar" onClick={() => signInUser({ email })}>
            Reenviar
          </ToastAction>
        ),
      });
    } catch {
      toast({
        title: "Não foi possível enviar o código",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return {
    register,
    handleUserSignIn,
    handleSubmit,
    isSubmitting,
  };
}
