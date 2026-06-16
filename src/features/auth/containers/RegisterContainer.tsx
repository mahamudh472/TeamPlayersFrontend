import React from "react";
import { useNavigate } from "react-router";
import { RegisterForm } from "../components";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

export const RegisterContainer: React.FC = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const { toast } = useToast();

    const handleRegister = async (data: { name: string; email: string; agencyName: string; password?: string }) => {
        try {
            await register(data.email, data.password || "", data.name, data.agencyName);
            toast.success("OTP sent to your email. Please verify your account.");
            navigate("/verify-account");
        } catch (error: any) {
            console.error("Registration failed:", error);
            const detail = error.response?.data?.detail || error.response?.data?.error || "Registration failed. Please try again.";
            toast.error(detail);
        }
    };

    return <RegisterForm onSubmit={handleRegister} />;
};
