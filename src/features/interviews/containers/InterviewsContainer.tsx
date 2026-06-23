import React, { useState, useEffect, useCallback } from "react";
import { PageHeader } from "../../../components/ui";
import { Calendar as CalendarIcon } from "lucide-react";
import { InterviewStats, InterviewList, ScheduleInterviewModal } from "../components";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

import { Interview } from "../types";

export const InterviewsContainer: React.FC = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    // States
    const [interviews, setInterviews] = useState<Interview[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [activeTab, setActiveTab] = useState("upcoming");
    const [calendarYear, setCalendarYear] = useState(2026);
    const [calendarMonth, setCalendarMonth] = useState(6);

    // Summary statistics states
    const [scheduledCount, setScheduledCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [thisWeekCount, setThisWeekCount] = useState(0);

    // Pagination info
    const [next, setNext] = useState<string | null>(null);
    const [previous, setPrevious] = useState<string | null>(null);

    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

    const fetchInterviews = useCallback(async () => {
        if (!agencyId) {
            setError("Agency selection is required. Please select or join an agency.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);

            if (activeTab === "calendar") {
                const res = await apiClient.get("/api/v1/agency/interviews/calendar/", {
                    headers: { "X-Agency-ID": String(agencyId) },
                    params: {
                        year: calendarYear,
                        month: calendarMonth,
                    },
                });

                const results = res.data || [];
                const mapped: Interview[] = results.map((item: any) => {
                    let date = "";
                    let time = "";
                    if (item.meeting_time) {
                        try {
                            const dateObj = new Date(item.meeting_time);
                            if (!isNaN(dateObj.getTime())) {
                                const year = dateObj.getFullYear();
                                const month = String(dateObj.getMonth() + 1).padStart(2, "0");
                                const day = String(dateObj.getDate()).padStart(2, "0");
                                date = `${year}-${month}-${day}`;

                                const hours = String(dateObj.getHours()).padStart(2, "0");
                                const minutes = String(dateObj.getMinutes()).padStart(2, "0");
                                time = `${hours}:${minutes}`;
                            }
                        } catch (e) {
                            console.error("Error parsing meeting_time:", e);
                        }
                    }
                    return {
                        id: String(item.id),
                        candidateId: "",
                        candidateName: item.candidate_name,
                        role: item.position || "",
                        company: "",
                        date,
                        time,
                        status: "scheduled",
                    };
                });

                setInterviews(mapped);
                setNext(null);
                setPrevious(null);
            } else {
                // Map the frontend tab to backend status values
                let apiStatus = "upcoming";
                let pageSize = 10;
                if (activeTab === "completed") {
                    apiStatus = "completed";
                }

                const res = await apiClient.get("/api/v1/agency/interviews/", {
                    headers: { "X-Agency-ID": String(agencyId) },
                    params: {
                        status: apiStatus,
                        search: searchQuery || undefined,
                        page: page,
                        page_size: pageSize,
                    },
                });

                // Map backend objects to frontend Interview interface
                const results = res.data.results || [];
                const mapped: Interview[] = results.map((item: any) => {
                    let date = "";
                    let time = "";
                    if (item.meeting_time) {
                        try {
                            const dateObj = new Date(item.meeting_time);
                            if (!isNaN(dateObj.getTime())) {
                                const year = dateObj.getFullYear();
                                const month = String(dateObj.getMonth() + 1).padStart(2, "0");
                                const day = String(dateObj.getDate()).padStart(2, "0");
                                date = `${year}-${month}-${day}`;

                                const hours = String(dateObj.getHours()).padStart(2, "0");
                                const minutes = String(dateObj.getMinutes()).padStart(2, "0");
                                time = `${hours}:${minutes}`;
                            }
                        } catch (e) {
                            console.error("Error parsing meeting_time:", e);
                        }
                    }
                    return {
                        id: String(item.id),
                        candidateId: String(item.candidate),
                        candidateName: item.candidate_name,
                        role: item.job_title,
                        company: item.client_name,
                        date,
                        time,
                        status: item.status,
                        meetingLink: item.meeting_link,
                    };
                });

                setInterviews(mapped);
                setNext(res.data.next);
                setPrevious(res.data.previous);

                // Summary metrics
                setScheduledCount(res.data.scheduled_count || 0);
                setCompletedCount(res.data.completed_count || 0);
                setThisWeekCount(res.data.this_week_count || 0);
            }

            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch interviews:", err);
            const errMsg = err.response?.data?.detail || "Failed to load interviews";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsLoading(false);
        }
    }, [agencyId, activeTab, searchQuery, page, calendarYear, calendarMonth, toast]);

    useEffect(() => {
        fetchInterviews();
    }, [fetchInterviews]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setPage(1); // Reset page on tab change
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setPage(1); // Reset page on search change
    };

    const handleCalendarNavigate = (year: number, month: number) => {
        setCalendarYear(year);
        setCalendarMonth(month);
    };


    const handleSchedule = (
        candidateName: string,
        role: string,
        company: string,
        date: string,
        time: string
    ) => {
        // Since scheduling requires a specific candidate context, suggest going to the candidates list
        toast.info("To schedule a real interview, please go to the candidate's profile page.");
    };

    if (error) {
        return (
            <main className="space-y-6 text-left">
                <PageHeader
                    title="Interviews"
                    subtitle="Manage your interview schedule"
                />
                <div className="bg-red-50/55 border border-red-200/50 p-6 rounded-xl text-center max-w-lg mx-auto mt-12">
                    <h3 className="text-red-800 font-semibold mb-2">Access Error</h3>
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            </main>
        );
    }

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
                scheduledCount={scheduledCount}
                completedCount={completedCount}
                thisWeekCount={thisWeekCount}
            />

            {/* List and Tabs View */}
            <InterviewList
                interviews={interviews}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                page={page}
                onPageChange={setPage}
                hasMore={!!next}
                hasLess={!!previous}
                isLoading={isLoading}
                scheduledCount={scheduledCount}
                completedCount={completedCount}
                calendarYear={calendarYear}
                calendarMonth={calendarMonth}
                onCalendarNavigate={handleCalendarNavigate}
            />

            {/* Schedule Interview Modal */}
            <ScheduleInterviewModal
                isOpen={isScheduleModalOpen}
                onClose={() => setIsScheduleModalOpen(false)}
                onSchedule={handleSchedule}
            />
        </main>
    );
};

