import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { Button, Input, Typography } from "../../../components/ui";
import {
    LayoutDashboard,
    Sparkles,
    Users,
    Briefcase,
    UserCheck,
    Calendar,
    TrendingUp,
    Settings,
    LogOut,
    CheckCircle,
    Bell,
    Target,
    Building2,
    Badge,
    Award,
    ChartArea,
} from "lucide-react";

interface SidebarLinkProps {
    to: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
    to,
    icon: Icon,
    children,
}) => {
    return (
        <NavLink
            to={to}
            end={to === "/dashboard"}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-base font-medium ${isActive
                    ? "bg-primary text-white font-semibold"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
            }
        >
            <Icon className="w-7 h-7" />
            <span>{children}</span>
        </NavLink>
    );
};

export const DashboardLayout: React.FC = () => {
    return (
        <div className="h-screen flex bg-btn-sec-bg text-text-main overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-sidebar border-r border-white/10 flex flex-col shrink-0">
                <div className="p-6 border-b border-white/10">
                    <Link to="/dashboard" className="flex items-center gap-2">
                        <img
                            src=""
                            alt="Team Players"
                            className="h-8"
                        />
                    </Link>
                    <div className="mt-4">
                        <p className="text-sm text-white font-medium">Demo Agency</p>
                        <span className="inline-flex items-center justify-center rounded-md border border-white/15 px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 transition-[color,box-shadow] overflow-hidden bg-white/10 text-white mt-1 text-xs">
                            Professional Plan
                        </span>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <SidebarLink to="/dashboard" icon={LayoutDashboard}>
                        Dashboard
                    </SidebarLink>
                    <SidebarLink to="/dashboard/leads" icon={Target}>
                        Lead Generation
                    </SidebarLink>
                    <SidebarLink to="/dashboard/clients" icon={Building2}>
                        Clients
                    </SidebarLink>
                    <SidebarLink to="/dashboard/jobs" icon={Briefcase}>
                        Jobs
                    </SidebarLink>
                    <SidebarLink to="/dashboard/candidates" icon={Users}>
                        Candidates
                    </SidebarLink>
                    <SidebarLink to="/dashboard/interviews" icon={Calendar}>
                        Interviews
                    </SidebarLink>
                    <SidebarLink to="/dashboard/placements" icon={Award}>
                        Placements
                    </SidebarLink>
                    <SidebarLink to="/dashboard/analytics" icon={ChartArea}>
                        Analytics
                    </SidebarLink>
                </nav>
                <div className="p-4 border-t border-white/10 space-y-2">
                    <SidebarLink to="/dashboard/settings" icon={Settings}>
                        Settings
                    </SidebarLink>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 flex items-center justify-between px-8 shrink-0 gap-4 border-b-btn-sec-border border-b">
                    <Input
                        className="border-none"
                        placeholder="Search candidates, jobs, cientss..."
                    />
                    <Button variant="icon">
                        <Bell size={18} />
                    </Button>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 justify-start text-left shrink-0"
                    >
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                            JD
                        </div>
                        <div className="flex flex-col min-w-0 grow">
                            <Typography
                                variant="body2"
                                className="truncate font-bold leading-tight"
                            >
                                John Doe
                            </Typography>
                            <Typography
                                variant="caption"
                                className="truncate text-light-text leading-none"
                            >
                                Recruiter
                            </Typography>
                        </div>
                    </Button>
                </header>
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
