import { useTheme } from "@/hooks/useTheme";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")} variant="ghost" className="hover:bg-transparent">
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
