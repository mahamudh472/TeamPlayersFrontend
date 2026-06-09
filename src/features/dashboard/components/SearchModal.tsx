import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { Typography, Button } from "../../../components/ui";
import { Search, X, Briefcase, Users, Building2, Target } from "lucide-react";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface SearchResult {
    id: string;
    label: string;
    type: "candidate" | "job" | "client" | "lead";
    subtitle: string;
}

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

const mockResults: SearchResult[] = [
    {
        id: "1",
        label: "John Smith",
        type: "candidate",
        subtitle: "Senior Software Engineer",
    },
    {
        id: "2",
        label: "Senior React Developer",
        type: "job",
        subtitle: "Acme Corp • London",
    },
    {
        id: "3",
        label: "Acme Corporation",
        type: "client",
        subtitle: "Technology • 200 employees",
    },
    {
        id: "4",
        label: "TechStart Ltd",
        type: "lead",
        subtitle: "Hiring 3 positions",
    },
    {
        id: "5",
        label: "Emma Williams",
        type: "candidate",
        subtitle: "Product Manager",
    },
    {
        id: "6",
        label: "DevOps Engineer",
        type: "job",
        subtitle: "CloudScale • Remote",
    },
];

export const SearchModal: React.FC<SearchModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const filtered = query.trim()
        ? mockResults.filter(
            (r) =>
                r.label.toLowerCase().includes(query.toLowerCase()) ||
                r.subtitle.toLowerCase().includes(query.toLowerCase()),
        )
        : mockResults;

    const handleSelect = useCallback(
        (result: SearchResult) => {
            onClose();
            const routes: Record<string, string> = {
                candidate: "/dashboard/candidates",
                job: "/dashboard/jobs",
                client: "/dashboard/clients",
                lead: "/dashboard/leads",
            };
            navigate(routes[result.type] || "/dashboard");
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
            if (e.key === "Enter" && filtered.length > 0) {
                e.preventDefault();
                handleSelect(filtered[0]);
            }
        };

        document.addEventListener("keydown", handleKeyDown, true);
        return () => document.removeEventListener("keydown", handleKeyDown, true);
    }, [isOpen, onClose, filtered, handleSelect]);

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
                        <Search className="w-5 h-5 text-muted-text shrink-0" />
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
                        {filtered.length === 0 ? (
                            <div className="px-4 py-8 text-center">
                                <Typography variant="body2" className="text-muted-foreground">
                                    No results found for "{query}"
                                </Typography>
                            </div>
                        ) : (
                            filtered.map((result, idx) => {
                                const Icon = typeIcons[result.type];
                                return (
                                    <button
                                        key={result.id}
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
                            })
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
