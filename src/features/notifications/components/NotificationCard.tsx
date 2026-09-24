import React from "react";
import { Link } from "react-router";
import { Typography, Button } from "../../../components/ui";
import {
    Bell,
    Calendar,
    Briefcase,
    Target,
    Award,
    Check,
    ExternalLink,
    Clock,
    UserCheck,
    Building2,
    Info,
} from "lucide-react";
import { Notification } from "../types";

interface NotificationCardProps {
    notification: Notification;
    onMarkAsRead: (id: number | string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
    notification,
    onMarkAsRead,
}) => {
    const { id, title, message, is_read, notification_type, source, created_at } = notification;

    const getTypeConfig = (type: string) => {
        const normalized = type.toLowerCase();
        if (normalized.includes("interview")) {
            return {
                icon: Calendar,
                label: "Interview",
                iconClass: "text-purple-600 bg-purple-50 border-purple-100",
                badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
            };
        }
        if (normalized.includes("application") || normalized.includes("candidate")) {
            return {
                icon: UserCheck,
                label: "Application",
                iconClass: "text-blue-600 bg-blue-50 border-blue-100",
                badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
            };
        }
        if (normalized.includes("lead")) {
            return {
                icon: Target,
                label: "Lead",
                iconClass: "text-amber-600 bg-amber-50 border-amber-100",
                badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
            };
        }
        if (normalized.includes("placement")) {
            return {
                icon: Award,
                label: "Placement",
                iconClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
                badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
            };
        }
        if (normalized.includes("job")) {
            return {
                icon: Briefcase,
                label: "Job",
                iconClass: "text-indigo-600 bg-indigo-50 border-indigo-100",
                badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
            };
        }
        if (normalized.includes("client")) {
            return {
                icon: Building2,
                label: "Client",
                iconClass: "text-cyan-600 bg-cyan-50 border-cyan-100",
                badgeClass: "bg-cyan-50 text-cyan-700 border-cyan-200",
            };
        }
        return {
            icon: Bell,
            label: "System",
            iconClass: "text-primary bg-primary-light border-primary/20",
            badgeClass: "bg-teal-50 text-teal-700 border-teal-200",
        };
    };

    const typeConfig = getTypeConfig(notification_type || "general");
    const TypeIcon = typeConfig.icon;

    const formatRelativeTime = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffSecs = Math.floor(diffMs / 1000);
            const diffMins = Math.floor(diffSecs / 60);
            const diffHours = Math.floor(diffMins / 60);
            const diffDays = Math.floor(diffHours / 24);

            if (diffMins < 1) return "Just now";
            if (diffMins < 60) return `${diffMins} min ago`;
            if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
            if (diffDays === 1) return "Yesterday";
            if (diffDays < 7) return `${diffDays} days ago`;
            return date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
            });
        } catch {
            return dateStr;
        }
    };

    const formatFullTime = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
            });
        } catch {
            return dateStr;
        }
    };

    const getSourceLink = () => {
        if (!source || !source.type) return null;
        const normalized = source.type.toLowerCase();
        if (normalized === "candidate" && source.id) {
            return { url: `/dashboard/candidates/${source.id}`, text: "View Candidate" };
        }
        if (normalized === "job" && source.id) {
            return { url: `/dashboard/jobs/${source.id}`, text: "View Job" };
        }
        if (normalized === "client" && source.id) {
            return { url: `/dashboard/clients/${source.id}`, text: "View Client" };
        }
        if (normalized === "interview") {
            return { url: `/dashboard/interviews`, text: "View Interviews" };
        }
        if (normalized === "lead") {
            return { url: `/dashboard/leads`, text: "View Leads" };
        }
        return null;
    };

    const sourceLink = getSourceLink();

    return (
        <div
            className={`group relative flex items-start gap-4 p-4 sm:p-5 rounded-xl border transition-all duration-200 text-left ${
                !is_read
                    ? "bg-white border-btn-sec-border border-l-4 border-l-primary shadow-xs hover:shadow-md"
                    : "bg-white/70 border-btn-sec-border hover:bg-white hover:shadow-xs"
            }`}
        >
            {/* Type Icon */}
            <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${typeConfig.iconClass}`}
            >
                <TypeIcon className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-2">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${typeConfig.badgeClass}`}
                    >
                        {typeConfig.label}
                    </span>

                    {!is_read && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span>Unread</span>
                        </span>
                    )}

                    <div className="flex items-center gap-1 text-light-text text-xs ml-auto">
                        <Clock className="w-3.5 h-3.5" />
                        <span title={formatFullTime(created_at)}>{formatRelativeTime(created_at)}</span>
                    </div>
                </div>

                <Typography
                    variant="body1"
                    className={`text-sm text-text-main leading-snug break-words ${
                        !is_read ? "font-bold" : "font-semibold"
                    }`}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    className="text-xs text-muted-text mt-1 leading-relaxed break-words"
                >
                    {message}
                </Typography>

                {/* Footer Actions / Links */}
                <div className="flex items-center flex-wrap gap-3 mt-3 pt-2 border-t border-slate-100">
                    {sourceLink && (
                        <Link
                            to={sourceLink.url}
                            className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
                        >
                            <span>{sourceLink.text}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                    )}

                    {!is_read && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => onMarkAsRead(id)}
                            className="text-xs h-7 px-2.5 text-slate-600 hover:text-primary gap-1"
                            prefixIcon={Check}
                        >
                            Mark as read
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
