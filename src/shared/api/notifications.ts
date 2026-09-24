import { apiClient } from "./apiClient";
import { Notification, NotificationsResponse } from "../types";

export interface GetNotificationsParams {
    page?: number;
    page_size?: number;
    is_read?: boolean;
    search?: string;
    notification_type?: string;
}

export const notificationsApi = {
    /**
     * Fetch paginated notifications with optional filters
     */
    getNotifications: async (params?: GetNotificationsParams): Promise<NotificationsResponse> => {
        const response = await apiClient.get<NotificationsResponse>("/api/v1/notifications/", {
            params,
        });
        return response.data;
    },

    /**
     * Mark a single notification as read
     */
    markAsRead: async (id: number | string): Promise<{ message?: string; detail?: string }> => {
        const response = await apiClient.post(`/api/v1/notifications/${id}/read/`);
        return response.data;
    },

    /**
     * Mark all notifications as read
     */
    markAllAsRead: async (): Promise<{ message?: string; detail?: string }> => {
        const response = await apiClient.post("/api/v1/notifications/read-all/");
        return response.data;
    },

    /**
     * Trigger a test notification
     */
    sendTestNotification: async (): Promise<{ message?: string; detail?: string }> => {
        const response = await apiClient.post("/api/v1/notifications/send-test/");
        return response.data;
    },

    /**
     * Delete a notification if supported
     */
    deleteNotification: async (id: number | string): Promise<void> => {
        await apiClient.delete(`/api/v1/notifications/${id}/`);
    },
};
