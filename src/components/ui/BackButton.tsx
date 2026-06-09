import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
    label: string;
    to?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ label, to }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };

    return (
        <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center text-sm font-medium text-muted-text hover:text-background-main hover:bg-primary px-3 py-1.5 rounded-lg gap-1.5 transition-colors w-fit cursor-pointer"
        >
            <ArrowLeft className="w-4 h-4" />
            {label}
        </button>
    );
};
