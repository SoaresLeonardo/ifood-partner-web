import { HeaderNavigationItem as Link } from "./header-navigation-item";

export const HeaderNavigation = () => {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="dashboard">Início</Link>
      <Link href="orders">Pedidos</Link>
      <Link href="comments">Todas Avaliações</Link>
    </nav>
  );
};
