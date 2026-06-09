import React, { useState } from "react";
import { Typography, Tabs, TabOption, Button } from "../../../components/ui";
import { Mail, Phone, Plus, Building2, Users, MapPin } from "lucide-react";
import { LeadDetailsModal, LeadDetailItem } from "./LeadDetailsModal";

type LeadStatus = "new" | "contacted" | "meeting booked";

interface Lead extends LeadDetailItem {
    accentColor: string;
}

const getActionConfig = (status: LeadStatus) => {
    switch (status) {
        case "new":
            return { text: "Contact", icon: Mail, isPrimary: false };
        case "contacted":
            return { text: "Book Meeting", icon: Phone, isPrimary: false };
        case "meeting booked":
            return { text: "Convert to Client", icon: Plus, isPrimary: true };
    }
};

const getNextStatus = (status: LeadStatus): LeadStatus | null => {
    switch (status) {
        case "new":
            return "contacted";
        case "contacted":
            return "meeting booked";
        case "meeting booked":
            return null; // Convert to client — disappears
    }
};

const initialLeads: Lead[] = [
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
        accentColor: "bg-yellow-500",
        notes: "",
    },
];

export const LeadPipeline: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("all");
    const [selectedLead, setSelectedLead] = useState<LeadDetailItem | null>(null);
    const [leads, setLeads] = useState<Lead[]>(initialLeads);

    const handleStatusChange = (leadId: string) => {
        setLeads((prev) => {
            const targetLead = prev.find((l) => l.id === leadId);
            if (!targetLead) return prev;
            const next = getNextStatus(targetLead.status as LeadStatus);
            if (!next) {
                // Convert to client — disappear from list
                console.log("Converting lead to client and removing from list:", targetLead.company);
                return prev.filter((l) => l.id !== leadId);
            }
            return prev.map((l) => (l.id === leadId ? { ...l, status: next } : l));
        });
    };

    const filteredLeads = leads.filter((lead) => {
        if (activeTab === "all") return true;
        return lead.status === activeTab;
    });

    const getStatusCount = (status: "all" | "new" | "contacted" | "meeting booked") => {
        if (status === "all") return leads.length;
        return leads.filter((l) => l.status === status).length;
    };

    const tabOptions: TabOption[] = [
        { label: `All (${getStatusCount("all")})`, value: "all" },
        { label: `New (${getStatusCount("new")})`, value: "new" },
        { label: `Contacted (${getStatusCount("contacted")})`, value: "contacted" },
        { label: `Meetings (${getStatusCount("meeting booked")})`, value: "meeting booked" },
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
                    onChange={setActiveTab}
                    className="mb-6"
                />

                {/* Lead Items list */}
                <div className="space-y-3">
                    {filteredLeads.map((lead) => {
                        const action = getActionConfig(lead.status as LeadStatus);
                        const ActionIcon = action.icon;
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
                                        <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit capitalize ${lead.status === "new"
                                                ? "bg-slate-100 text-slate-800 border-transparent"
                                                : lead.status === "contacted"
                                                    ? "bg-blue-50 text-blue-700 border-transparent"
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
                                    <Button
                                        variant={action.isPrimary ? "primary" : "outline"}
                                        size="sm"
                                        prefixIcon={ActionIcon}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleStatusChange(lead.id);
                                        }}
                                    >
                                        {action.text}
                                    </Button>
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
