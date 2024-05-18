import { ThemeProviderContext } from "@/components/theme-provider";
import { useContext } from "react";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("context not available");

  return context;
};
