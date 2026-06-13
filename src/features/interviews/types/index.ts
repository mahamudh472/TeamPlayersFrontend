export interface Interview {
    id: string;
    candidateId: string;
    candidateName: string;
    role: string;
    company: string;
    date: string;
    time: string;
    status: "scheduled" | "completed";
}

export interface InterviewListProps {
    interviews: Interview[];
}

export interface ScheduleInterviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSchedule: (candidateName: string, role: string, company: string, date: string, time: string) => void;
}

export interface InterviewStatsProps {
    scheduledCount: number;
    completedCount: number;
}
