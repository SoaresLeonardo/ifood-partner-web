import { DashboardIcon } from "@radix-ui/react-icons";
import { HeaderNavigation } from "./_components/header-navigation";
import { MenuProfile } from "./_components/menu-profile";

export const Header = () => {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-12 md:px-24">
        <DashboardIcon width={25} height={25} className="mr-3" />

        <HeaderNavigation />

        <div className="ml-auto flex items-center space-x-4">
          <MenuProfile />
        </div>
      </div>
    </header>
  );
};
