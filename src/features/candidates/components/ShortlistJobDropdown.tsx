import React, { useState, useRef, useEffect } from "react";
import { Typography, Button } from "../../../components/ui";
import { Briefcase, ChevronDown } from "lucide-react";

interface ShortlistJobDropdownProps {
    candidateName: string;
    jobs: { id: string; title: string }[];
    onSelect: (jobId: string) => void;
}

export const ShortlistJobDropdown: React.FC<ShortlistJobDropdownProps> = ({
    candidateName,
    jobs,
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                prefixIcon={Briefcase}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
            >
                Shortlist
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </Button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg border border-btn-sec-border shadow-lg z-50 py-1.5 animate-in fade-in-0 zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100">
                        <Typography variant="body2" className="text-xs font-semibold text-muted-text uppercase tracking-wider">
                            Select job for {candidateName}
                        </Typography>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                        {jobs.map((job) => (
                            <button
                                key={job.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onSelect(job.id);
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-3 py-2.5 text-sm font-medium text-text-main hover:bg-slate-50 transition-colors flex items-center gap-2.5"
                            >
                                <Briefcase className="w-3.5 h-3.5 text-muted-text flex-shrink-0" />
                                {job.title}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
