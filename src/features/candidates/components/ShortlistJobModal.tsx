import React, { useState } from "react";
import { Typography, Select, OptionType, Button } from "../../../components/ui";
import { Briefcase, X } from "lucide-react";

interface ShortlistJobModalProps {
    isOpen: boolean;
    candidateName: string;
    appliedJobs: { id: string; title: string }[];
    onClose: () => void;
    onShortlist: (jobId: string) => void;
}

export const ShortlistJobModal: React.FC<ShortlistJobModalProps> = ({
    isOpen,
    candidateName,
    appliedJobs,
    onClose,
    onShortlist,
}) => {
    const [selectedJob, setSelectedJob] = useState<OptionType | null>(null);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!selectedJob) return;
        onShortlist(selectedJob.value);
        setSelectedJob(null);
    };

    const options: OptionType[] = appliedJobs.map((job) => ({
        label: job.title,
        value: job.id,
    }));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-0 duration-200">
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Content */}
            <div className="bg-white rounded-xl border border-btn-sec-border shadow-xl w-full max-w-md p-6 relative flex flex-col gap-6 animate-in zoom-in-95 duration-200 z-10">
                {/* Header */}
                <div className="flex flex-col gap-1 text-left">
                    <Typography variant="h4" className="text-lg font-bold text-text-main leading-none">
                        Shortlist Candidate
                    </Typography>
                    <Typography variant="body2" className="text-muted-text text-sm">
                        Select a job to shortlist {candidateName} for.
                    </Typography>
                </div>

                {/* Form Fields */}
                <div className="py-2">
                    <Select
                        label="Applied Jobs"
                        placeholder="Search & select job..."
                        options={options}
                        value={selectedJob}
                        onChange={(val) => setSelectedJob(val as OptionType | null)}
                        isSearchable={true}
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center justify-center px-4 h-10 text-sm font-medium border border-btn-sec-border rounded-lg hover:bg-slate-50 text-text-main transition-colors"
                    >
                        Cancel
                    </button>
                    <Button
                        variant="primary"
                        disabled={!selectedJob}
                        onClick={handleSubmit}
                        prefixIcon={Briefcase}
                    >
                        Shortlist
                    </Button>
                </div>

                {/* Top-right close button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-text hover:text-text-main transition-colors p-1"
                >
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                </button>
            </div>
        </div>
    );
};
