import React, { useState } from "react";
import {
    Typography,
    Input,
    Checkbox,
    AppBadge,
    Button,
    PageHeader,
} from "../../../components/ui";
import { CheckCircle2, RefreshCw, User, Mail, Lock } from "lucide-react";

export const SettingsContainer: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccess(false);

        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
        }, 1500);
    };

    return (
        <div className="max-w-4xl space-y-8">
            <PageHeader
                title="Settings"
                subtitle="Manage your personal profile, security configuration, and email notifications."
                rightElement={
                    <div className="flex gap-2">
                        <AppBadge
                            variant="primary"
                            prefixIcon={<CheckCircle2 className="w-3 h-3" />}
                        >
                            Verified Profile
                        </AppBadge>
                        <AppBadge variant="secondary">Enterprise</AppBadge>
                    </div>
                }
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Information Card */}
                <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs space-y-6">
                    <Typography
                        variant="h4"
                        className="font-bold border-b border-btn-sec-border pb-3"
                    >
                        Profile Information
                    </Typography>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="Noah Moore"
                            defaultValue="Noah Moore"
                            prefixIcon={User}
                            required
                        />
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="noah.moore@agency.com"
                            defaultValue="noah.moore@agency.com"
                            prefixIcon={Mail}
                            required
                        />
                    </div>
                </div>

                {/* Security Preferences Card */}
                <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs space-y-6">
                    <Typography
                        variant="h4"
                        className="font-bold border-b border-btn-sec-border pb-3"
                    >
                        Security & Preferences
                    </Typography>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="New Password"
                            type="password"
                            placeholder="••••••••••••"
                            prefixIcon={Lock}
                            helperText="Must be at least 8 characters long."
                        />
                        <Input
                            label="Confirm New Password"
                            type="password"
                            placeholder="••••••••••••"
                            prefixIcon={Lock}
                        />
                    </div>

                    <div className="space-y-4 pt-2 border-t border-btn-sec-border">
                        <Checkbox
                            label="Enable Real-Time Email Notifications"
                            defaultChecked
                        />
                        <Checkbox
                            label="Require Multi-Factor Authentication (MFA) on sign-in"
                            defaultChecked
                        />
                        <Checkbox label="Opt-in to monthly recruitment report emails" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-btn-sec-border">
                    <Button type="button" variant="secondary">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        loading={isSubmitting}
                        prefixIcon={RefreshCw}
                    >
                        {success ? "Saved successfully!" : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
};
