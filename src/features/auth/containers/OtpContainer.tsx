import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { OtpVerifyForm } from "../components";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

export const OtpContainer: React.FC = () => {
    const navigate = useNavigate();
    const { checkOtp } = useAuth();
    const { toast } = useToast();
    const email = localStorage.getItem("reset_password_email") || "";

    useEffect(() => {
        if (!email) {
            toast.info("No pending password reset request found. Please request one first.");
            navigate("/forgot-password");
        }
    }, [email, navigate, toast]);

    const handleVerify = async (code: string) => {
        try {
            await checkOtp(email, code);
            sessionStorage.setItem("reset_password_otp", code);
            toast.success("OTP successfully verified! Set your new password.");
            navigate("/password-reset");
        } catch (error: any) {
            console.error("OTP check failed:", error);
            const detail = error.response?.data?.detail || error.response?.data?.error || "OTP is invalid or expired.";
            toast.error(detail);
        }
    };

    if (!email) return null;

    return (
        <OtpVerifyForm
            title="Enter OTP"
            description={`Verify the security code sent to ${email} to reset your password`}
            onSubmit={handleVerify}
            backPath="/forgot-password"
        />
    );
};
