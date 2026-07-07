import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { apiClient, getAccessToken } from "../api/apiClient";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";
import { Notification, NotificationsResponse } from "../types";

interface NotificationsContextType {
    notifications: Notification[];
    unreadCount: number;
    isLoading: boolean;
    hasMore: boolean;
    refreshNotifications: () => Promise<void>;
    fetchNextPage: () => Promise<void>;
    markAsRead: (id: number | string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    sendTestNotification: () => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const { toast } = useToast();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<any>(null);

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    const refreshNotifications = async () => {
        if (!isAuthenticated) return;
        setIsLoading(true);
        try {
            const response = await apiClient.get<NotificationsResponse>("/api/v1/notifications/", {
                params: { page: 1, page_size: 15 },
            });
            setNotifications(response.data.results);
            setPage(1);
            setHasMore(!!response.data.next);
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchNextPage = async () => {
        if (!isAuthenticated || !hasMore || isLoading) return;
        setIsLoading(true);
        const nextPage = page + 1;
        try {
            const response = await apiClient.get<NotificationsResponse>("/api/v1/notifications/", {
                params: { page: nextPage, page_size: 15 },
            });
            setNotifications((prev) => {
                const newResults = response.data.results.filter(
                    (newNotif) => !prev.some((existing) => existing.id === newNotif.id)
                );
                return [...prev, ...newResults];
            });
            setPage(nextPage);
            setHasMore(!!response.data.next);
        } catch (error) {
            console.error("Failed to fetch next page notifications:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const markAsRead = async (id: number | string) => {
        try {
            await apiClient.post(`/api/v1/notifications/${id}/read/`);
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
            );
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await apiClient.post("/api/v1/notifications/read-all/");
            setNotifications((prev) =>
                prev.map((n) => ({ ...n, is_read: true }))
            );
        } catch (error) {
            console.error("Failed to mark all notifications as read:", error);
        }
    };

    const sendTestNotification = async () => {
        try {
            await apiClient.post("/api/v1/notifications/send-test/");
        } catch (error) {
            console.error("Failed to send test notification:", error);
        }
    };

    const connectWebSocket = () => {
        if (wsRef.current) {
            wsRef.current.close();
        }
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
        }

        const token = getAccessToken();
        if (!token) return;

        const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
        const wsProto = apiBase.startsWith("https") ? "wss" : "ws";
        const wsBase = apiBase.replace(/^https?/, wsProto);
        const wsUrl = `${wsBase}/ws/notifications/?token=${token}`;

        console.log("Connecting to notifications WebSocket:", wsUrl);
        const socket = new WebSocket(wsUrl);
        wsRef.current = socket;

        socket.onopen = () => {
            console.log("Notifications WebSocket connected");
        };

        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === "notification" && message.data) {
                    const newNotification: Notification = message.data;
                    setNotifications((prev) => {
                        if (prev.some((n) => n.id === newNotification.id)) {
                            return prev;
                        }
                        return [newNotification, ...prev];
                    });
                    toast.info(newNotification.title, 5000);
                }
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        socket.onclose = (event) => {
            console.log("Notifications WebSocket closed:", event.reason);
            if (isAuthenticated) {
                reconnectTimeoutRef.current = setTimeout(() => {
                    console.log("Attempting to reconnect WebSocket...");
                    connectWebSocket();
                }, 3000);
            }
        };

        socket.onerror = (error) => {
            console.error("Notifications WebSocket error:", error);
        };
    };

    useEffect(() => {
        if (isAuthenticated) {
            refreshNotifications();
            connectWebSocket();
        } else {
            setNotifications([]);
            setPage(1);
            setHasMore(false);
            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
                reconnectTimeoutRef.current = null;
            }
        }

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, [isAuthenticated]);

    return (
        <NotificationsContext.Provider
            value={{
                notifications,
                unreadCount,
                isLoading,
                hasMore,
                refreshNotifications,
                fetchNextPage,
                markAsRead,
                markAllAsRead,
                sendTestNotification,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    if (context === undefined) {
        throw new Error("useNotifications must be used within a NotificationsProvider");
    }
    return context;
};
