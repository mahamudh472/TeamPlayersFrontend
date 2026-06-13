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

export interface LeadDetailsModalProps {
    isOpen: boolean;
    lead: LeadDetailItem | null;
    onClose: () => void;
    onSaveNotes?: (id: string, notes: string) => void;
}

export interface GenerateLeadsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (filters: {
        country: string;
        industry: string;
        companySize: string;
        hiringActivity: string;
    }) => void;
}

export type LeadStatus = "new" | "contacted" | "meeting booked";

export interface Lead extends LeadDetailItem {
    accentColor: string;
}
