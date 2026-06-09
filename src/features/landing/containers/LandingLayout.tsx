import React from "react";
import { Link, Outlet } from "react-router";
import { Typography } from "../../../components/ui";
import { Navbar } from "../components";

export const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-text-main">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-footer-bg text-footer-text py-8 mt-auto border-t border-btn-sec-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src="/logo.png" alt="Logo" className="h-8 mb-4 brightness-0 invert object-contain" />
              <p className="text-sm text-slate-300">
                AI-powered recruitment platform helping agencies scale their business.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link className="text-slate-300 hover:text-white transition-colors" to="/features">
                    Features
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-300 hover:text-white transition-colors" to="/how-it-works">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-300 hover:text-white transition-colors" to="/pricing">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-300 hover:text-white transition-colors" to="/faq">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link className="text-slate-300 hover:text-white transition-colors" to="/about-us">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-300 hover:text-white transition-colors" to="/contact">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-300 hover:text-white transition-colors" to="/book-demo">
                    Book Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link className="text-slate-300 hover:text-white transition-colors" to="/privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-300 hover:text-white transition-colors" to="/terms">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-300 hover:text-white transition-colors" to="/cookie-policy">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-300">
            &copy; {new Date().getFullYear()} Team Players. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
