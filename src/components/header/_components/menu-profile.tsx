import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { RestaurantProfile } from "./restaurant-profile";
import { useProfile } from "../hooks/useProfile";
import { Skeleton } from "@/components/ui/skeleton";

export const MenuProfile = () => {
  const {
    profile: { name, email, profileFallbackName, loadingProfile },
  } = useProfile();
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            {loadingProfile ? (
              <div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            ) : (
              <Avatar>
                <AvatarFallback>{profileFallbackName}</AvatarFallback>
              </Avatar>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {!loadingProfile && name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {!loadingProfile && email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem className="flex items-center">
                <PersonIcon className="mr-2" />
                Perfil do restaurante
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="flex items-center text-red-400 focus:text-white focus:bg-red-400">
            <ExitIcon className="mr-2" /> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RestaurantProfile />
    </Dialog>
  );
};
