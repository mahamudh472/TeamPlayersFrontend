import { OptionType } from "../../../shared/types";

export interface JobPosition {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    status: string;
    skills: string[];
    applicants: number;
    shortlisted: number;
    interviewed: number;
}

export interface JobCreateFormProps {
    title: string;
    setTitle: (val: string) => void;
    client: OptionType | null;
    setClient: (val: OptionType | null) => void;
    location: string;
    setLocation: (val: string) => void;
    salary: string;
    setSalary: (val: string) => void;
    experience: string;
    setExperience: (val: string) => void;
    description: string;
    setDescription: (val: string) => void;
    selectedFile: File | null;
    setSelectedFile: (val: File | null) => void;
    isAnalyzing: boolean;
    setIsAnalyzing: (val: boolean) => void;
    analysisSuccess: boolean;
    setAnalysisSuccess: (val: boolean) => void;
}

export interface JobDetailsHeaderProps {
    id?: string;
    title: string;
    status: string;
    company: string;
    location: string;
    salary: string;
}

export interface CandidateItem {
    id: string;
    name: string;
    matchScore: number;
    status: string;
    location: string;
    experience: string;
}

export interface JobDetailsStatsProps {
    applicants: number;
    shortlisted: number;
    interviewed: number;
    daysActive: number;
}
