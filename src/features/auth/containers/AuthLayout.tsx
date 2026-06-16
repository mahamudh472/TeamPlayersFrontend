import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../../shared/context/AuthContext";

export const AuthLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="text-muted-foreground animate-pulse font-medium text-lg">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary/5 via-slate-50 to-accent-light flex items-center justify-center p-4">
      <div
        data-slot="card"
        className="bg-white text-card-foreground flex flex-col gap-6 rounded-xl w-full max-w-md p-6 text-left border-1 border-btn-sec-border"
      >
        <Outlet />
      </div>
    </div>
  );
};
