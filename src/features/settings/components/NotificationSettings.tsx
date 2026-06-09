import React, { useState } from "react";
import { Typography, Button } from "../../../components/ui";

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

export const NotificationSettings: React.FC = () => {
    const [isSavingNotifications, setIsSavingNotifications] = useState(false);
    const [notificationsPrefs, setNotificationsPrefs] = useState({
        newApplications: true,
        interviewReminders: true,
        newLeads: true,
        weeklyReports: false,
        marketingEmails: false,
    });

    const handleSaveNotifications = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingNotifications(true);
        setTimeout(() => setIsSavingNotifications(false), 800);
    };

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
            <div className="p-6 bg-slate-50/50 border-t border-btn-sec-border flex justify-end">
                <Button type="submit" variant="primary" loading={isSavingNotifications}>
                    Save Preferences
                </Button>
            </div>
        </form>
    );
};
