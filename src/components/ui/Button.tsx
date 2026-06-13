import React from "react";
import { LucideIcon } from "lucide-react";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline" | "icon" | "link";
    size?: "sm" | "md" | "lg";
    prefixIcon?: LucideIcon;
    suffixIcon?: LucideIcon;
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "md",
    prefixIcon: PrefixIcon,
    suffixIcon: SuffixIcon,
    loading = false,
    disabled,
    className = "",
    children,
    ...props
}) => {
    const baseStyles =
        `inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none pointer-cursor ${
            variant === "link" ? "" : "rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary active:scale-98"
        }`.trim();

    const variants = {
        // Primary: Selected Button (#14B8A6), Text: White (#FFFFFF)
        primary:
            "bg-primary text-white hover:bg-primary/90 shadow-sm focus:ring-primary",
        // Secondary: Background #F8FAFC, Border #E2E8F0 (1px), Text #1E293B
        secondary:
            "bg-btn-sec-bg border border-btn-sec-border text-btn-sec-text hover:bg-btn-sec-bg/85 hover:border-btn-sec-border/95 shadow-xs focus:ring-btn-sec-border",
        // Outline: Transparent background, Border #E2E8F0 (1px), Text #1E293B
        outline:
            "border border-btn-sec-border bg-transparent text-btn-sec-text hover:bg-btn-sec-bg shadow-xs focus:ring-btn-sec-border",
        // Ghost: Foreground color / Navbar button (non-selected) (#252A31), no background
        ghost:
            "text-nav-inactive hover:bg-primary-light hover:text-primary focus:ring-primary/20",
        // Icon: Aspect-square button with dynamic overlay highlight on hover
        icon: "text-current hover:bg-current/10 aspect-square focus:ring-primary/20",
        // Link: Unstyled / minimal padding, underline on hover, bg-transparent
        link: "bg-transparent hover:underline",
    };

    const sizes = {
        sm: variant === "icon" ? "h-8 w-8 p-1.5" : variant === "link" ? "p-0 text-xs" : "px-3 py-1.5 text-xs gap-1.5",
        md: variant === "icon" ? "h-10 w-10 p-2" : variant === "link" ? "p-0 text-sm" : "px-4 py-2 text-sm gap-2",
        lg: variant === "icon" ? "h-12 w-12 p-2.5" : variant === "link" ? "p-0 text-base" : "px-6 py-3 text-base gap-2.5",
    };

    const iconSizes = {
        sm: "w-3.5 h-3.5",
        md: "w-4.5 h-4.5",
        lg: "w-5 h-5",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <svg
                    className="animate-spin text-current shrink-0 w-4 h-4"
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
            ) : (
                PrefixIcon && <PrefixIcon className={`${iconSizes[size]} shrink-0`} />
            )}
            {children}
            {!loading && SuffixIcon && (
                <SuffixIcon className={`${iconSizes[size]} shrink-0`} />
            )}
        </button>
    );
};
