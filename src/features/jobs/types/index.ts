import { OptionType } from "../../../shared/types";

export interface JobPosition {
    id: number | string;
    client: number;
    client_name: string;
    title: string;
    description: string;
    location: string;
    salary_range: string;
    experince_required: number;
    skills: string[];
    job_type: string;
    status: string;
    description_file?: string | null;
    applicants: number;
    shortlisted: number;
    interviewed: number;
    created_at?: string;
    updated_at?: string;
}

export interface AIGeneratedJobDescription {
    success: boolean;
    error_message: string | null;
    job_title: string;
    company_name: string;
    department: string;
    industry: string;
    employment_type: string;
    work_mode: string;
    location: string;
    minimum_experience: number;
    maximum_experience: number;
    minimum_salary: string;
    maximum_salary: string;
    currency: string;
    required_skills: string[];
    preferred_skills: string[];
    required_languages: string[];
    required_certifications: string[];
    required_degree: string;
    preferred_degree: string;
    summary: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
    full_description: string;
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
    skills: string;
    setSkills: (val: string) => void;
    jobType: OptionType | null;
    setJobType: (val: OptionType | null) => void;
    status: OptionType | null;
    setStatus: (val: OptionType | null) => void;
    description: string;
    setDescription: (val: string) => void;
    selectedFile: File | null;
    setSelectedFile: (val: File | null) => void;
    isAnalyzing: boolean;
    analysisSuccess: boolean;
    aiText: string;
    setAiText: (val: string) => void;
    aiError: string | null;
    onAnalyzeAI: () => void;
    clients: OptionType[];
    isEdit: boolean;
}

export interface JobDetailsHeaderProps {
    id?: string;
    title: string;
    status: string;
    company: string;
    location: string;
    salary: string;
    onUploadCV?: () => void;
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
