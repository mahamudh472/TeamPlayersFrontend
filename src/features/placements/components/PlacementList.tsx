import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Typography, Tabs, TabOption, AppBadge, Button } from "../../../components/ui";
import { Users, Briefcase, Calendar, Search } from "lucide-react";

import { PlacementListProps } from "../types";

export const PlacementList: React.FC<PlacementListProps> = ({
    placements,
    activeTab,
    onTabChange,
    searchQuery,
    onSearchChange,
    page,
    onPageChange,
    hasMore,
    hasLess,
    isLoading,
    allCount,
    offersCount,
    activeCount,
}) => {
    const [localQuery, setLocalQuery] = useState(searchQuery);

    // Debounce search query update
    useEffect(() => {
        const handler = setTimeout(() => {
            onSearchChange(localQuery);
        }, 300);

        return () => clearTimeout(handler);
    }, [localQuery, onSearchChange]);

    // Keep local query in sync if it changes from outside
    useEffect(() => {
        setLocalQuery(searchQuery);
    }, [searchQuery]);

    const tabOptions: TabOption[] = [
        { label: `All Placements (${allCount})`, value: "all" },
        { label: `Offers (${offersCount})`, value: "offers" },
        { label: `Active (${activeCount})`, value: "active" },
    ];

    const getBadgeVariant = (status: string): "primary" | "secondary" | "outline" | "neutral" => {
        switch (status.toLowerCase()) {
            case "started":
            case "offer accepted":
            case "accepted":
            case "placed":
                return "primary";
            case "guarantee period":
            case "offer sent":
            case "offered":
                return "secondary";
            default:
                return "neutral";
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <Tabs
                options={tabOptions}
                value={activeTab}
                onChange={onTabChange}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2 mt-2">
                <Typography variant="h4" className="font-bold text-text-main leading-none">
                    Placements List
                </Typography>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-text" />
                    <input
                        type="text"
                        value={localQuery}
                        onChange={(e) => setLocalQuery(e.target.value)}
                        className="flex h-9 w-full rounded-md border border-btn-sec-border px-3 py-1 text-sm bg-white outline-none pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="Search placements..."
                    />
                </div>
            </div>

            {isLoading && placements.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 min-h-[200px] bg-white rounded-xl border border-btn-sec-border">
                    <svg
                        className="animate-spin text-primary shrink-0 w-8 h-8"
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
                    <span className="text-sm text-muted-text mt-4">Loading placements...</span>
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-xl border border-btn-sec-border overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-btn-sec-border bg-slate-50/50">
                                        <th className="p-4 font-semibold text-text-main">Candidate</th>
                                        <th className="p-4 font-semibold text-text-main">Position</th>
                                        <th className="p-4 font-semibold text-text-main">Client</th>
                                        <th className="p-4 font-semibold text-text-main">Salary</th>
                                        <th className="p-4 font-semibold text-text-main">Placed Date</th>
                                        <th className="p-4 font-semibold text-text-main">Status</th>
                                        <th className="p-4 font-semibold text-text-main"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-btn-sec-border">
                                    {placements.map((p, index) => (
                                        <tr key={p.id + "-" + index} className="hover:bg-slate-50/30 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-primary shrink-0">
                                                        <Users className="w-4 h-4" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <Typography variant="body2" className="font-semibold text-text-main leading-snug">
                                                            {p.candidateName}
                                                        </Typography>
                                                        <Typography variant="caption" className="text-xs text-muted-text block">
                                                            {p.candidateEmail}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-text-main font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Briefcase className="w-4 h-4 text-muted-text shrink-0" />
                                                    <span className="truncate">{p.position}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-text-main">{p.client}</td>
                                            <td className="p-4 text-text-main font-medium">
                                                {parseFloat(p.salary) ? `£${parseFloat(p.salary).toLocaleString()}` : p.salary}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-muted-text">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{p.placedDate}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <AppBadge variant={getBadgeVariant(p.status)}>
                                                    {p.status}
                                                </AppBadge>
                                            </td>
                                            <td className="p-4 text-right">
                                                <Link to={`/dashboard/candidates/${p.candidateId}`}>
                                                    <Button variant="outline" size="sm">
                                                        View
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {placements.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-muted-text">
                                                No placements found in this category.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    {(hasLess || hasMore) && (
                        <div className="px-6 py-4 flex items-center justify-between border border-btn-sec-border bg-white rounded-xl mt-4">
                            <Typography variant="body2" className="text-muted-text font-medium">
                                Page {page}
                            </Typography>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    disabled={!hasLess || isLoading}
                                    onClick={() => onPageChange(page - 1)}
                                    className="inline-flex items-center justify-center text-sm font-semibold transition-all outline-none border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 h-9 rounded-lg px-3 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    disabled={!hasMore || isLoading}
                                    onClick={() => onPageChange(page + 1)}
                                    className="inline-flex items-center justify-center text-sm font-semibold transition-all outline-none border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 h-9 rounded-lg px-3 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
