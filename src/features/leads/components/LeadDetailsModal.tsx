import React, { useState, useEffect } from "react";
import { Typography, Button } from "../../../components/ui";
import {
    X,
    Globe,
    Users,
    MapPin,
    Mail,
    Phone,
    User,
    ExternalLink,
    Briefcase,
} from "lucide-react";
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
    const agencyId =
        localStorage.getItem("selected_agency_id") || user?.agency_id;

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
                    headers: { "X-Agency-ID": String(agencyId) },
                });
                const b = res.data;
                setDetailedLead({
                    id: String(b.id),
                    company: b.company,
                    status: b.status,
                    priority:
                        b.priority === "high"
                            ? "high priority"
                            : b.priority === "medium"
                            ? "medium priority"
                            : "low priority",
                    industry: b.industry,
                    employees: b.source ? `Source: ${b.source}` : "Inbound",
                    location: b.location,
                    contactName: b.contact_person,
                    contactEmail: b.contact_email,
                    contactPhone: b.contact_phone,
                    notesList: b.notes || [],
                    website: b.website,
                    companyDomain: b.company_domain,
                    linkedin: b.linkedin,
                    companySize: b.company_size,
                    employeeCount: b.employee_count,
                    hiringActivity: b.hiring_activity,
                    description: b.description,
                    detectedAt: b.detected_at,
                    domainSource: b.domain_source,
                });
            } catch (err: any) {
                console.error("Failed to fetch lead details:", err);
                toast.error(
                    err.response?.data?.detail || "Failed to load lead details"
                );
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
            const res = await apiClient.post(
                `/api/v1/agency/leads/${lead.id}/notes/`,
                {
                    content: newNote.trim(),
                },
                {
                    headers: { "X-Agency-ID": String(agencyId) },
                }
            );
            setDetailedLead((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    notesList: [...(prev.notesList || []), res.data],
                };
            });
            setNewNote("");
            toast.success("Note added successfully");
            onNoteAdded?.();
        } catch (err: any) {
            console.error("Failed to add note:", err);
            toast.error(
                err.response?.data?.error ||
                    err.response?.data?.detail ||
                    "Failed to add note"
            );
        } finally {
            setIsSubmittingNote(false);
        }
    };

    const displayLead = detailedLead || lead;
    const hasHiring =
        displayLead.hiringActivity === "True" ||
        displayLead.hiringActivity === "true" ||
        displayLead.hiringActivity === "yes" ||
        displayLead.hiringActivity === "Active";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-0 duration-200">
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Content */}
            <div className="bg-white rounded-xl border border-btn-sec-border shadow-xl w-full max-w-2xl p-6 relative flex flex-col gap-5 animate-in zoom-in-95 duration-200 z-10 overflow-hidden">
                {/* Accent Top Bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-teal-500 to-emerald-500" />

                {/* Header */}
                <div className="flex flex-col gap-1 text-left mt-1">
                    <Typography variant="h4" className="text-xl font-extrabold text-text-main leading-none">
                        Lead Details
                    </Typography>
                    <Typography variant="body2" className="text-muted-text text-sm mt-1.5 leading-relaxed">
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
                        {/* Scrollable details area */}
                        <div className="space-y-5 py-2.5 border-t border-b border-slate-100/50 text-left max-h-[60vh] overflow-y-auto pr-1">
                            {/* Badges/Tags Row */}
                            <div className="flex flex-wrap gap-2 items-center pb-2 border-b border-slate-150/30">
                                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold text-white capitalize ${displayLead.priority === "high priority"
                                        ? "bg-green-500"
                                        : displayLead.priority === "medium priority"
                                            ? "bg-yellow-500"
                                            : "bg-gray-400"
                                    }`}>
                                    Priority: {displayLead.priority.replace(" priority", "")}
                                </span>

                                {displayLead.companySize && (
                                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                                        <Users className="w-3.5 h-3.5" />
                                        {displayLead.companySize} employees
                                    </span>
                                )}

                                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                    hasHiring
                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50 animate-pulse"
                                        : "bg-slate-100 text-slate-600"
                                }`}>
                                    {hasHiring ? "Active Hiring" : "No Active Hiring"}
                                </span>

                                {displayLead.domainSource && (
                                    <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider">
                                        Source: {displayLead.domainSource}
                                    </span>
                                )}
                            </div>

                            {/* Core Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-3.5">
                                    <div>
                                        <label className="text-[10px] font-bold text-muted-text uppercase tracking-wider block mb-0.5">
                                            Company
                                        </label>
                                        <Typography variant="body1" className="font-bold text-text-main">
                                            {displayLead.company}
                                        </Typography>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-bold text-muted-text uppercase tracking-wider block mb-0.5">
                                            Industry
                                        </label>
                                        <Typography variant="body2" className="text-text-main flex items-center gap-1.5 font-medium">
                                            <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                                            {displayLead.industry || "Not Specified"}
                                        </Typography>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-bold text-muted-text uppercase tracking-wider block mb-0.5">
                                            Location
                                        </label>
                                        <Typography variant="body2" className="text-text-main flex items-center gap-1.5 font-medium">
                                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                                            {displayLead.location || "Not Specified"}
                                        </Typography>
                                    </div>

                                    {/* Links */}
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {displayLead.website && (
                                            <a
                                                href={displayLead.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg px-2.5 py-1.5 transition-colors cursor-pointer"
                                            >
                                                <Globe className="w-3.5 h-3.5" />
                                                <span>Website</span>
                                                <ExternalLink className="w-3 h-3 opacity-60" />
                                            </a>
                                        )}
                                        {displayLead.linkedin && (
                                            <a
                                                href={displayLead.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a66c2] hover:bg-[#0a66c2]/10 bg-[#0a66c2]/5 border border-[#0a66c2]/20 rounded-lg px-2.5 py-1.5 transition-colors cursor-pointer"
                                            >
                                                <svg
                                                    className="w-3.5 h-3.5 fill-current shrink-0"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                </svg>
                                                <span>LinkedIn</span>
                                                <ExternalLink className="w-3 h-3 opacity-60" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Key Contact Card */}
                                <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 space-y-3">
                                    <h4 className="text-xs font-bold text-text-main border-b border-slate-150/40 pb-1.5 flex items-center gap-1.5">
                                        <User className="w-4 h-4 text-slate-400" /> Key Contact Details
                                    </h4>
                                    <div className="space-y-2.5">
                                        <div>
                                            <label className="text-[9px] font-bold text-muted-text uppercase tracking-wider block">
                                                Contact Person
                                            </label>
                                            <Typography variant="body2" className="font-semibold text-text-main">
                                                {displayLead.contactName || "No contact details available"}
                                            </Typography>
                                        </div>
                                        {displayLead.contactEmail && (
                                            <div>
                                                <label className="text-[9px] font-bold text-muted-text uppercase tracking-wider block">
                                                    Email
                                                </label>
                                                <a
                                                    href={`mailto:${displayLead.contactEmail}`}
                                                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 mt-0.5"
                                                >
                                                    <Mail className="w-3.5 h-3.5" />
                                                    {displayLead.contactEmail}
                                                </a>
                                            </div>
                                        )}
                                        {displayLead.contactPhone && (
                                            <div>
                                                <label className="text-[9px] font-bold text-muted-text uppercase tracking-wider block">
                                                    Phone
                                                </label>
                                                <a
                                                    href={`tel:${displayLead.contactPhone}`}
                                                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 mt-0.5"
                                                >
                                                    <Phone className="w-3.5 h-3.5" />
                                                    {displayLead.contactPhone}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Description section */}
                            {displayLead.description && (
                                <div className="space-y-1.5 pt-2 border-t border-slate-100/50">
                                    <label className="text-[10px] font-bold text-muted-text uppercase tracking-wider block">
                                        About the Company
                                    </label>
                                    <div className="bg-slate-50/40 border border-slate-100 rounded-xl p-3 max-h-36 overflow-y-auto">
                                        <p className="text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-wrap">
                                            {displayLead.description}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Notes History */}
                            <div className="space-y-3 pt-3 border-t border-slate-100/50">
                                <label className="text-sm font-bold text-text-main block">
                                    Notes History
                                </label>
                                {displayLead.notesList && displayLead.notesList.length > 0 ? (
                                    <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                                        {displayLead.notesList.map((note) => (
                                            <div
                                                key={note.id}
                                                className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs flex flex-col gap-1"
                                            >
                                                <div className="flex justify-between items-center text-muted-text">
                                                    <span className="font-semibold text-text-main">
                                                        {note.user.full_name || note.user.email}
                                                    </span>
                                                    <span>
                                                        {new Date(note.created_at).toLocaleDateString(
                                                            undefined,
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}
                                                    </span>
                                                </div>
                                                <p className="text-slate-700 whitespace-pre-wrap mt-0.5">
                                                    {note.content}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-muted-text italic">
                                        No notes added yet for this lead.
                                    </p>
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
                    <Button type="button" variant="secondary" onClick={onClose}>
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
