import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { Typography } from "../../../components/ui";

interface SidebarLinkProps {
  to: string;
  children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
          <Link to="/">
            <Typography variant="h4" className="font-bold text-blue-600">
              NoahMoore
            </Typography>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          <SidebarLink to="/dashboard">
            <Typography variant="body2" component="span">Dashboard</Typography>
          </SidebarLink>
          <SidebarLink to="/dashboard/leads">
            <Typography variant="body2" component="span">Lead Generation</Typography>
          </SidebarLink>
          <SidebarLink to="/dashboard/clients">
            <Typography variant="body2" component="span">Clients</Typography>
          </SidebarLink>
          <SidebarLink to="/dashboard/jobs">
            <Typography variant="body2" component="span">Jobs</Typography>
          </SidebarLink>
          <SidebarLink to="/dashboard/candidates">
            <Typography variant="body2" component="span">Candidates</Typography>
          </SidebarLink>
          <SidebarLink to="/dashboard/interviews">
            <Typography variant="body2" component="span">Interviews</Typography>
          </SidebarLink>
          <SidebarLink to="/dashboard/placements">
            <Typography variant="body2" component="span">Placements</Typography>
          </SidebarLink>
          <SidebarLink to="/dashboard/analytics">
            <Typography variant="body2" component="span">Analytics</Typography>
          </SidebarLink>
          <SidebarLink to="/dashboard/settings">
            <Typography variant="body2" component="span">Settings</Typography>
          </SidebarLink>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Link to="/login" className="flex items-center text-sm font-medium text-red-600 hover:text-red-700">
            <Typography variant="body2" component="span">Sign Out</Typography>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8">
          <Typography variant="h5" className="font-semibold">
            System Workspace
          </Typography>
          <div className="flex items-center gap-4">
            <Typography variant="body2" className="text-gray-500">
              User Profile
            </Typography>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
