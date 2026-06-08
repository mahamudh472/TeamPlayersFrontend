import React from "react";
import { LucideIcon } from "lucide-react";
import { Typography } from "./Typography";
import { Button } from "./Button";

export interface PageHeaderAction {
    title: string;
    icon?: LucideIcon;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "ghost" | "outline";
}

export interface PageHeaderProps {
    title: string;
    subtitle?: string;
    action?: PageHeaderAction | null;
    rightElement?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    subtitle,
    action,
    rightElement,
}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
                <Typography variant="h3">{title}</Typography>
                {subtitle && <Typography variant="body2">{subtitle}</Typography>}
            </div>
            <div className="flex items-center gap-3 shrink-0">
                {rightElement
                    ? rightElement
                    : action && (
                        <Button
                            variant={action.variant || "primary"}
                            prefixIcon={action.icon}
                            onClick={action.onClick}
                        >
                            {action.title}
                        </Button>
                    )}
            </div>
        </div>
    );
};
