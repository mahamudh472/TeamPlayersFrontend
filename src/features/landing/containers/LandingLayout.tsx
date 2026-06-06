import React from "react";
import { Link, Outlet } from "react-router";
import { Typography } from "../../../components/ui";

export const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="border-b border-gray-200 dark:border-gray-800">
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
              <Typography variant="body2" component="span" className="hover:text-primary transition-colors">
                Home
              </Typography>
            </Link>
            <Link to="/features">
              <Typography variant="body2" component="span" className="hover:text-primary transition-colors">
                Features
              </Typography>
            </Link>
            <Link to="/pricing">
              <Typography variant="body2" component="span" className="hover:text-primary transition-colors">
                Pricing
              </Typography>
            </Link>
            <Link to="/about-us">
              <Typography variant="body2" component="span" className="hover:text-primary transition-colors">
                About Us
              </Typography>
            </Link>
            <Link to="/contact">
              <Typography variant="body2" component="span" className="hover:text-primary transition-colors">
                Contact
              </Typography>
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Typography variant="body2" component="span" className="hover:text-primary transition-colors">
                Login
              </Typography>
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Typography variant="caption">
            &copy; {new Date().getFullYear()} NoahMoore. All rights reserved.
          </Typography>
          <div className="flex gap-4">
            <Link to="/about-us">
              <Typography variant="caption" className="hover:underline">
                About
              </Typography>
            </Link>
            <Link to="/contact">
              <Typography variant="caption" className="hover:underline">
                Contact
              </Typography>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
