import React, { useState, useEffect } from "react";
import { Typography, Input, Button } from "../../../components/ui";
import { User, Mail, Lock } from "lucide-react";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

export const ProfileSettings: React.FC = () => {
    const { user, updateProfile, changePassword } = useAuth();
    const { toast } = useToast();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [isSavingSecurity, setIsSavingSecurity] = useState(false);

    useEffect(() => {
        if (user) {
            setFullName(user.full_name);
            setEmail(user.email);
            setAvatarPreview(user.avatar || "");
            setAvatarFile(null);
        }
    }, [user]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingProfile(true);
        try {
            await updateProfile(fullName, avatarFile);
            toast.success("Profile updated successfully!");
        } catch (error: any) {
            console.error("Profile update failed:", error);
            const detail = error.response?.data?.detail || error.response?.data?.error || "Failed to update profile.";
            toast.error(detail);
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handleSaveSecurity = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.warning("New passwords do not match.");
            return;
        }
        setIsSavingSecurity(true);
        try {
            await changePassword(currentPassword, newPassword, confirmPassword);
            toast.success("Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            console.error("Security update failed:", error);
            const detail = error.response?.data?.detail || error.response?.data?.error || "Failed to update password.";
            toast.error(detail);
        } finally {
            setIsSavingSecurity(false);
        }
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
                        disabled
                        className="bg-slate-50 cursor-not-allowed"
                        prefixIcon={Mail}
                        required
                    />
                </div>
                <div className="space-y-1.5">
                    <Typography variant="body2" className="font-semibold text-text-main text-sm">
                        Avatar Image
                    </Typography>
                    <div className="flex gap-4 items-center">
                        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-base font-bold overflow-hidden shrink-0 border border-btn-sec-border">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                            ) : fullName ? (
                                fullName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()
                                    .slice(0, 2)
                            ) : (
                                "U"
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="avatar-file-input"
                            />
                            <label
                                htmlFor="avatar-file-input"
                                className="cursor-pointer bg-white hover:bg-slate-50 text-text-main text-xs font-semibold py-2 px-3 rounded-lg border border-btn-sec-border transition-all shadow-xs inline-flex items-center gap-1.5 w-fit select-none"
                            >
                                <span>Choose Profile Image</span>
                            </label>
                            <span className="text-[11px] text-light-text leading-none mt-1">
                                {avatarFile ? `Selected: ${avatarFile.name}` : "Support images up to 5MB."}
                            </span>
                        </div>
                    </div>
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
