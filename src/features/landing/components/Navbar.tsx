import React from "react";
import { Link, NavLink } from "react-router";
import { NavItem } from "./NavItem";
import { Button } from "../../../components/ui";

export const Navbar: React.FC = () => {
  return (
    <header className="border-b border-btn-sec-border bg-white sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Logo" className="h-9 w-auto object-contain" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-7">
          <NavItem to="/" end>
            Home
          </NavItem>
          <NavItem to="/features">
            Features
          </NavItem>
          {/* <NavItem to="/how-it-works">
            How It Works
          </NavItem> */}
          <NavItem to="/pricing">
            Pricing
          </NavItem>
          <NavItem to="/about-us">
            About Us
          </NavItem>
          <NavItem to="/contact">
            Contact
          </NavItem>
        </nav>

        <div className="flex items-center gap-6">
          <NavItem to="/login">
            Login
          </NavItem>
          <NavLink to="/register">
            <Button className="!h-9 !px-5 font-semibold text-sm">
              Get Started
            </Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
