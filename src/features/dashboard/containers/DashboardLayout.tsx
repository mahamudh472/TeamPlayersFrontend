import React, { useState, useEffect } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { AIAssistant } from "../components/AIAssistant";
import { useAuth } from "../../../shared/context/AuthContext";

export const DashboardLayout: React.FC = () => {
    const [aiState, setAiState] = useState<"maximized" | "minimized" | "closed">("maximized");
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
                <div className="text-muted-foreground animate-pulse font-medium text-lg">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <div className="h-screen flex bg-btn-sec-bg text-text-main overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />

                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                    <ScrollRestoration getKey={(location) => location.pathname} />
                </main>
            </div>

            <AIAssistant state={aiState} onChangeState={setAiState} />
        </div>
    );
};
