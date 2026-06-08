import React, { useState } from "react";
import { Typography } from "../../../components/ui";
import { Funnel, Mail, Phone, Plus, Building2, Users, MapPin } from "lucide-react";
import { LeadDetailsModal, LeadDetailItem } from "./LeadDetailsModal";

interface Lead extends LeadDetailItem {
    actionText: string;
    actionIcon: typeof Mail | typeof Phone | typeof Plus;
    accentColor: string;
}

export const LeadPipeline: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"all" | "new" | "contacted" | "meeting booked">("all");
    const [selectedLead, setSelectedLead] = useState<LeadDetailItem | null>(null);

    const leads: Lead[] = [
        {
            id: "1",
            company: "TechCorp Solutions",
            status: "new",
            priority: "high priority",
            industry: "Technology",
            employees: "50-200 employees",
            location: "United Kingdom",
            contactName: "Sarah Johnson",
            contactEmail: "sarah.johnson@techcorp.com",
            contactPhone: "+44 20 1234 5678",
            actionText: "Contact",
            actionIcon: Mail,
            accentColor: "bg-green-500",
            notes: "",
        },
        {
            id: "2",
            company: "FinanceHub Ltd",
            status: "contacted",
            priority: "high priority",
            industry: "Finance",
            employees: "200-500 employees",
            location: "United Kingdom",
            contactName: "Alex Mercer",
            contactEmail: "alex.mercer@financehub.com",
            contactPhone: "+44 20 2345 6789",
            actionText: "Book Meeting",
            actionIcon: Phone,
            accentColor: "bg-green-500",
            notes: "",
        },
        {
            id: "3",
            company: "HealthPlus Medical",
            status: "meeting booked",
            priority: "medium priority",
            industry: "Healthcare",
            employees: "100-200 employees",
            location: "United Kingdom",
            contactName: "Emma Watson",
            contactEmail: "emma.watson@healthplus.com",
            contactPhone: "+44 20 3456 7890",
            actionText: "Convert to Client",
            actionIcon: Plus,
            accentColor: "bg-yellow-500",
            notes: "",
        },
    ];

    const filteredLeads = leads.filter((lead) => {
        if (activeTab === "all") return true;
        return lead.status === activeTab;
    });

    const getStatusCount = (status: "all" | "new" | "contacted" | "meeting booked") => {
        if (status === "all") return leads.length;
        return leads.filter((l) => l.status === status).length;
    };

    return (
        <div className="bg-white rounded-xl border border-btn-sec-border flex flex-col gap-6">
            <div className="px-6 pt-6 pb-2">
                <div className="flex items-center justify-between">
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        Lead Pipeline
                    </Typography>
                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all outline-none border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 h-8 rounded-md gap-1.5 px-3">
                        <Funnel className="w-4 h-4 mr-2" />
                        Filter
                    </button>
                </div>
            </div>
            
            <div className="px-6 pb-6">
                {/* Tabs list */}
                <div className="bg-slate-100/80 text-muted-text h-10 w-fit items-center justify-center rounded-xl p-[3px] flex gap-1 mb-6">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`inline-flex h-full items-center justify-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
                            activeTab === "all"
                                ? "bg-white text-text-main shadow-xs"
                                : "hover:text-text-main text-muted-text"
                        }`}
                    >
                        All ({getStatusCount("all")})
                    </button>
                    <button
                        onClick={() => setActiveTab("new")}
                        className={`inline-flex h-full items-center justify-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
                            activeTab === "new"
                                ? "bg-white text-text-main shadow-xs"
                                : "hover:text-text-main text-muted-text"
                        }`}
                    >
                        New ({getStatusCount("new")})
                    </button>
                    <button
                        onClick={() => setActiveTab("contacted")}
                        className={`inline-flex h-full items-center justify-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
                            activeTab === "contacted"
                                ? "bg-white text-text-main shadow-xs"
                                : "hover:text-text-main text-muted-text"
                        }`}
                    >
                        Contacted ({getStatusCount("contacted")})
                    </button>
                    <button
                        onClick={() => setActiveTab("meeting booked")}
                        className={`inline-flex h-full items-center justify-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
                            activeTab === "meeting booked"
                                ? "bg-white text-text-main shadow-xs"
                                : "hover:text-text-main text-muted-text"
                        }`}
                    >
                        Meetings ({getStatusCount("meeting booked")})
                    </button>
                </div>

                {/* Lead Items list */}
                <div className="space-y-3">
                    {filteredLeads.map((lead) => {
                        const ActionIcon = lead.actionIcon;
                        return (
                            <div
                                key={lead.id}
                                onClick={() => setSelectedLead(lead)}
                                className="flex items-center gap-4 p-4 border border-btn-sec-border rounded-xl hover:bg-slate-50/50 transition-colors cursor-pointer"
                            >
                                <div className={`w-1.5 h-12 rounded-full ${lead.accentColor}`} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Typography variant="body1" className="font-semibold text-text-main">
                                            {lead.company}
                                        </Typography>
                                        <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit capitalize ${
                                            lead.status === "new" 
                                                ? "bg-slate-100 text-slate-800 border-transparent"
                                                : "bg-primary/10 text-primary border-transparent"
                                        }`}>
                                            {lead.status}
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
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log("Action clicked for:", lead.company);
                                        }}
                                        className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-8 rounded-md gap-1.5 px-3 border ${
                                            lead.actionText === "Convert to Client"
                                                ? "bg-primary text-white border-transparent hover:bg-primary/95"
                                                : "border-btn-sec-border bg-white text-text-main hover:bg-slate-50"
                                        }`}
                                    >
                                        <ActionIcon className="w-4 h-4" />
                                        {lead.actionText}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    {filteredLeads.length === 0 && (
                        <div className="p-8 text-center text-muted-text">
                            No leads in this stage of the pipeline.
                        </div>
                    )}
                </div>
            </div>

            {/* Selected Lead Details Modal */}
            <LeadDetailsModal
                isOpen={!!selectedLead}
                lead={selectedLead}
                onClose={() => setSelectedLead(null)}
            />
        </div>
    );
};
