import React, { useState } from "react";
import { PageHeader } from "../../../components/ui";
import { Calendar as CalendarIcon } from "lucide-react";
import { InterviewStats, InterviewList, ScheduleInterviewModal } from "../components";

import { Interview } from "../types";
import { initialInterviews } from "../fake-data";

export const InterviewsContainer: React.FC = () => {
    // Local state for interviews
    const [interviews, setInterviews] = useState<Interview[]>(initialInterviews);

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
