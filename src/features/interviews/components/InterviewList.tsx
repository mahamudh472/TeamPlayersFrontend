import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Typography, Tabs, Button } from "../../../components/ui";
import { Calendar as CalendarIcon, Users, Briefcase, MapPin, Clock, Video, Search, ChevronLeft, ChevronRight } from "lucide-react";

import { Interview, InterviewListProps } from "../types";

const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
};

const getFirstDayOfMonthOffset = (year: number, month: number) => {
    // getDay() returns 0 for Sunday, 1 for Monday, etc.
    const day = new Date(year, month - 1, 1).getDay();
    // Monday (1) -> 0
    // Tuesday (2) -> 1
    // ...
    // Sunday (0) -> 6
    return day === 0 ? 6 : day - 1;
};

export const InterviewList: React.FC<InterviewListProps> = ({
    interviews,
    activeTab,
    onTabChange,
    searchQuery,
    onSearchChange,
    page,
    onPageChange,
    hasMore,
    hasLess,
    isLoading,
    scheduledCount,
    completedCount,
    calendarYear,
    calendarMonth,
    onCalendarNavigate,
}) => {
    const [localQuery, setLocalQuery] = useState(searchQuery);

    // Debounce search query update
    useEffect(() => {
        const handler = setTimeout(() => {
            onSearchChange(localQuery);
        }, 300);

        return () => clearTimeout(handler);
    }, [localQuery, onSearchChange]);

    // Keep local query in sync if it changes from outside
    useEffect(() => {
        setLocalQuery(searchQuery);
    }, [searchQuery]);

    const handlePrevMonth = () => {
        if (calendarMonth === 1) {
            onCalendarNavigate(calendarYear - 1, 12);
        } else {
            onCalendarNavigate(calendarYear, calendarMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (calendarMonth === 12) {
            onCalendarNavigate(calendarYear + 1, 1);
        } else {
            onCalendarNavigate(calendarYear, calendarMonth + 1);
        }
    };

    const renderCalendarGrid = () => {
        const daysInMonth = getDaysInMonth(calendarYear, calendarMonth);
        const offset = getFirstDayOfMonthOffset(calendarYear, calendarMonth);
        const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        const monthName = new Date(calendarYear, calendarMonth - 1).toLocaleString("en-US", { month: "long" });

        const cells = [];

        // Empty cells for offset padding
        for (let i = 0; i < offset; i++) {
            cells.push(
                <div
                    key={`empty-${i}`}
                    className="min-h-[90px] border border-btn-sec-border bg-slate-50/20 rounded-lg p-2 opacity-40"
                />
            );
        }

        // Days of month
        for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
            const formattedMonth = String(calendarMonth).padStart(2, "0");
            const formattedDay = String(dayNum).padStart(2, "0");
            const dateString = `${calendarYear}-${formattedMonth}-${formattedDay}`;
            const dayInterviews = interviews.filter((i) => i.date === dateString);

            cells.push(
                <div
                    key={`day-${dayNum}`}
                    className={`min-h-[90px] border border-btn-sec-border rounded-lg p-2 flex flex-col justify-between transition-all hover:bg-slate-50/50 ${
                        dayInterviews.length > 0 ? "border-primary/30 bg-primary/5" : ""
                    }`}
                >
                    <span className={`text-xs font-bold ${dayInterviews.length > 0 ? "text-primary" : "text-text-main"}`}>
                        {dayNum}
                    </span>
                    <div className="space-y-1">
                        {dayInterviews.map((int) => (
                            <div
                                key={int.id}
                                className="text-[10px] bg-primary text-white font-medium p-1 rounded-sm truncate"
                                title={`${int.candidateName} - ${int.role}`}
                            >
                                {int.time} {int.candidateName.split(" ")[0]}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className="bg-white rounded-xl border border-btn-sec-border p-6 text-left">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Typography variant="h4" className="font-bold text-text-main">
                            {monthName} {calendarYear}
                        </Typography>
                        <div className="flex gap-1.5">
                            <button
                                type="button"
                                onClick={handlePrevMonth}
                                className="inline-flex items-center justify-center border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 w-8 h-8 rounded-lg transition-colors cursor-pointer"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={handleNextMonth}
                                className="inline-flex items-center justify-center border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 w-8 h-8 rounded-lg transition-colors cursor-pointer"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                        <span className="text-xs text-muted-text font-semibold">Scheduled Interviews</span>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center font-semibold text-sm text-muted-text mb-2">
                    {weekDays.map((wd) => (
                        <div key={wd} className="py-2">
                            {wd}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {cells}
                </div>
            </div>
        );
    };


    return (
        <div className="flex flex-col gap-4">
            <Tabs
                options={[
                    { label: `Upcoming (${scheduledCount})`, value: "upcoming" },
                    { label: `Completed (${completedCount})`, value: "completed" },
                    { label: "Calendar View", value: "calendar" },
                ]}
                value={activeTab}
                onChange={onTabChange}
            />

            {isLoading && interviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 min-h-[200px] bg-white rounded-xl border border-btn-sec-border">
                    <svg
                        className="animate-spin text-primary shrink-0 w-8 h-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span className="text-sm text-muted-text mt-4">Loading interviews...</span>
                </div>
            ) : (
                <>
                    {activeTab === "upcoming" && (
                        <div className="bg-white rounded-xl border border-btn-sec-border p-6 text-left">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <Typography variant="h4" className="font-bold text-text-main leading-none">
                                    Upcoming Interviews
                                </Typography>
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-text" />
                                    <input
                                        type="text"
                                        value={localQuery}
                                        onChange={(e) => setLocalQuery(e.target.value)}
                                        className="flex h-9 w-full rounded-md border border-btn-sec-border px-3 py-1 text-sm bg-white outline-none pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        placeholder="Search interviews..."
                                    />
                                </div>
                            </div>

                            {interviews.length === 0 ? (
                                <div className="text-center py-8 text-muted-text text-sm">
                                    No upcoming interviews found.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {interviews.map((int) => (
                                        <div key={int.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border border-btn-sec-border rounded-xl">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Users className="w-6 h-6 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                    <h3 className="font-bold text-text-main">{int.candidateName}</h3>
                                                    <span className="inline-flex items-center justify-center rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-xs font-semibold text-primary capitalize">
                                                        {int.status}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-text">
                                                    <div className="flex items-center gap-1.5">
                                                        <Briefcase className="w-4 h-4 text-muted-text" />
                                                        <span>{int.role}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="w-4 h-4 text-muted-text" />
                                                        <span>{int.company}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <CalendarIcon className="w-4 h-4 text-muted-text" />
                                                        <span>{int.date || "N/A"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-4 h-4 text-muted-text" />
                                                        <span>{int.time || "N/A"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 w-full md:w-auto">
                                                <Link
                                                    to={`/dashboard/candidates/${int.candidateId}`}
                                                    className="flex-1 md:flex-none"
                                                >
                                                    <Button variant="secondary" className="w-full">
                                                        View Candidate
                                                    </Button>
                                                </Link>
                                                <Button
                                                    className="flex-1 md:flex-none font-semibold text-white"
                                                    prefixIcon={Video}
                                                    disabled={!int.meetingLink}
                                                    onClick={() => int.meetingLink && window.open(int.meetingLink, "_blank")}
                                                >
                                                    Join Call
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "completed" && (
                        <div className="bg-white rounded-xl border border-btn-sec-border p-6 text-left">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <Typography variant="h4" className="font-bold text-text-main leading-none">
                                    Completed Interviews
                                </Typography>
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-text" />
                                    <input
                                        type="text"
                                        value={localQuery}
                                        onChange={(e) => setLocalQuery(e.target.value)}
                                        className="flex h-9 w-full rounded-md border border-btn-sec-border px-3 py-1 text-sm bg-white outline-none pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        placeholder="Search interviews..."
                                    />
                                </div>
                            </div>

                            {interviews.length === 0 ? (
                                <div className="text-center py-8 text-muted-text text-sm">
                                    No completed interviews found.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {interviews.map((int) => (
                                        <div key={int.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border border-btn-sec-border rounded-xl">
                                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                                <Users className="w-6 h-6 text-slate-500" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                    <h3 className="font-bold text-text-main">{int.candidateName}</h3>
                                                    <span className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-500 capitalize">
                                                        {int.status}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-text">
                                                    <div className="flex items-center gap-1.5">
                                                        <Briefcase className="w-4 h-4 text-muted-text" />
                                                        <span>{int.role}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="w-4 h-4 text-muted-text" />
                                                        <span>{int.company}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <CalendarIcon className="w-4 h-4 text-muted-text" />
                                                        <span>{int.date || "N/A"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-4 h-4 text-muted-text" />
                                                        <span>{int.time || "N/A"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 w-full md:w-auto">
                                                <Link
                                                    to={`/dashboard/candidates/${int.candidateId}`}
                                                    className="flex-1 md:flex-none"
                                                >
                                                    <Button variant="secondary" className="w-full">
                                                        View Candidate
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "calendar" && renderCalendarGrid()}

                    {/* Pagination Controls */}
                    {activeTab !== "calendar" && (hasLess || hasMore) && (
                        <div className="px-6 py-4 flex items-center justify-between border border-btn-sec-border bg-white rounded-xl mt-4">
                            <Typography variant="body2" className="text-muted-text font-medium">
                                Page {page}
                            </Typography>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    disabled={!hasLess || isLoading}
                                    onClick={() => onPageChange(page - 1)}
                                    className="inline-flex items-center justify-center text-sm font-semibold transition-all outline-none border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 h-9 rounded-lg px-3 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    disabled={!hasMore || isLoading}
                                    onClick={() => onPageChange(page + 1)}
                                    className="inline-flex items-center justify-center text-sm font-semibold transition-all outline-none border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 h-9 rounded-lg px-3 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

