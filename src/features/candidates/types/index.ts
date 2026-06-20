export type CandidateStatus = "new" | "shortlisted" | "interviewing" | "interview_scheduled" | "rejected";

export interface CandidateItem {
    id: string;
    name: string;
    role: string;
    matchScore: number;
    status: CandidateStatus;
    location: string;
    experience: string;
    salary?: string;
    appliedDate: string;
}

export interface CandidateDetailsHeaderProps {
    name: string;
    matchScore: number;
    status: CandidateStatus;
    email: string;
    phone: string;
    location: string;
    appliedJobs: { id: string; title: string }[];
    interviewDate?: string;
    interviewTime?: string;
    jobTitle?: string;
    jobId?: string;
    onReject: () => void;
    onShortlist: (jobId: string) => void;
    onScheduleInterview: (date: string, time: string) => void;
}

export interface CandidateDetailsSidebarProps {
    jobTitle: string;
    jobLocation: string;
    jobSalary: string;
    jobId: string;
    skillsMatch: number;
    experienceMatch: number;
    salaryMatch: number;
    locationMatch: number;
    recommendedActions: string[];
}

export interface CandidateDetailsSummaryProps {
    matchScore: number;
    summaryText: string;
    strengths: string[];
    concerns: string[];
}

export interface CandidateDetailsTabsProps {
    experience: string;
    location: string;
    currentSalary: string;
    expectedSalary: string;
    skills: string[];
    appliedDate: string;
    notes: any[];
    onAddNote: (content: string) => Promise<void>;
    isLoadingNotes: boolean;
    resume?: string;
}

