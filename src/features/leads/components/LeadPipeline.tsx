import React, { useState } from "react";
import { Typography, Tabs, TabOption, Button } from "../../../components/ui";
import { Mail, Phone, Plus, Building2, Users, MapPin, Check, Calendar, X } from "lucide-react";
import { LeadStatus, Lead, LeadDetailItem } from "../types";
import { LeadDetailsModal } from "./LeadDetailsModal";

interface LeadPipelineProps {
    leads: Lead[];
    statusCounts?: {
        new: number;
        contacted: number;
        meeting: number;
        converted: number;
        lost: number;
    };
    onStatusChange: (leadId: string, nextStatus: LeadStatus) => void;
    onNoteAdded: () => void;
    page: number;
    onPageChange: (val: number) => void;
    hasMore: boolean;
    hasLess: boolean;
    isLoading: boolean;
    activeTab: string;
    onTabChange: (val: string) => void;
}

export const LeadPipeline: React.FC<LeadPipelineProps> = ({
    leads,
    statusCounts,
    onStatusChange,
    onNoteAdded,
    page,
    onPageChange,
    hasMore,
    hasLess,
    isLoading,
    activeTab,
    onTabChange,
}) => {
    const [selectedLead, setSelectedLead] = useState<LeadDetailItem | null>(null);
    const [confirmState, setConfirmState] = useState<{
        isOpen: boolean;
        leadId: string;
        leadCompany: string;
        nextStatus: LeadStatus;
    } | null>(null);

    const handleStatusChangeClick = (leadId: string, leadCompany: string, nextStatus: LeadStatus) => {
        setConfirmState({
            isOpen: true,
            leadId,
            leadCompany,
            nextStatus,
        });
    };

    const totalLeads = statusCounts
        ? ((statusCounts.new || 0) + (statusCounts.contacted || 0) + (statusCounts.meeting || 0) + (statusCounts.converted || 0) + (statusCounts.lost || 0))
        : 0;

    const tabOptions: TabOption[] = [
        { label: `All (${totalLeads})`, value: "all" },
        { label: `New (${statusCounts?.new ?? 0})`, value: "new" },
        { label: `Contacted (${statusCounts?.contacted ?? 0})`, value: "contacted" },
        { label: `Meetings (${statusCounts?.meeting ?? 0})`, value: "meeting" },
        { label: `Converted (${statusCounts?.converted ?? 0})`, value: "converted" },
        { label: `Lost (${statusCounts?.lost ?? 0})`, value: "lost" },
    ];

    return (
        <div className="bg-white rounded-xl border border-btn-sec-border flex flex-col gap-6">
            <div className="px-6 pt-6">
                <div className="flex items-center justify-between">
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        Lead Pipeline
                    </Typography>
                </div>
            </div>

            <div className="px-6 pb-6">
                <Tabs
                    options={tabOptions}
                    value={activeTab}
                    onChange={onTabChange}
                    className="mb-6"
                />

                {/* Lead Items list */}
                <div className="space-y-3">
                    {leads.map((lead) => {
                        return (
                            <div
                                key={lead.id}
                                onClick={() => setSelectedLead(lead)}
                                className="flex items-center gap-4 p-4 border border-btn-sec-border rounded-xl hover:bg-slate-50/50 transition-colors cursor-pointer"
                            >
                                <div className={`w-1.5 h-12 rounded-full ${lead.accentColor}`} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1.5 text-left">
                                        <Typography variant="body1" className="font-semibold text-text-main">
                                            {lead.company}
                                        </Typography>
                                        <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit capitalize ${lead.status === "new"
                                                ? "bg-slate-100 text-slate-800 border-transparent"
                                                : lead.status === "contacted"
                                                    ? "bg-blue-50 text-blue-700 border-transparent"
                                                    : lead.status === "meeting"
                                                        ? "bg-primary/10 text-primary border-transparent"
                                                        : lead.status === "converted"
                                                            ? "bg-green-50 text-green-700 border-transparent"
                                                            : "bg-red-50 text-red-700 border-transparent"
                                            }`}>
                                            {lead.status === "meeting" ? "meeting booked" : lead.status}
                                        </span>
                                        <span className="inline-flex items-center justify-center rounded-md border border-btn-sec-border px-2 py-0.5 text-xs font-medium text-muted-text capitalize">
                                            {lead.priority}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-text">
                                        <span className="flex items-center gap-1">
                                            <Building2 className="w-3.5 h-3.5" />
                                            {lead.industry}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users className="w-3.5 h-3.5" />
                                            {lead.employees}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {lead.location}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {lead.status === "new" && (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                prefixIcon={Mail}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Placeholder for later
                                                }}
                                            >
                                                Contact
                                            </Button>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                prefixIcon={Check}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStatusChangeClick(lead.id, lead.company, "contacted");
                                                }}
                                            >
                                                Mark as Contacted
                                            </Button>
                                        </>
                                    )}
                                    {lead.status === "contacted" && (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                prefixIcon={Calendar}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Placeholder for later
                                                }}
                                            >
                                                Book Meeting
                                            </Button>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                prefixIcon={Check}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStatusChangeClick(lead.id, lead.company, "meeting");
                                                }}
                                            >
                                                Mark as Meeting
                                            </Button>
                                        </>
                                    )}
                                    {lead.status === "meeting" && (
                                        <>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                prefixIcon={Plus}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStatusChangeClick(lead.id, lead.company, "converted");
                                                }}
                                            >
                                                Convert to Client
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                prefixIcon={X}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStatusChangeClick(lead.id, lead.company, "lost");
                                                }}
                                                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                            >
                                                Mark as Lost
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    {leads.length === 0 && (
                        <div className="p-8 text-center text-muted-text">
                            No leads in this stage of the pipeline.
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {(hasLess || hasMore) && (
                    <div className="flex items-center justify-between border-t border-btn-sec-border pt-4 mt-6">
                        <Typography variant="body2" className="text-muted-text font-medium">
                            Page {page}
                        </Typography>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                disabled={!hasLess || isLoading}
                                onClick={() => onPageChange(page - 1)}
                                className="inline-flex items-center justify-center text-sm font-medium transition-all outline-none border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 h-9 rounded-lg px-3 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                disabled={!hasMore || isLoading}
                                onClick={() => onPageChange(page + 1)}
                                className="inline-flex items-center justify-center text-sm font-medium transition-all outline-none border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 h-9 rounded-lg px-3 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Selected Lead Details Modal */}
            <LeadDetailsModal
                isOpen={!!selectedLead}
                lead={selectedLead}
                onClose={() => setSelectedLead(null)}
                onNoteAdded={onNoteAdded}
            />

            {/* Status Change Confirmation Popup */}
            {confirmState && confirmState.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 animate-in fade-in-0 duration-200">
                    <div className="absolute inset-0" onClick={() => setConfirmState(null)} />
                    <div className="bg-white rounded-xl border border-btn-sec-border shadow-xl w-full max-w-md p-6 relative flex flex-col gap-6 animate-in zoom-in-95 duration-200 z-10 text-left">
                        <div>
                            <Typography variant="h4" className="text-lg font-bold text-text-main mb-2">
                                Confirm Status Change
                            </Typography>
                            <Typography variant="body2" className="text-muted-text text-sm">
                                Are you sure you want to change the status of <span className="font-semibold text-text-main">{confirmState.leadCompany}</span> to <span className="font-semibold capitalize text-primary">{confirmState.nextStatus === "meeting" ? "meeting booked" : confirmState.nextStatus}</span>?
                            </Typography>
                        </div>
                        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => setConfirmState(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                variant={confirmState.nextStatus === "lost" ? "outline" : "primary"}
                                className={confirmState.nextStatus === "lost" ? "text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 font-semibold" : ""}
                                onClick={() => {
                                    onStatusChange(confirmState.leadId, confirmState.nextStatus);
                                    setConfirmState(null);
                                }}
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
