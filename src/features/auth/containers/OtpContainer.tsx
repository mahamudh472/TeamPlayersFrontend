import React from "react";
import { useNavigate } from "react-router";
import { OtpVerifyForm } from "../components";

export const OtpContainer: React.FC = () => {
    const navigate = useNavigate();

    const handleVerify = (code: string) => {
        console.log("OTP verification code submitted:", code);
        // Redirect to password reset page
        navigate("/password-reset");
    };

    return (
        <OtpVerifyForm
            title="Enter OTP"
            description="Verify the security code sent to your email address to reset your password"
            onSubmit={handleVerify}
            backPath="/forgot-password"
        />
    );
};
