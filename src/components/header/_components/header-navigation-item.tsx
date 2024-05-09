import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

export const HeaderNavigationItem = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  const location = useLocation();
  const { pathname } = location;

  const splitLocation = pathname.split("/");

  return (
    <Link
      to={href}
      className={`text-sm font-medium transition-colors hover:text-primary flex items-center ${
        splitLocation[1] === href ? "text-white" : "text-muted-foreground"
      }`}
    >
      {children}
    </Link>
  );
};
