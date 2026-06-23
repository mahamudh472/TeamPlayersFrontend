export interface Interview {
    id: string;
    candidateId: string;
    candidateName: string;
    role: string;
    company: string;
    date: string;
    time: string;
    status: string;
    meetingLink?: string;
}

export interface InterviewListProps {
    interviews: Interview[];
    activeTab: string;
    onTabChange: (tab: string) => void;
    searchQuery: string;
    onSearchChange: (search: string) => void;
    page: number;
    onPageChange: (page: number) => void;
    hasMore: boolean;
    hasLess: boolean;
    isLoading: boolean;
    scheduledCount: number;
    completedCount: number;
    calendarYear: number;
    calendarMonth: number;
    onCalendarNavigate: (year: number, month: number) => void;
}


export interface ScheduleInterviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSchedule: (candidateName: string, role: string, company: string, date: string, time: string) => void;
}

export interface InterviewStatsProps {
    scheduledCount: number;
    completedCount: number;
    thisWeekCount?: number;
}

