import React from "react";
import { useNavigate } from "react-router";
import { PasswordResetForm } from "../components";

export const PasswordResetContainer: React.FC = () => {
    const navigate = useNavigate();

    const handleReset = (password: string) => {
        console.log("Password reset successfully to:", password);
        // Redirect to login
        navigate("/login");
    };

    return <PasswordResetForm onSubmit={handleReset} />;
};
