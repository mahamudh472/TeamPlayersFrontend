import React from "react";
import { Link, NavLink } from "react-router";
import {
    LayoutDashboard,
    Users,
    Briefcase,
    Calendar,
    Settings,
    Target,
    Building2,
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
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-md font-medium ${isActive
                    ? "bg-primary text-white font-semibold"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
            }
        >
            <Icon className="w-5 h-5" />
            <span>{children}</span>
        </NavLink>
    );
};

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-sidebar border-r border-white/10 flex flex-col shrink-0">
            <div className="p-6 border-b border-white/10">
                <Link to="/dashboard" className="flex items-center gap-2">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-8 w-auto object-contain"
                    />
                </Link>
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
    );
};
