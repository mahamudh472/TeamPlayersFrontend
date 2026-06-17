import React, { useState, useEffect } from "react";
import { Typography, Button } from "../../../components/ui";
import { X } from "lucide-react";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";
import { LeadDetailItem, LeadDetailsModalProps } from "../types";

export const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({
    isOpen,
    lead,
    onClose,
    onNoteAdded,
}) => {
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    const [detailedLead, setDetailedLead] = useState<LeadDetailItem | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [newNote, setNewNote] = useState("");
    const [isSubmittingNote, setIsSubmittingNote] = useState(false);

    useEffect(() => {
        const fetchLeadDetails = async () => {
            if (!isOpen || !lead?.id) {
                setDetailedLead(null);
                return;
            }
            if (!agencyId) return;

            try {
                setIsLoading(true);
                const res = await apiClient.get(`/api/v1/agency/leads/${lead.id}/`, {
                    headers: { "X-Agency-ID": String(agencyId) }
                });
                const b = res.data;
                setDetailedLead({
                    id: String(b.id),
                    company: b.company,
                    status: b.status,
                    priority: b.priority === "high" ? "high priority" : b.priority === "medium" ? "medium priority" : "low priority",
                    industry: b.industry,
                    employees: b.source ? `Source: ${b.source}` : "Inbound",
                    location: b.location,
                    contactName: b.contact_person,
                    contactEmail: b.contact_email,
                    contactPhone: b.contact_phone,
                    notesList: b.notes || [],
                });
            } catch (err: any) {
                console.error("Failed to fetch lead details:", err);
                toast.error(err.response?.data?.detail || "Failed to load lead details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeadDetails();
    }, [isOpen, lead?.id, agencyId, toast]);

    if (!isOpen || !lead) return null;

    const handleAddNote = async () => {
        if (!newNote.trim() || !lead?.id) return;
        if (!agencyId) {
            toast.error("Agency selection is required");
            return;
        }

        setIsSubmittingNote(true);
        try {
            const res = await apiClient.post(`/api/v1/agency/leads/${lead.id}/notes/`, {
                content: newNote.trim()
            }, {
                headers: { "X-Agency-ID": String(agencyId) }
            });
            setDetailedLead(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    notesList: [...(prev.notesList || []), res.data]
                };
            });
            setNewNote("");
            toast.success("Note added successfully");
            onNoteAdded?.();
        } catch (err: any) {
            console.error("Failed to add note:", err);
            toast.error(err.response?.data?.error || err.response?.data?.detail || "Failed to add note");
        } finally {
            setIsSubmittingNote(false);
        }
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

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
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
                        <span className="text-xs text-muted-text mt-3">Loading details...</span>
                    </div>
                ) : (
                    <>
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

                            {/* Notes Section */}
                            <div className="space-y-3 pt-2 border-t border-slate-100/50">
                                <label className="text-sm font-semibold text-text-main block">
                                    Notes History
                                </label>
                                {detailedLead?.notesList && detailedLead.notesList.length > 0 ? (
                                    <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                                        {detailedLead.notesList.map((note) => (
                                            <div key={note.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs flex flex-col gap-1">
                                                <div className="flex justify-between items-center text-muted-text">
                                                    <span className="font-semibold text-text-main">
                                                        {note.user.full_name || note.user.email}
                                                    </span>
                                                    <span>
                                                        {new Date(note.created_at).toLocaleDateString(undefined, {
                                                            month: "short",
                                                            day: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        })}
                                                    </span>
                                                </div>
                                                <p className="text-slate-700 whitespace-pre-wrap mt-0.5">{note.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-muted-text italic">No notes added yet for this lead.</p>
                                )}

                                <div className="space-y-2 mt-4">
                                    <label className="text-xs font-semibold text-muted-text uppercase tracking-wider block">
                                        Add New Note
                                    </label>
                                    <div className="flex gap-2">
                                        <textarea
                                            value={newNote}
                                            onChange={(e) => setNewNote(e.target.value)}
                                            className="flex-1 resize-none border border-btn-sec-border rounded-lg bg-white px-3 py-2 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                            placeholder="Type a new note..."
                                            rows={2}
                                        />
                                        <Button
                                            type="button"
                                            size="sm"
                                            disabled={!newNote.trim() || isSubmittingNote}
                                            onClick={handleAddNote}
                                            className="self-end"
                                        >
                                            {isSubmittingNote ? "Adding..." : "Add"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Close
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

