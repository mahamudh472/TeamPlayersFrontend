import React from "react";
import { NavLink } from "react-router";

interface NavItemProps {
  to: string;
  end?: boolean;
  children: React.ReactNode;
}

export const NavItem: React.FC<NavItemProps> = ({ to, end, children }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive
          ? "h-9 px-2 flex items-center justify-center font-semibold text-sm rounded-lg bg-primary text-white hover:bg-primary/95 shadow-xs cursor-pointer"
          : "text-sm px-2 font-semibold text-text-main hover:text-primary"
      }
    >
      {children}
    </NavLink>
  );
};
