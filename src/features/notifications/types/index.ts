export * from "../../../shared/types/notifications";

export type NotificationFilterTab = "all" | "unread" | "read";

export interface NotificationTypeOption {
    label: string;
    value: string;
}
