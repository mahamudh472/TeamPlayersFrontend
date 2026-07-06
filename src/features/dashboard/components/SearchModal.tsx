import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Typography, Button } from "../../../components/ui";
import { Search, X, Briefcase, Users, Building2, Target, Loader2 } from "lucide-react";
import { SearchModalProps, SearchResult } from "../types";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";
import { apiClient } from "../../../shared/api/apiClient";

const typeIcons = {
    candidate: Users,
    job: Briefcase,
    client: Building2,
    lead: Target,
};

const typeLabels = {
    candidate: "Candidate",
    job: "Job",
    client: "Client",
    lead: "Lead",
};

const mapSourceToType = (source: string): "candidate" | "job" | "client" | "lead" => {
    const s = source.toLowerCase();
    if (s === "leads" || s === "lead") return "lead";
    if (s === "candidates" || s === "candidate") return "candidate";
    if (s === "clients" || s === "client") return "client";
    if (s === "jobs" || s === "job") return "job";
    return "candidate";
};

export const SearchModal: React.FC<SearchModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const { toast } = useToast();
    
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    // Load recent searches from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("recent_searches");
        if (stored) {
            try {
                setRecentSearches(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse recent searches:", e);
            }
        }
    }, []);

    // Debounce the search input query
    useEffect(() => {
        if (!query.trim()) {
            setDebouncedQuery("");
            setResults([]);
            setError(null);
            setIsLoading(false);
            return;
        }

        const handler = setTimeout(() => {
            setDebouncedQuery(query.trim());
        }, 300);

        return () => clearTimeout(handler);
    }, [query]);

    // Fetch search results from backend API when debouncedQuery changes
    useEffect(() => {
        if (!debouncedQuery) {
            setResults([]);
            setError(null);
            return;
        }

        if (!agencyId) {
            setError("Agency selection is required. Please select or join an agency.");
            return;
        }

        const controller = new AbortController();

        const performSearch = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiClient.get<any[]>("/api/v1/main/search/", {
                    headers: { "X-Agency-ID": String(agencyId) },
                    params: { query: debouncedQuery },
                    signal: controller.signal,
                });

                const mapped: SearchResult[] = response.data.map((item: any) => ({
                    id: String(item.object_id),
                    label: item.title,
                    type: mapSourceToType(item.result_source),
                    subtitle: item.description,
                }));
                setResults(mapped);
            } catch (err: any) {
                if (axios.isCancel(err)) {
                    return;
                }
                console.error("Search failed:", err);
                const errMsg = err.response?.data?.error || err.response?.data?.detail || "Failed to fetch search results";
                setError(errMsg);
                toast.error(errMsg);
            } finally {
                setIsLoading(false);
            }
        };

        performSearch();

        return () => {
            controller.abort();
        };
    }, [debouncedQuery, agencyId, toast]);

    const displayResults = debouncedQuery ? results : recentSearches;

    const handleClearRecent = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setRecentSearches([]);
        localStorage.removeItem("recent_searches");
    }, []);

    const handleSelect = useCallback(
        (result: SearchResult) => {
            onClose();

            // Save to recent searches history in localStorage
            setRecentSearches((prev) => {
                const filtered = prev.filter((item) => !(item.id === result.id && item.type === result.type));
                const updated = [result, ...filtered].slice(0, 5);
                localStorage.setItem("recent_searches", JSON.stringify(updated));
                return updated;
            });

            if (result.type === "candidate") {
                navigate(`/dashboard/candidates/${result.id}`);
            } else if (result.type === "job") {
                navigate(`/dashboard/jobs/${result.id}`);
            } else if (result.type === "client") {
                navigate(`/dashboard/clients/${result.id}`);
            } else if (result.type === "lead") {
                navigate("/dashboard/leads");
            } else {
                navigate("/dashboard");
            }
        },
        [navigate, onClose],
    );

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
        if (!isOpen) {
            setQuery("");
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            }
            if (e.key === "Enter" && displayResults.length > 0) {
                e.preventDefault();
                handleSelect(displayResults[0]);
            }
        };

        document.addEventListener("keydown", handleKeyDown, true);
        return () => document.removeEventListener("keydown", handleKeyDown, true);
    }, [isOpen, onClose, displayResults, handleSelect]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 z-[60] animate-in fade-in-0 duration-150"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[70] animate-in fade-in-0 slide-in-from-top-2 duration-200">
                <div className="bg-white rounded-xl border border-btn-sec-border shadow-2xl overflow-hidden">
                    {/* Search Input */}
                    <div className="flex items-center gap-3 px-4 border-b border-slate-100">
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 text-primary animate-spin shrink-0" />
                        ) : (
                            <Search className="w-5 h-5 text-muted-text shrink-0" />
                        )}
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search candidates, jobs, clients..."
                            className="flex-1 h-14 text-sm text-text-main placeholder:text-muted-text outline-none bg-transparent"
                        />
                        <Button
                            type="button"
                            variant="icon"
                            onClick={onClose}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Results */}
                    <div className="max-h-[320px] overflow-y-auto py-2">
                        {error ? (
                            <div className="px-4 py-8 text-center text-red-500">
                                <Typography variant="body2">{error}</Typography>
                            </div>
                        ) : displayResults.length === 0 ? (
                            <div className="px-4 py-8 text-center">
                                <Typography variant="body2" className="text-muted-foreground">
                                    {query.trim()
                                        ? `No results found for "${query}"`
                                        : "Type to search candidates, jobs, clients..."}
                                </Typography>
                            </div>
                        ) : (
                            <>
                                {!debouncedQuery && recentSearches.length > 0 && (
                                    <div className="px-4 py-1.5 flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-muted-text uppercase tracking-wider">
                                            Recent Searches
                                        </span>
                                        <button
                                            type="button"
                                            onClick={handleClearRecent}
                                            className="text-[10px] font-bold text-red-500 hover:text-red-700 hover:underline cursor-pointer"
                                        >
                                            Clear History
                                        </button>
                                    </div>
                                )}
                                {displayResults.map((result, idx) => {
                                    const Icon = typeIcons[result.type];
                                    return (
                                        <button
                                            key={`${result.type}-${result.id}`}
                                            type="button"
                                            tabIndex={-1}
                                            onClick={() => handleSelect(result)}
                                            className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors cursor-pointer text-left ${idx === 0 ? "bg-slate-50" : ""
                                                }`}
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                <Icon className="w-4 h-4 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <Typography
                                                    variant="body2"
                                                    className="font-semibold text-text-main text-sm truncate"
                                                >
                                                    {result.label}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    className="text-muted-text text-xs truncate block"
                                                >
                                                    {result.subtitle}
                                                </Typography>
                                            </div>
                                            <span className="text-[10px] font-medium text-muted-text bg-slate-100 px-2 py-0.5 rounded-full shrink-0 uppercase tracking-wide">
                                                {typeLabels[result.type]}
                                            </span>
                                        </button>
                                    );
                                })}
                            </>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2 border-t border-slate-100 flex items-center gap-4 text-[11px] text-muted-text">
                        <span className="flex items-center gap-1">
                            <kbd className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-mono">
                                ESC
                            </kbd>
                            to close
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-mono">
                                ↵
                            </kbd>
                            to select
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};
