import React from "react";
import { Outlet, ScrollRestoration } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export const DashboardLayout: React.FC = () => {

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
        </div>
    );
};
