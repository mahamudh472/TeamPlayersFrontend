import React, { useState, useEffect } from "react";
import { Typography, Button } from "../../../components/ui";
import { X } from "lucide-react";

import { LeadDetailItem, LeadDetailsModalProps } from "../types";

export const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({
    isOpen,
    lead,
    onClose,
    onSaveNotes,
}) => {
    const [notes, setNotes] = useState("");

    useEffect(() => {
        if (lead) {
            setNotes(lead.notes || "");
        }
    }, [lead]);

    if (!isOpen || !lead) return null;

    const handleSaveNotes = () => {
        onSaveNotes?.(lead.id, notes);
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
                        Lead Details
                    </Typography>
                    <Typography variant="body2" className="text-muted-text text-sm">
                        Detailed client company insights and contact details.
                    </Typography>
                </div>

                {/* Details list */}
                <div className="space-y-4 py-2 border-t border-b border-slate-100/50 text-left">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-muted-text uppercase tracking-wider block mb-1">
                                Company
                            </label>
                            <Typography variant="body2" className="font-semibold text-text-main">
                                {lead.company}
                            </Typography>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-muted-text uppercase tracking-wider block mb-1">
                                Priority Score
                            </label>
                            <span className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-semibold text-white capitalize ${lead.priority === "high priority"
                                    ? "bg-green-500"
                                    : lead.priority === "medium priority"
                                        ? "bg-yellow-500"
                                        : "bg-gray-400"
                                }`}>
                                {lead.priority.replace(" priority", "")}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-muted-text uppercase tracking-wider block mb-1">
                                Industry
                            </label>
                            <Typography variant="body2" className="text-text-main">
                                {lead.industry}
                            </Typography>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-muted-text uppercase tracking-wider block mb-1">
                                Location
                            </label>
                            <Typography variant="body2" className="text-text-main">
                                {lead.location}
                            </Typography>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-muted-text uppercase tracking-wider block mb-1">
                                Contact Person
                            </label>
                            <Typography variant="body2" className="text-text-main">
                                {lead.contactName}
                            </Typography>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-muted-text uppercase tracking-wider block mb-1">
                                Email
                            </label>
                            <Typography variant="body2" className="text-text-main">
                                {lead.contactEmail}
                            </Typography>
                        </div>
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
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSaveNotes}
                    >
                        Save Notes
                    </Button>
                </div>

                {/* Top-right close button */}
                <Button
                    type="button"
                    variant="icon"
                    onClick={onClose}
                    className="absolute top-4 right-4"
                >
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                </Button>
            </div>
        </div>
    );
};
