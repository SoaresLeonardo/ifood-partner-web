import { twMerge } from "tailwind-merge";
import { UserSignInForm } from "./_components/user-sign-in-form";
import { buttonVariants } from "@/components/ui/button";

export function SignIn() {
  return (
    <>
      <a
        href="/sign-up"
        className={twMerge(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Criar estabelecimento
      </a>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Entrar como Gerente
          </h1>
          <p className="text-sm text-muted-foreground">
            Acesse o painel do seu estabelecimento, veja os pedidos e
            comentários!
          </p>
        </div>
        <UserSignInForm />
      </div>
    </>
  );
}
