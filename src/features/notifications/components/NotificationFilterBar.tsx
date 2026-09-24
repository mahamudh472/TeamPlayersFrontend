import React from "react";
import { Search, X, Filter } from "lucide-react";
import { NotificationFilterTab } from "../types";

interface NotificationFilterBarProps {
    activeTab: NotificationFilterTab;
    onTabChange: (tab: NotificationFilterTab) => void;
    totalCount: number;
    unreadCount: number;
    readCount: number;
    selectedType: string;
    onTypeChange: (type: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export const NotificationFilterBar: React.FC<NotificationFilterBarProps> = ({
    activeTab,
    onTabChange,
    totalCount,
    unreadCount,
    readCount,
    selectedType,
    onTypeChange,
    searchQuery,
    onSearchChange,
}) => {
    const categories = [
        { label: "All Types", value: "all" },
        { label: "Applications", value: "application" },
        { label: "Interviews", value: "interview" },
        { label: "Leads", value: "lead" },
        { label: "Placements", value: "placement" },
        { label: "Jobs", value: "job" },
        { label: "System", value: "system" },
    ];

    return (
        <div className="bg-white p-4 rounded-xl border border-btn-sec-border shadow-xs space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Status Tabs */}
                <div className="bg-slate-100/80 p-1 rounded-lg flex items-center gap-1 w-fit">
                    <button
                        type="button"
                        onClick={() => onTabChange("all")}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                            activeTab === "all"
                                ? "bg-white text-text-main shadow-xs"
                                : "text-muted-text hover:text-text-main"
                        }`}
                    >
                        <span>All</span>
                        <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                                activeTab === "all"
                                    ? "bg-slate-100 text-slate-800"
                                    : "bg-slate-200 text-slate-600"
                            }`}
                        >
                            {totalCount}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => onTabChange("unread")}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                            activeTab === "unread"
                                ? "bg-white text-primary shadow-xs"
                                : "text-muted-text hover:text-text-main"
                        }`}
                    >
                        <span>Unread</span>
                        <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                                activeTab === "unread"
                                    ? "bg-primary text-white"
                                    : unreadCount > 0
                                    ? "bg-primary/20 text-primary"
                                    : "bg-slate-200 text-slate-600"
                            }`}
                        >
                            {unreadCount}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => onTabChange("read")}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                            activeTab === "read"
                                ? "bg-white text-text-main shadow-xs"
                                : "text-muted-text hover:text-text-main"
                        }`}
                    >
                        <span>Read</span>
                        <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                                activeTab === "read"
                                    ? "bg-slate-100 text-slate-800"
                                    : "bg-slate-200 text-slate-600"
                            }`}
                        >
                            {readCount}
                        </span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-xs">
                    <Search className="w-4 h-4 text-light-text absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search notifications..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-9 pr-8 py-1.5 bg-slate-50 border border-btn-sec-border rounded-lg text-xs text-text-main placeholder:text-light-text outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => onSearchChange("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-light-text hover:text-text-main cursor-pointer"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 scrollbar-none text-xs">
                <span className="text-[11px] font-semibold text-muted-text flex items-center gap-1 shrink-0 mr-1">
                    <Filter className="w-3 h-3" />
                    Type:
                </span>
                {categories.map((cat) => (
                    <button
                        key={cat.value}
                        type="button"
                        onClick={() => onTypeChange(cat.value)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                            selectedType === cat.value
                                ? "bg-primary text-white border-primary shadow-xs font-semibold"
                                : "bg-white text-slate-600 border-btn-sec-border hover:bg-slate-50"
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
