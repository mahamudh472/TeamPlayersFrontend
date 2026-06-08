import React from "react";
import { Button, Input, Typography } from "../../../components/ui";
import { Bell } from "lucide-react";

export const Header: React.FC = () => {
    return (
        <header className="h-16 flex items-center justify-between px-8 shrink-0 gap-4 border-b-btn-sec-border border-b bg-white">
            <Input
                className="border-none"
                placeholder="Search candidates, jobs, cientss..."
            />
            <div className="flex items-center gap-4">
                <Button variant="icon">
                    <Bell size={18} />
                </Button>
                <Button
                    variant="outline"
                    className="flex items-center gap-2 justify-start text-left shrink-0"
                >
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                        JD
                    </div>
                    <div className="flex flex-col min-w-0 grow">
                        <Typography
                            variant="body2"
                            className="truncate font-bold leading-tight text-text-main"
                        >
                            John Doe
                        </Typography>
                        <Typography
                            variant="caption"
                            className="truncate text-light-text leading-none"
                        >
                            Recruiter
                        </Typography>
                    </div>
                </Button>
            </div>
        </header>
    );
};
