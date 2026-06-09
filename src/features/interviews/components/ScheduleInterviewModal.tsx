import React, { useState } from "react";
import { Typography, Select, OptionType, Button } from "../../../components/ui";
import { X } from "lucide-react";

interface ScheduleInterviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSchedule: (candidateName: string, role: string, company: string, date: string, time: string) => void;
}

export const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({
    isOpen,
    onClose,
    onSchedule,
}) => {
    const candidatesOptions: OptionType[] = [
        { label: "Alex Thompson", value: "Alex Thompson" },
        { label: "Sarah Martinez", value: "Sarah Martinez" },
        { label: "James Wilson", value: "James Wilson" },
        { label: "Emily Davis", value: "Emily Davis" },
    ];

    const jobsOptions: OptionType[] = [
        { label: "Senior Software Engineer - GlobalTech Industries", value: "Senior Software Engineer|GlobalTech Industries" },
        { label: "Product Manager - GlobalTech Industries", value: "Product Manager|GlobalTech Industries" },
        { label: "Frontend Developer - Acme Corp", value: "Frontend Developer|Acme Corp" },
        { label: "Fullstack Developer - TechCorp Solutions", value: "Fullstack Developer|TechCorp Solutions" },
    ];

    const [selectedCandidate, setSelectedCandidate] = useState<OptionType | null>(null);
    const [selectedJob, setSelectedJob] = useState<OptionType | null>(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCandidate || !selectedJob || !date || !time) return;

        const [jobRole, jobCompany] = selectedJob.value.split("|");
        onSchedule(selectedCandidate.label, jobRole, jobCompany, date, time);
        
        // Reset and close
        setSelectedCandidate(null);
        setSelectedJob(null);
        setDate("");
        setTime("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in-0 duration-200">
            <div className="bg-white rounded-xl border border-btn-sec-border shadow-lg max-w-md w-full p-6 relative">
                <Button
                    type="button"
                    variant="icon"
                    onClick={onClose}
                    className="absolute top-4 right-4"
                >
                    <X className="w-5 h-5" />
                </Button>
                <div className="mb-6 text-left">
                    <Typography variant="h3" className="font-bold text-text-main">
                        Schedule Interview
                    </Typography>
                    <Typography variant="body2" className="text-muted-text mt-1">
                        Setup details for a candidate screening call
                    </Typography>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Select
                        label="Candidate Name"
                        placeholder="Select candidate"
                        options={candidatesOptions}
                        value={selectedCandidate}
                        onChange={(val) => setSelectedCandidate(val as OptionType | null)}
                    />

                    <Select
                        label="Job / Role"
                        placeholder="Select job role"
                        options={jobsOptions}
                        value={selectedJob}
                        onChange={(val) => setSelectedJob(val as OptionType | null)}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5 text-left">
                            <label className="text-sm font-semibold text-text-main">Date</label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full h-10 border border-btn-sec-border rounded-lg bg-white px-3 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left">
                            <label className="text-sm font-semibold text-text-main">Time</label>
                            <input
                                type="time"
                                required
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full h-10 border border-btn-sec-border rounded-lg bg-white px-3 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex-1"
                        >
                            Schedule
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
