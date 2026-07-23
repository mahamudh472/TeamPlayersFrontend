import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Typography } from "../../../components/ui";
import { Search, Building2, Mail, MapPin } from "lucide-react";

interface ClientsListProps {
    clients: any[];
    searchQuery: string;
    onSearchChange: (val: string) => void;
    page: number;
    onPageChange: (val: number) => void;
    hasMore: boolean;
    hasLess: boolean;
    isLoading: boolean;
}

export const ClientsList: React.FC<ClientsListProps> = ({
    clients,
    searchQuery,
    onSearchChange,
    page,
    onPageChange,
    hasMore,
    hasLess,
    isLoading,
}) => {
    const [localQuery, setLocalQuery] = useState(searchQuery);

    // Debounce the search input updates to prevent spamming backend API
    useEffect(() => {
        const handler = setTimeout(() => {
            onSearchChange(localQuery);
        }, 300);

        return () => clearTimeout(handler);
    }, [localQuery, onSearchChange]);

    // Sync local query if parent query changes externally
    useEffect(() => {
        setLocalQuery(searchQuery);
    }, [searchQuery]);

    return (
        <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
            <div className="px-6 pt-6 pb-2">
                <div className="flex items-center justify-between">
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        All Clients
                    </Typography>
                    <div className="relative w-64">
                        {isLoading ? (
                            <svg
                                className="animate-spin absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary shrink-0"
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
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text" />
                        )}
                        <input
                            type="text"
                            value={localQuery}
                            onChange={(e) => setLocalQuery(e.target.value)}
                            className="flex h-9 w-full rounded-md border border-btn-sec-border px-3 py-1 text-sm bg-white outline-none pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                            placeholder="Search clients..."
                        />
                    </div>
                </div>
            </div>

            <div className="px-6 pb-6">
                {isLoading && clients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 min-h-[200px]">
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
                        <span className="text-sm text-muted-text mt-4">Loading clients...</span>
                    </div>
                ) : (
                    <div className={`space-y-3 transition-opacity duration-200 ${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
                        {clients.map((client) => {
                        const formattedRevenue = new Intl.NumberFormat("en-GB", {
                            style: "currency",
                            currency: "GBP",
                            maximumFractionDigits: 0,
                        }).format(client.revenue || 0);

                        return (
                            <Link
                                key={client.id}
                                to={`/dashboard/clients/${client.id}`}
                                className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-btn-sec-border rounded-xl hover:bg-slate-50/50 transition-colors"
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Building2 className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Typography variant="body1" className="font-semibold text-text-main">
                                                {client.company}
                                            </Typography>
                                            <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-semibold w-fit capitalize ${
                                                client.is_active 
                                                    ? "bg-green-50 text-green-700 border-green-200/50" 
                                                    : "bg-gray-100 text-gray-700 border-gray-200"
                                            }`}>
                                                {client.is_active ? "Active" : "Inactive"}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-text">
                                            <span>{client.industry || "No Industry"}</span>
                                            <span>{client.contact_person}</span>
                                            <span className="flex items-center gap-1">
                                                <Mail className="w-3.5 h-3.5" />
                                                {client.contact_email}
                                            </span>
                                            {client.location && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    {client.location}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 text-sm border-t border-slate-100 pt-3 md:border-0 md:pt-0">
                                    <div className="text-left md:text-right w-28 md:w-32 flex-shrink-0">
                                        <p className="text-2xl font-bold text-green-500">{formattedRevenue}</p>
                                        <p className="text-xs text-muted-text">Revenue</p>
                                    </div>
                                    <div className="text-left md:text-right w-16 md:w-20 flex-shrink-0">
                                        <p className="text-2xl font-bold text-text-main">{client.jobs || 0}</p>
                                        <p className="text-xs text-muted-text">Jobs</p>
                                    </div>
                                    <div className="text-left md:text-right w-24 md:w-28 flex-shrink-0">
                                        <p className="text-2xl font-bold text-text-main">{client.placements || 0}</p>
                                        <p className="text-xs text-muted-text">Placements</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                    {clients.length === 0 && !isLoading && (
                        <div className="p-8 text-center text-muted-text">
                            No clients found matching your search.
                        </div>
                    )}
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {(hasLess || hasMore) && (
                <div className="px-6 pb-6 flex items-center justify-between border-t border-btn-sec-border pt-4">
                    <Typography variant="body2" className="text-muted-text">
                        Page {page}
                    </Typography>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            disabled={!hasLess || isLoading}
                            onClick={() => onPageChange(page - 1)}
                            className="inline-flex items-center justify-center text-sm font-medium transition-all outline-none border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 h-9 rounded-lg px-3 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            disabled={!hasMore || isLoading}
                            onClick={() => onPageChange(page + 1)}
                            className="inline-flex items-center justify-center text-sm font-medium transition-all outline-none border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 h-9 rounded-lg px-3 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
