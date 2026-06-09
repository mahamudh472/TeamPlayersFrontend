import React, { useState } from "react";
import { PageHeader } from "../../../components/ui";
import { Calendar as CalendarIcon } from "lucide-react";
import { InterviewStats, InterviewList, ScheduleInterviewModal } from "../components";

interface Interview {
    id: string;
    candidateId: string;
    candidateName: string;
    role: string;
    company: string;
    date: string;
    time: string;
    status: "scheduled" | "completed";
}

export const InterviewsContainer: React.FC = () => {
    // Local state for interviews
    const [interviews, setInterviews] = useState<Interview[]>([
        {
            id: "1",
            candidateId: "2",
            candidateName: "Sarah Martinez",
            role: "Senior Software Engineer",
            company: "GlobalTech Industries",
            date: "2026-06-10",
            time: "14:00",
            status: "scheduled",
        },
        {
            id: "2",
            candidateId: "3",
            candidateName: "James Wilson",
            role: "Product Manager",
            company: "GlobalTech Industries",
            date: "2026-06-08",
            time: "10:00",
            status: "scheduled",
        },
    ]);

    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

    const scheduledInterviews = interviews.filter((i) => i.status === "scheduled");
    const completedInterviews = interviews.filter((i) => i.status === "completed");

    const handleSchedule = (
        candidateName: string,
        role: string,
        company: string,
        date: string,
        time: string
    ) => {
        const newInterview: Interview = {
            id: String(interviews.length + 1),
            candidateId: String(interviews.length + 2),
            candidateName,
            role,
            company,
            date,
            time,
            status: "scheduled",
        };

        setInterviews([...interviews, newInterview]);
    };

    return (
        <main className="space-y-6">
            {/* Header info bar */}
            <PageHeader
                title="Interviews"
                subtitle="Manage your interview schedule"
                action={{
                    title: "Schedule Interview",
                    icon: CalendarIcon,
                    onClick: () => setIsScheduleModalOpen(true),
                }}
            />

            {/* Metrics cards grid */}
            <InterviewStats
                scheduledCount={scheduledInterviews.length}
                completedCount={completedInterviews.length}
            />

            {/* List and Tabs View */}
            <InterviewList interviews={interviews} />

            {/* Schedule Interview Modal */}
            <ScheduleInterviewModal
                isOpen={isScheduleModalOpen}
                onClose={() => setIsScheduleModalOpen(false)}
                onSchedule={handleSchedule}
            />
        </main>
    );
};
