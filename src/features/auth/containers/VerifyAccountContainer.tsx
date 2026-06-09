import React from "react";
import { useNavigate } from "react-router";
import { OtpVerifyForm } from "../components";

export const VerifyAccountContainer: React.FC = () => {
    const navigate = useNavigate();

    const handleVerify = (code: string) => {
        console.log("Account verification OTP submitted:", code);
        // Redirect to onboarding welcome
        navigate("/onboarding/welcome");
    };

    return (
        <OtpVerifyForm
            title="Verify Your Account"
            description="Verify your account to complete registration. Please enter the verification code sent to your email address"
            onSubmit={handleVerify}
            backPath="/register"
        />
    );
};
