export interface LeadNoteUser {
    id: string;
    email: string;
    full_name: string;
}

export interface LeadNote {
    id: number;
    content: string;
    model: string;
    model_id: number;
    user: LeadNoteUser;
    created_at: string;
    updated_at: string;
}

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
    notesList?: LeadNote[];
}

export interface LeadDetailsModalProps {
    isOpen: boolean;
    lead: LeadDetailItem | null;
    onClose: () => void;
    onSaveNotes?: (id: string, notes: string) => void;
    onNoteAdded?: () => void;
}

export interface GenerateLeadsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (filters: {
        country: string;
        industry: string;
        companySize: string;
        hiringActivity: string;
    }) => Promise<void>;
}

export type LeadStatus = "new" | "contacted" | "meeting" | "converted" | "lost";

export interface Lead extends LeadDetailItem {
    accentColor: string;
}

