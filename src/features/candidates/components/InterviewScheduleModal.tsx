import React, { useState } from "react";
import { Typography, Input } from "../../../components/ui";
import { Calendar, Clock, X } from "lucide-react";

interface InterviewScheduleModalProps {
    isOpen: boolean;
    candidateName: string;
    onClose: () => void;
    onSchedule: (date: string, time: string) => void;
}

export const InterviewScheduleModal: React.FC<InterviewScheduleModalProps> = ({
    isOpen,
    candidateName,
    onClose,
    onSchedule,
}) => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!date || !time) return;
        onSchedule(date, time);
        setDate("");
        setTime("");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-0 duration-200">
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Content */}
            <div className="bg-white rounded-xl border border-btn-sec-border shadow-xl w-full max-w-md p-6 relative flex flex-col gap-6 animate-in zoom-in-95 duration-200 z-10">
                {/* Header */}
                <div className="flex flex-col gap-1 text-left">
                    <Typography variant="h4" className="text-lg font-bold text-text-main leading-none">
                        Schedule Interview
                    </Typography>
                    <Typography variant="body2" className="text-muted-text text-sm">
                        Set date and time for {candidateName}
                    </Typography>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 py-2">
                    <Input
                        label="Interview Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        prefixIcon={Calendar}
                    />
                    <Input
                        label="Interview Time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        prefixIcon={Clock}
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
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!date || !time}
                        className="inline-flex items-center justify-center gap-2 px-4 h-10 text-sm font-medium bg-primary hover:bg-primary/95 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Calendar className="w-4 h-4" />
                        Schedule Interview
                    </button>
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
