export interface NotificationSource {
    id: number | string;
    type: string;
}

export interface Notification {
    id: number | string;
    title: string;
    message: string;
    is_read: boolean;
    notification_type: string;
    source: NotificationSource | null;
    created_at: string;
    updated_at: string;
}

export interface NotificationsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Notification[];
}
