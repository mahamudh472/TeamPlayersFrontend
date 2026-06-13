import React from "react";
import { Typography, Button } from "../../../components/ui";
import { Bell, X } from "lucide-react";

import { NotificationModalProps } from "../types";
import { notifications } from "../fake-data";

export const NotificationModal: React.FC<NotificationModalProps> = ({
    isOpen,
    onClose,
}) => {
    if (!isOpen) return null;

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
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className="flex gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors text-left"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <Typography variant="body2" className="font-semibold text-text-main text-xs">
                                {notif.title}
                            </Typography>
                            <Typography variant="body2" className="text-xs text-muted-text mt-0.5 leading-normal">
                                {notif.description}
                            </Typography>
                            <Typography variant="caption" className="text-[10px] text-light-text mt-1 block font-medium">
                                {notif.time}
                            </Typography>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center border-t border-slate-100 pt-2 text-xs">
                <Button
                    type="button"
                    variant="link"
                    onClick={onClose}
                    className="text-primary"
                >
                    Mark all as read
                </Button>
                <Button
                    type="button"
                    variant="link"
                    onClick={onClose}
                    className="text-muted-text hover:text-text-main font-medium"
                >
                    Dismiss
                </Button>
            </div>
        </div>
    );
};
