import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { OtpVerifyForm } from "../components";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

export const VerifyAccountContainer: React.FC = () => {
    const navigate = useNavigate();
    const { verifyEmail } = useAuth();
    const { toast } = useToast();
    const email = localStorage.getItem("pending_verification_email") || "";

    useEffect(() => {
        if (!email) {
            toast.info("No pending registration email found. Please sign up first.");
            navigate("/register");
        }
    }, [email, navigate, toast]);

    const handleVerify = async (code: string) => {
        try {
            await verifyEmail(email, code);
            toast.success("Email successfully verified! You can now log in.");
            navigate("/login");
        } catch (error: any) {
            console.error("Verification failed:", error);
            const detail = error.response?.data?.detail || error.response?.data?.error || "Invalid verification code.";
            toast.error(detail);
        }
    };

    if (!email) return null;

    return (
        <OtpVerifyForm
            title="Verify Your Account"
            description={`Verify your account to complete registration. Please enter the verification code sent to ${email}`}
            onSubmit={handleVerify}
            backPath="/register"
        />
    );
};
