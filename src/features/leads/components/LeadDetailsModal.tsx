import React, { useState, useEffect } from "react";
import { Typography } from "../../../components/ui";
import { X } from "lucide-react";

export interface LeadDetailItem {
    id: string;
    company: string;
    status: string;
    priority: "high priority" | "medium priority" | "low priority";
    industry: string;
    employees: string;
    location: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    notes?: string;
}

interface LeadDetailsModalProps {
    isOpen: boolean;
    lead: LeadDetailItem | null;
    onClose: () => void;
}

export const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({
    isOpen,
    lead,
    onClose,
}) => {
    const [notes, setNotes] = useState("");

    useEffect(() => {
        if (lead) {
            setNotes(lead.notes || "");
        }
    }, [lead]);

    if (!isOpen || !lead) return null;

    const handleSaveNotes = () => {
        console.log("Saving notes for lead:", lead.id, notes);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-0 duration-200">
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Content */}
            <div className="bg-white rounded-xl border border-btn-sec-border shadow-xl w-full max-w-lg p-6 relative flex flex-col gap-6 animate-in zoom-in-95 duration-200 z-10">
                
                {/* Header */}
                <div className="flex flex-col gap-1 text-left">
                    <Typography variant="h4" className="text-lg font-bold text-text-main leading-none">
                        {lead.company}
                    </Typography>
                    <Typography variant="body2" className="text-muted-text text-sm">
                        Lead details and actions
                    </Typography>
                </div>

                {/* Details Fields Grid */}
                <div className="space-y-4 py-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-muted-text uppercase tracking-wider block mb-1">
                                Industry
                            </label>
                            <Typography variant="body1" className="font-medium text-text-main">
                                {lead.industry}
                            </Typography>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-muted-text uppercase tracking-wider block mb-1">
                                Company Size
                            </label>
                            <Typography variant="body1" className="font-medium text-text-main">
                                {lead.employees}
                            </Typography>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-muted-text uppercase tracking-wider block mb-1">
                                Country
                            </label>
                            <Typography variant="body1" className="font-medium text-text-main">
                                {lead.location}
                            </Typography>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-muted-text uppercase tracking-wider block mb-1">
                                Priority Score
                            </label>
                            <span className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-semibold text-white capitalize ${
                                lead.priority === "high priority"
                                    ? "bg-green-500"
                                    : lead.priority === "medium priority"
                                        ? "bg-yellow-500"
                                        : "bg-slate-400"
                            }`}>
                                {lead.priority.replace(" priority", "")}
                            </span>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 pt-4 border-t border-slate-100">
                        <label className="text-sm font-semibold text-text-main block">
                            Contact Information
                        </label>
                        <p className="font-medium text-text-main text-sm">{lead.contactName}</p>
                        <p className="text-sm text-muted-text">{lead.contactEmail}</p>
                        <p className="text-sm text-muted-text">{lead.contactPhone}</p>
                    </div>

                    {/* Notes Textarea */}
                    <div className="space-y-2 pt-2">
                        <label className="text-sm font-semibold text-text-main block">
                            Notes
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full resize-none border border-btn-sec-border rounded-lg bg-white px-3 py-2 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            placeholder="Add notes about this lead..."
                            rows={3}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center justify-center px-4 h-10 text-sm font-medium border border-btn-sec-border rounded-lg hover:bg-slate-50 text-text-main transition-colors"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={handleSaveNotes}
                        className="inline-flex items-center justify-center px-4 h-10 text-sm font-medium bg-primary hover:bg-primary/95 text-white rounded-lg transition-colors"
                    >
                        Save Notes
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
