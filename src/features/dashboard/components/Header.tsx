import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Button, Input, Typography } from "../../../components/ui";
import { Bell, Settings, LogOut } from "lucide-react";
import { NotificationModal } from "./NotificationModal";

export const Header: React.FC = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="h-16 flex items-center justify-between px-8 shrink-0 gap-4 border-b-btn-sec-border border-b bg-white">
            <Input
                className="border-none"
                placeholder="Search candidates, jobs, cientss..."
            />
            <div className="flex items-center gap-4">
                <div className="relative flex items-center" ref={notificationRef}>
                    <Button
                        variant="icon"
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                        className="cursor-pointer"
                    >
                        <Bell size={18} />
                    </Button>
                    <NotificationModal
                        isOpen={isNotificationOpen}
                        onClose={() => setIsNotificationOpen(false)}
                    />
                </div>

                <div className="relative" ref={dropdownRef}>
                    <Button
                        variant="outline"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 justify-start text-left shrink-0 cursor-pointer"
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

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-btn-sec-border shadow-lg py-1 z-50 animate-in fade-in-0 slide-in-from-top-1 duration-150">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    navigate("/dashboard/settings");
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-text-main hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer font-medium"
                            >
                                <Settings size={16} className="text-muted-text" />
                                <Typography variant="body2" component="span" className="font-semibold text-text-main">
                                    Settings
                                </Typography>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    navigate("/login");
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer border-t border-slate-100"
                            >
                                <LogOut size={16} className="text-red-500" />
                                <Typography variant="body2" component="span" className="font-semibold text-red-600">
                                    Logout
                                </Typography>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
