import React from "react";
import { useNavigate } from "react-router";
import { RegisterForm } from "../components";

export const RegisterContainer: React.FC = () => {
    const navigate = useNavigate();

    const handleRegister = (data: { name: string; email: string; agencyName: string }) => {
        console.log("Register data submitted:", data);
        // Redirect to verify account page
        navigate("/verify-account");
    };

    return <RegisterForm onSubmit={handleRegister} />;
};
