import React, { useState, useEffect } from "react";
import { Typography, Button } from "../../../components/ui";
import { apiClient } from "../../../shared/api/apiClient";
import { useToast } from "../../../shared/context/ToastContext";
import { useNotifications } from "../../../shared/context/NotificationsContext";

const Switch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${
                checked ? "bg-primary" : "bg-slate-200"
            }`}
        >
            <span
                className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
                    checked ? "translate-x-[14px]" : "translate-x-[2px]"
                }`}
            />
        </button>
    );
};

interface NotificationSettingsResponse {
    new_application: boolean;
    interview_reminder: boolean;
    new_lead: boolean;
    weekly_report: boolean;
    marketing_email: boolean;
}

export const NotificationSettings: React.FC = () => {
    const { toast } = useToast();
    const { sendTestNotification } = useNotifications();
    const [isLoading, setIsLoading] = useState(true);
    const [isSavingNotifications, setIsSavingNotifications] = useState(false);
    const [notificationsPrefs, setNotificationsPrefs] = useState({
        newApplications: true,
        interviewReminders: true,
        newLeads: true,
        weeklyReports: false,
        marketingEmails: false,
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setIsLoading(true);
                const response = await apiClient.get<NotificationSettingsResponse>("/api/v1/accounts/settings/notifications/");
                const data = response.data;
                setNotificationsPrefs({
                    newApplications: data.new_application,
                    interviewReminders: data.interview_reminder,
                    newLeads: data.new_lead,
                    weeklyReports: data.weekly_report,
                    marketingEmails: data.marketing_email,
                });
            } catch (error: any) {
                console.error("Failed to load notification settings:", error);
                toast.error(error.response?.data?.detail || "Failed to load notification settings");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSettings();
    }, [toast]);

    const handleSaveNotifications = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingNotifications(true);
        try {
            const payload = {
                new_application: notificationsPrefs.newApplications,
                interview_reminder: notificationsPrefs.interviewReminders,
                new_lead: notificationsPrefs.newLeads,
                weekly_report: notificationsPrefs.weeklyReports,
                marketing_email: notificationsPrefs.marketingEmails,
            };
            await apiClient.patch("/api/v1/accounts/settings/notifications/", payload);
            toast.success("Notification preferences updated successfully");
        } catch (error: any) {
            console.error("Failed to update notification settings:", error);
            toast.error(error.response?.data?.detail || "Failed to save notification settings");
        } finally {
            setIsSavingNotifications(false);
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl border border-btn-sec-border shadow-xs flex flex-col items-center justify-center p-12 min-h-[350px]">
                <svg
                    className="animate-spin text-primary shrink-0 w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
                <Typography variant="body2" className="text-muted-text mt-4">
                    Loading preferences...
                </Typography>
            </div>
        );
    }

    return (
        <form onSubmit={handleSaveNotifications} className="bg-white rounded-xl border border-btn-sec-border shadow-xs flex flex-col overflow-hidden text-left">
            {/* Header */}
            <div className="p-6 border-b border-btn-sec-border">
                <Typography variant="h4" className="font-bold text-text-main">
                    Notification Preferences
                </Typography>
                <Typography variant="body2" className="text-muted-text">
                    Choose what notifications you receive
                </Typography>
            </div>
            
            {/* Content */}
            <div className="px-6 py-4 space-y-2">
                <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <div>
                        <Typography variant="body1" className="font-semibold text-text-main text-sm">
                            New Applications
                        </Typography>
                        <Typography variant="body2" className="text-xs text-muted-text mt-0.5">
                            Get notified when candidates apply
                        </Typography>
                    </div>
                    <Switch
                        checked={notificationsPrefs.newApplications}
                        onChange={(checked) => setNotificationsPrefs({ ...notificationsPrefs, newApplications: checked })}
                    />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <div>
                        <Typography variant="body1" className="font-semibold text-text-main text-sm">
                            Interview Reminders
                        </Typography>
                        <Typography variant="body2" className="text-xs text-muted-text mt-0.5">
                            15 minutes before scheduled interviews
                        </Typography>
                    </div>
                    <Switch
                        checked={notificationsPrefs.interviewReminders}
                        onChange={(checked) => setNotificationsPrefs({ ...notificationsPrefs, interviewReminders: checked })}
                    />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <div>
                        <Typography variant="body1" className="font-semibold text-text-main text-sm">
                            New Leads
                        </Typography>
                        <Typography variant="body2" className="text-xs text-muted-text mt-0.5">
                            AI discovers potential clients
                        </Typography>
                    </div>
                    <Switch
                        checked={notificationsPrefs.newLeads}
                        onChange={(checked) => setNotificationsPrefs({ ...notificationsPrefs, newLeads: checked })}
                    />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <div>
                        <Typography variant="body1" className="font-semibold text-text-main text-sm">
                            Weekly Reports
                        </Typography>
                        <Typography variant="body2" className="text-xs text-muted-text mt-0.5">
                            Performance summary every Monday
                        </Typography>
                    </div>
                    <Switch
                        checked={notificationsPrefs.weeklyReports}
                        onChange={(checked) => setNotificationsPrefs({ ...notificationsPrefs, weeklyReports: checked })}
                    />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <div>
                        <Typography variant="body1" className="font-semibold text-text-main text-sm">
                            Marketing Emails
                        </Typography>
                        <Typography variant="body2" className="text-xs text-muted-text mt-0.5">
                            Product updates and tips
                        </Typography>
                    </div>
                    <Switch
                        checked={notificationsPrefs.marketingEmails}
                        onChange={(checked) => setNotificationsPrefs({ ...notificationsPrefs, marketingEmails: checked })}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50/50 border-t border-btn-sec-border flex justify-between items-center">
                <Button
                    type="button"
                    variant="outline"
                    onClick={async () => {
                        try {
                            await sendTestNotification();
                            toast.success("Test notification request sent");
                        } catch (err) {
                            toast.error("Failed to send test notification");
                        }
                    }}
                >
                    Send Test Notification
                </Button>
                <Button type="submit" variant="primary" loading={isSavingNotifications}>
                    Save Preferences
                </Button>
            </div>
        </form>
    );
};
