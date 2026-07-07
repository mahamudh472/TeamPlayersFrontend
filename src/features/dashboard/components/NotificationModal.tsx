import React from "react";
import { Typography, Button } from "../../../components/ui";
import { Bell, X, Loader2 } from "lucide-react";
import { NotificationModalProps } from "../types";
import { useNotifications } from "../../../shared/context/NotificationsContext";

export const NotificationModal: React.FC<NotificationModalProps> = ({
    isOpen,
    onClose,
}) => {
    if (!isOpen) return null;

    const {
        notifications,
        isLoading,
        hasMore,
        fetchNextPage,
        markAsRead,
        markAllAsRead,
        sendTestNotification,
    } = useNotifications();

    const formatTime = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMins / 60);
            const diffDays = Math.floor(diffHours / 24);

            if (diffMins < 1) return "Just now";
            if (diffMins < 60) return `${diffMins}m ago`;
            if (diffHours < 24) return `${diffHours}h ago`;
            if (diffDays === 1) return "Yesterday";
            if (diffDays < 7) return `${diffDays}d ago`;
            return date.toLocaleDateString();
        } catch (e) {
            return "";
        }
    };

    return (
        <div className="absolute right-0 top-[52px] w-96 md:w-[440px] bg-white rounded-xl border border-btn-sec-border shadow-xl z-50 p-4 flex flex-col gap-3 animate-in fade-in-0 slide-in-from-top-1 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-primary" />
                    <Typography variant="body1" className="font-bold text-text-main text-sm">
                        Notifications
                    </Typography>
                </div>
                <Button
                    type="button"
                    variant="icon"
                    onClick={onClose}
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>

            {/* Notifications List */}
            <div className="space-y-1 max-h-[300px] overflow-y-auto py-1">
                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-muted-text">
                        <Bell className="w-8 h-8 opacity-25 mb-2" />
                        <Typography variant="body2" className="text-xs font-semibold text-slate-400">
                            No notifications yet
                        </Typography>
                    </div>
                ) : (
                    <>
                        {notifications.map((notif) => (
                            <div
                                key={notif.id}
                                onClick={() => !notif.is_read && markAsRead(notif.id)}
                                className={`flex gap-2.5 p-2 rounded-lg transition-colors text-left cursor-pointer hover:bg-slate-50 ${
                                    !notif.is_read ? "bg-slate-50/50" : ""
                                }`}
                            >
                                <div
                                    className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                                        !notif.is_read ? "bg-primary animate-pulse" : "bg-transparent"
                                    }`}
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-1">
                                        <Typography
                                            variant="body2"
                                            className={`text-xs text-text-main truncate ${
                                                !notif.is_read ? "font-bold" : "font-semibold"
                                            }`}
                                        >
                                            {notif.title}
                                        </Typography>
                                    </div>
                                    <Typography variant="body2" className="text-xs text-muted-text mt-0.5 leading-normal break-words">
                                        {notif.message}
                                    </Typography>
                                    <Typography variant="caption" className="text-[10px] text-light-text mt-1 block font-medium">
                                        {formatTime(notif.created_at)}
                                    </Typography>
                                </div>
                            </div>
                        ))}

                        {hasMore && (
                            <div className="pt-2 pb-1 text-center">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={fetchNextPage}
                                    disabled={isLoading}
                                    className="w-full text-xs py-1.5 flex items-center justify-center gap-1.5"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            <span>Loading...</span>
                                        </>
                                    ) : (
                                        <span>Load More</span>
                                    )}
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center border-t border-slate-100 pt-2 text-xs">
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="link"
                        onClick={markAllAsRead}
                        className="text-primary font-bold hover:underline"
                        disabled={notifications.length === 0 || !notifications.some(n => !n.is_read)}
                    >
                        Mark all as read
                    </Button>
                    <Button
                        type="button"
                        variant="link"
                        onClick={sendTestNotification}
                        className="text-slate-500 font-semibold hover:text-primary hover:underline"
                    >
                        Send Test
                    </Button>
                </div>
                <Button
                    type="button"
                    variant="link"
                    onClick={onClose}
                    className="text-muted-text hover:text-text-main font-semibold"
                >
                    Dismiss
                </Button>
            </div>
        </div>
    );
};
