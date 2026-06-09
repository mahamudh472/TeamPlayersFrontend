import React, { useState } from "react";
import { Typography, Input, Button } from "../../../components/ui";
import { User, Mail, Lock } from "lucide-react";

export const ProfileSettings: React.FC = () => {
    const [fullName, setFullName] = useState("Demo User");
    const [email, setEmail] = useState("driver2@luxuryops.com");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [isSavingSecurity, setIsSavingSecurity] = useState(false);

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingProfile(true);
        setTimeout(() => setIsSavingProfile(false), 800);
    };

    const handleSaveSecurity = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingSecurity(true);
        setTimeout(() => {
            setIsSavingSecurity(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }, 800);
    };

    return (
        <div className="space-y-6">
            {/* Personal Information */}
            <form onSubmit={handleSaveProfile} className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs space-y-4">
                <div>
                    <Typography variant="h4" className="font-bold text-text-main">
                        Personal Information
                    </Typography>
                    <Typography variant="body2" className="text-muted-text">
                        Update your personal details
                    </Typography>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Full Name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        prefixIcon={User}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        prefixIcon={Mail}
                        required
                    />
                </div>
                <div className="space-y-1">
                    <Typography variant="body2" className="font-medium text-text-main text-sm">
                        Role
                    </Typography>
                    <Input
                        type="text"
                        value="admin"
                        disabled
                        className="bg-slate-50 cursor-not-allowed"
                    />
                </div>
                <div className="flex justify-end pt-2">
                    <Button type="submit" variant="primary" loading={isSavingProfile}>
                        Save Changes
                    </Button>
                </div>
            </form>

            {/* Security */}
            <form onSubmit={handleSaveSecurity} className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs space-y-4">
                <div>
                    <Typography variant="h4" className="font-bold text-text-main">
                        Security
                    </Typography>
                    <Typography variant="body2" className="text-muted-text">
                        Manage your password and authentication
                    </Typography>
                </div>
                <div className="space-y-4">
                    <Input
                        label="Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        prefixIcon={Lock}
                        required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            prefixIcon={Lock}
                            required
                        />
                        <Input
                            label="Confirm New Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            prefixIcon={Lock}
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-end pt-2">
                    <Button type="submit" variant="primary" loading={isSavingSecurity}>
                        Update Password
                    </Button>
                </div>
            </form>
        </div>
    );
};
