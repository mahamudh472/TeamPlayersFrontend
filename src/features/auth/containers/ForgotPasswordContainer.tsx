import React from "react";
import { useNavigate } from "react-router";
import { ForgotPasswordForm } from "../components";

export const ForgotPasswordContainer: React.FC = () => {
    const navigate = useNavigate();

    const handleForgotPassword = (email: string) => {
        console.log("Forgot password submitted for email:", email);
        // Redirect to OTP verification page
        navigate("/otp");
    };

    return <ForgotPasswordForm onSubmit={handleForgotPassword} />;
};
