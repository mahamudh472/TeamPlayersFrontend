import React from "react";
import { useNavigate } from "react-router";
import { LoginForm } from "../components";

export const LoginContainer: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = (email: string, password: string, remember: boolean) => {
        console.log("Login credentials submitted:", { email, password, remember });
        // Redirect to dashboard
        navigate("/dashboard");
    };

    return <LoginForm onSubmit={handleLogin} />;
};
