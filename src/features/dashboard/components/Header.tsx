import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Button, Typography } from "../../../components/ui";
import { Bell, Search, Settings, LogOut } from "lucide-react";
import { NotificationModal } from "./NotificationModal";
import { SearchModal } from "./SearchModal";
import { useAuth } from "../../../shared/context/AuthContext";
import { apiClient } from "../../../shared/api/apiClient";

interface Agency {
    agency_id: number | string;
    agency_name: string;
    role: string;
}

export const Header: React.FC = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [showAllAgencies, setShowAllAgencies] = useState(false);
    const [selectedAgencyId, setSelectedAgencyId] = useState<number | string>("");

    useEffect(() => {
        if (user) {
            const storedId = localStorage.getItem("selected_agency_id");
            if (storedId) {
                setSelectedAgencyId(storedId);
            } else if (user.agency_id) {
                setSelectedAgencyId(user.agency_id);
                localStorage.setItem("selected_agency_id", String(user.agency_id));
            }
        }
    }, [user]);

    useEffect(() => {
        const fetchAgencies = async () => {
            try {
                const response = await apiClient.get<Agency[]>("/api/v1/agency/");
                setAgencies(response.data);
            } catch (error) {
                console.error("Failed to fetch agencies:", error);
            }
        };

        if (user) {
            fetchAgencies();
        }

        const handleAgencyUpdate = () => {
            if (user) {
                fetchAgencies();
            }
        };

        window.addEventListener("agency-updated", handleAgencyUpdate);
        return () => {
            window.removeEventListener("agency-updated", handleAgencyUpdate);
        };
    }, [user]);

    const selectedAgency = agencies.find(a => String(a.agency_id) === String(selectedAgencyId)) || agencies[0];

    const handleSelectAgency = (agency: Agency) => {
        localStorage.setItem("selected_agency_id", String(agency.agency_id));
        setSelectedAgencyId(agency.agency_id);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
                setShowAllAgencies(false);
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

    // Ctrl+K / Cmd+K keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <header className="h-16 flex items-center justify-between px-8 shrink-0 gap-4 border-b-btn-sec-border border-b bg-white">
                {/* Search Trigger */}
                <button
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    className="flex items-center gap-3 flex-1 cursor-pointer text-left"
                >
                    <Search className="w-4 h-4 text-muted-text shrink-0" />
                    <span className="text-sm text-muted-text flex-1">Search candidates, jobs, clients...</span>
                    <kbd className="hidden sm:inline-flex items-center gap-0.5 bg-slate-100 border border-btn-sec-border px-1.5 py-0.5 rounded text-[10px] font-mono text-muted-text">
                        ⌘K
                    </kbd>
                </button>

                <div className="flex items-center gap-4">
                    {/* Notification Bell */}
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

                    {/* User Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <Button
                            variant="outline"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 justify-start text-left shrink-0 cursor-pointer"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden border border-btn-sec-border">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : user?.full_name ? (
                                    user.full_name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")
                                          .toUpperCase()
                                          .slice(0, 2)
                                ) : (
                                    "U"
                                )}
                            </div>
                            <div className="flex flex-col min-w-0 grow">
                                <Typography
                                    variant="body2"
                                    className="truncate font-bold leading-tight text-text-main"
                                >
                                    {user?.full_name || "User"}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    className="truncate text-light-text leading-none capitalize"
                                >
                                    {selectedAgency?.role || user?.role || "owner"}
                                </Typography>
                            </div>
                        </Button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg border border-btn-sec-border shadow-lg py-1 z-50 animate-in fade-in-0 slide-in-from-top-1 duration-150">
                                {/* Left selectable agencies panel */}
                                {showAllAgencies && agencies.length > 0 && (
                                    <div className="absolute right-full top-0 mr-2 w-56 bg-white rounded-lg border border-btn-sec-border shadow-lg py-1 z-50 animate-in fade-in-0 slide-in-from-right-1 duration-150">
                                        <div className="px-4 py-2 border-b border-slate-100">
                                            <span className="text-[10px] font-bold text-muted-text uppercase tracking-wider">
                                                Select Agency
                                            </span>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto py-1">
                                            {agencies.map((agency) => {
                                                const isSelected = String(agency.agency_id) === String(selectedAgencyId);
                                                return (
                                                    <button
                                                        key={agency.agency_id}
                                                        type="button"
                                                        onClick={() => handleSelectAgency(agency)}
                                                        className={`w-full text-left px-4 py-2.5 text-xs flex flex-col gap-0.5 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100/50 last:border-b-0 ${
                                                            isSelected ? "bg-primary/5 font-semibold" : ""
                                                        }`}
                                                    >
                                                        <div className="flex items-center justify-between gap-1 w-full">
                                                            <span className={`truncate ${isSelected ? "text-primary font-bold" : "text-text-main"}`}>
                                                                {agency.agency_name}
                                                            </span>
                                                            {isSelected && (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
                                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span className="text-[10px] text-light-text capitalize leading-none mt-0.5">
                                                            {agency.role}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Active Agency section */}
                                {agencies.length > 0 && (
                                    <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] font-bold text-muted-text uppercase tracking-wider">
                                                Active Agency
                                            </span>
                                            {agencies.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowAllAgencies(!showAllAgencies);
                                                    }}
                                                    className="text-[10px] font-bold text-accent hover:underline cursor-pointer"
                                                >
                                                    {showAllAgencies ? "Close" : "View All"}
                                                </button>
                                            )}
                                        </div>
                                        
                                        {selectedAgency && (
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs font-bold text-text-main truncate">
                                                    {selectedAgency.agency_name}
                                                </span>
                                                <span className="text-[10px] text-light-text font-semibold capitalize leading-none mt-0.5">
                                                    {selectedAgency.role}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        setShowAllAgencies(false);
                                        navigate("/dashboard/settings");
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-text-main hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer font-medium"
                                >
                                    <Settings size={16} className="text-muted-text" />
                                    <Typography variant="body2" component="span" className="font-semibold text-text-main">
                                        Settings
                                    </Typography>
                                </button>
                                <button
                                    type="button"
                                    onClick={async () => {
                                        setIsDropdownOpen(false);
                                        setShowAllAgencies(false);
                                        await logout();
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer border-t border-slate-100"
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

            {/* Search Modal (rendered outside header for proper overlay) */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};
