import React, { useState, useMemo } from "react";
import { PageHeader, Button, Typography, StatsGroup } from "../../../components/ui";
import {
    Bell,
    CheckCheck,
    Send,
    RefreshCw,
    Inbox,
    BellOff,
    CheckCircle2,
    Clock,
    AlertCircle,
    Loader2,
} from "lucide-react";
import { useNotifications } from "../../../shared/context/NotificationsContext";
import { useToast } from "../../../shared/context/ToastContext";
import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilterBar } from "../components/NotificationFilterBar";
import { NotificationFilterTab } from "../types";

export const NotificationsContainer: React.FC = () => {
    const { toast } = useToast();
    const {
        notifications,
        isLoading,
        hasMore,
        fetchNextPage,
        refreshNotifications,
        markAsRead,
        markAllAsRead,
        sendTestNotification,
    } = useNotifications();

    const [activeTab, setActiveTab] = useState<NotificationFilterTab>("all");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isMarkingAll, setIsMarkingAll] = useState(false);
    const [isSendingTest, setIsSendingTest] = useState(false);

    // Calculate stats
    const totalCount = notifications.length;
    const unreadCount = useMemo(
        () => notifications.filter((n) => !n.is_read).length,
        [notifications]
    );
    const readCount = totalCount - unreadCount;

    // Filter notifications based on tab, type, and search query
    const filteredNotifications = useMemo(() => {
        return notifications.filter((n) => {
            // Tab filter
            if (activeTab === "unread" && n.is_read) return false;
            if (activeTab === "read" && !n.is_read) return false;

            // Type filter
            if (selectedType !== "all") {
                const notifType = (n.notification_type || "").toLowerCase();
                if (!notifType.includes(selectedType.toLowerCase())) {
                    return false;
                }
            }

            // Search query filter
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase().trim();
                const titleMatch = (n.title || "").toLowerCase().includes(query);
                const messageMatch = (n.message || "").toLowerCase().includes(query);
                if (!titleMatch && !messageMatch) return false;
            }

            return true;
        });
    }, [notifications, activeTab, selectedType, searchQuery]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await refreshNotifications();
            toast.success("Notifications refreshed");
        } catch {
            toast.error("Failed to refresh notifications");
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleMarkAllAsRead = async () => {
        if (unreadCount === 0) return;
        setIsMarkingAll(true);
        try {
            await markAllAsRead();
            toast.success("All notifications marked as read");
        } catch {
            toast.error("Failed to mark all as read");
        } finally {
            setIsMarkingAll(false);
        }
    };

    const handleSendTest = async () => {
        setIsSendingTest(true);
        try {
            await sendTestNotification();
            toast.success("Test notification triggered");
        } catch {
            toast.error("Failed to send test notification");
        } finally {
            setIsSendingTest(false);
        }
    };

    const statItems = [
        {
            title: "Total Notifications",
            value: totalCount,
            icon: Bell,
            iconColor: "text-slate-500",
        },
        {
            title: "Unread Alerts",
            value: unreadCount,
            icon: AlertCircle,
            iconColor: "text-primary",
        },
        {
            title: "Read Notifications",
            value: readCount,
            icon: CheckCircle2,
            iconColor: "text-emerald-500",
        },
    ];

    return (
        <div className="space-y-6 text-left max-w-7xl mx-auto">
            {/* Header */}
            <PageHeader
                title="Notifications"
                subtitle="Stay updated on new candidate applications, interviews, leads, and system events"
                rightElement={
                    <div className="flex items-center gap-2 flex-wrap">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleRefresh}
                            loading={isRefreshing}
                            prefixIcon={RefreshCw}
                            className="text-xs text-slate-600 gap-1.5"
                        >
                            Refresh
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleSendTest}
                            loading={isSendingTest}
                            prefixIcon={Send}
                            className="text-xs text-slate-600 gap-1.5"
                        >
                            Send Test
                        </Button>
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={handleMarkAllAsRead}
                            loading={isMarkingAll}
                            disabled={unreadCount === 0}
                            prefixIcon={CheckCheck}
                            className="text-xs gap-1.5"
                        >
                            Mark All as Read
                        </Button>
                    </div>
                }
            />

            {/* Quick Stats */}
            <StatsGroup items={statItems} className="grid-cols-1 sm:grid-cols-3 lg:grid-cols-3" />

            {/* Filter Bar */}
            <NotificationFilterBar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                totalCount={totalCount}
                unreadCount={unreadCount}
                readCount={readCount}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {/* Notifications Stream */}
            <div className="space-y-3">
                {isLoading && notifications.length === 0 ? (
                    <div className="bg-white rounded-xl border border-btn-sec-border shadow-xs flex flex-col items-center justify-center p-12 min-h-[300px]">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <Typography variant="body2" className="text-muted-text mt-3">
                            Loading notifications...
                        </Typography>
                    </div>
                ) : filteredNotifications.length === 0 ? (
                    <div className="bg-white rounded-xl border border-btn-sec-border shadow-xs p-12 text-center flex flex-col items-center justify-center min-h-[320px]">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                            {activeTab === "unread" ? (
                                <CheckCheck className="w-7 h-7 text-emerald-500" />
                            ) : searchQuery ? (
                                <BellOff className="w-7 h-7 text-slate-400" />
                            ) : (
                                <Inbox className="w-7 h-7 text-slate-400" />
                            )}
                        </div>
                        <Typography variant="h4" className="font-bold text-text-main text-base">
                            {activeTab === "unread"
                                ? "You're all caught up!"
                                : searchQuery
                                ? "No matching notifications"
                                : "No notifications yet"}
                        </Typography>
                        <Typography variant="body2" className="text-muted-text text-xs max-w-sm mt-1">
                            {activeTab === "unread"
                                ? "There are no unread notifications right now. Check the 'Read' tab to see past alerts."
                                : searchQuery
                                ? `No notifications matched "${searchQuery}". Try changing or clearing your search filter.`
                                : "When candidate activity, interviews, or leads occur, alerts will appear here."}
                        </Typography>

                        {searchQuery && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setSearchQuery("")}
                                className="mt-4 text-xs"
                            >
                                Clear Search Filter
                            </Button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="space-y-2.5">
                            {filteredNotifications.map((notif) => (
                                <NotificationCard
                                    key={notif.id}
                                    notification={notif}
                                    onMarkAsRead={markAsRead}
                                />
                            ))}
                        </div>

                        {/* Load more button */}
                        {hasMore && (
                            <div className="pt-4 pb-2 text-center">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={fetchNextPage}
                                    loading={isLoading}
                                    className="px-6 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 gap-2"
                                >
                                    <span>Load Older Notifications</span>
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
