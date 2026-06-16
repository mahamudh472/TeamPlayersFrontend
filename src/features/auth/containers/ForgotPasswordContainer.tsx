import React from "react";
import { useNavigate } from "react-router";
import { ForgotPasswordForm } from "../components";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

export const ForgotPasswordContainer: React.FC = () => {
    const navigate = useNavigate();
    const { sendPasswordReset } = useAuth();
    const { toast } = useToast();

    const handleForgotPassword = async (email: string) => {
        try {
            await sendPasswordReset(email);
            toast.success("OTP sent to your email. Please check your inbox.");
            navigate("/otp");
        } catch (error: any) {
            console.error("Password reset request failed:", error);
            const detail = error.response?.data?.detail || error.response?.data?.error || "User with this email does not exist.";
            toast.error(detail);
        }
    };

    return <ForgotPasswordForm onSubmit={handleForgotPassword} />;
};
