import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseSignInUser } from "./hooks/useSignInUser";

export const UserSignInForm = () => {
  const { handleSubmit, handleUserSignIn, register, isSubmitting } =
    UseSignInUser();
  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(handleUserSignIn)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="seunome@exemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register("email")}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Enviar código
          </Button>
        </div>
      </form>
    </div>
  );
};
