import React from "react";
import { useNavigate } from "react-router";
import { LoginForm } from "../components";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

export const LoginContainer: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { toast } = useToast();

    const handleLogin = async (email: string, password: string, remember: boolean) => {
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (error: any) {
            console.error("Login failed:", error);
            const detail = error.response?.data?.detail || error.response?.data?.error || "Login failed. Please check your credentials.";
            toast.error(detail);
            
            if (error.response?.data?.code === "EMAIL_NOT_VERIFIED") {
                navigate("/verify-account");
            }
        }
    };

    return <LoginForm onSubmit={handleLogin} />;
};
