import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
    label: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ label }) => {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm font-medium text-muted-text hover:text-background-main hover:bg-primary px-3 py-1.5 rounded-lg gap-1.5 transition-colors w-fit cursor-pointer"
        >
            <ArrowLeft className="w-4 h-4" />
            {label}
        </button>
    );
};
