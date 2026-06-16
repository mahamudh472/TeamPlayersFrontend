import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { PasswordResetForm } from "../components";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

export const PasswordResetContainer: React.FC = () => {
    const navigate = useNavigate();
    const { confirmPasswordReset } = useAuth();
    const { toast } = useToast();
    const email = localStorage.getItem("reset_password_email") || "";
    const otp = sessionStorage.getItem("reset_password_otp") || "";

    useEffect(() => {
        if (!email || !otp) {
            toast.info("No verified OTP found. Please verify your OTP first.");
            navigate("/forgot-password");
        }
    }, [email, otp, navigate, toast]);

    const handleReset = async (password: string) => {
        try {
            await confirmPasswordReset(email, otp, password);
            sessionStorage.removeItem("reset_password_otp");
            toast.success("Password successfully reset! Please log in with your new password.");
            navigate("/login");
        } catch (error: any) {
            console.error("Password reset confirmation failed:", error);
            const detail = error.response?.data?.detail || error.response?.data?.error || "Password reset failed. Please try again.";
            toast.error(detail);
        }
    };

    if (!email || !otp) return null;

    return <PasswordResetForm onSubmit={handleReset} />;
};
