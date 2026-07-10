import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

export const IntegrationsCallbackContainer: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const status = searchParams.get("status");
        const provider = searchParams.get("provider");
        const message = searchParams.get("message");

        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (provider) params.append("provider", provider);
        if (message) params.append("message", message);

        navigate(`/dashboard/settings/integrations?${params.toString()}`, { replace: true });
    }, [searchParams, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
            <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl border border-btn-sec-border shadow-md">
                <svg
                    className="animate-spin text-primary w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
                <p className="text-sm font-medium text-text-main">
                    Completing integration setup, redirecting...
                </p>
            </div>
        </div>
    );
};
