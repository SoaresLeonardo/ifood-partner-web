import { Outlet } from "react-router-dom";

export function Auth() {
  return (
    <div className="container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <span className="font-semibold">Painel Parceiro</span>
        </div>
        <div className="relative z-20 mt-auto">
          <footer className="text-sm">
            Painel do parceiro projeto.ifood - {new Date().getFullYear()}
          </footer>
        </div>
      </div>
      <div className="relative flex min-h-screen flex-col items-center justify-center">
        <div className="lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
