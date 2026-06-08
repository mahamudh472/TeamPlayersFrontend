import React from "react";
import { Link, Outlet } from "react-router";
import { Typography, Button } from "../../../components/ui";

export const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-text-main">
      <header className="border-b border-btn-sec-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Typography variant="h4" component="span" className="font-bold text-primary">
                NoahMoore
              </Typography>
            </Link>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/">
              <Typography variant="body2" component="span" className="text-nav-inactive hover:text-primary transition-colors font-medium">
                Home
              </Typography>
            </Link>
            <Link to="/features">
              <Typography variant="body2" component="span" className="text-nav-inactive hover:text-primary transition-colors font-medium">
                Features
              </Typography>
            </Link>
            <Link to="/pricing">
              <Typography variant="body2" component="span" className="text-nav-inactive hover:text-primary transition-colors font-medium">
                Pricing
              </Typography>
            </Link>
            <Link to="/about-us">
              <Typography variant="body2" component="span" className="text-nav-inactive hover:text-primary transition-colors font-medium">
                About Us
              </Typography>
            </Link>
            <Link to="/contact">
              <Typography variant="body2" component="span" className="text-nav-inactive hover:text-primary transition-colors font-medium">
                Contact
              </Typography>
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-footer-bg text-footer-text py-8 mt-auto border-t border-btn-sec-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Typography variant="caption" className="text-footer-text">
            &copy; {new Date().getFullYear()} NoahMoore. All rights reserved.
          </Typography>
          <div className="flex gap-6">
            <Link to="/about-us">
              <Typography variant="caption" className="text-footer-text hover:text-white transition-colors">
                About
              </Typography>
            </Link>
            <Link to="/contact">
              <Typography variant="caption" className="text-footer-text hover:text-white transition-colors">
                Contact
              </Typography>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
