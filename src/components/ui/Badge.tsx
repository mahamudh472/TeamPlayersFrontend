import React from "react";

export interface AppBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "primary" | "secondary" | "outline" | "neutral";
    prefixIcon?: React.ReactNode;
}

export const AppBadge: React.FC<AppBadgeProps> = ({
    variant = "primary",
    prefixIcon,
    className = "",
    children,
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold tracking-wide transition-colors duration-200 shrink-0";

    const variants = {
        // Primary: Background #14B8A61A, Text #14B8A6
        primary: "bg-primary text-background-main border border-primary/15",
        // Secondary: Background #F8FAFC, Border #E2E8F0, Text #1E293B
        secondary: "bg-btn-sec-bg text-btn-sec-text border border-btn-sec-border",
        // Outline: Transparent background, Border #14B8A6, Text #14B8A6
        outline: "bg-transparent text-primary border border-primary",
        // Neutral: Gray theme
        neutral:
            "bg-gray-100 text-gray-700 border border-gray-200",
    };

    return (
        <span
            className={`${baseStyles} ${variants[variant]} ${className}`.trim()}
            {...props}
        >
            {prefixIcon && (
                <span className="shrink-0 flex items-center justify-center">
                    {prefixIcon}
                </span>
            )}
            {children}
        </span>
    );
};
