import React, { useState } from "react";
import { Link } from "react-router";
import { Typography, Select, OptionType, Tabs, TabOption } from "../../../components/ui";
import { Calendar as CalendarIcon, Users, Briefcase, MapPin, Clock, Video, Plus, X, CheckCircle2 } from "lucide-react";

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

    const [activeTab, setActiveTab] = useState<string>("upcoming");
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

    const candidatesOptions: OptionType[] = [
        { label: "Alex Thompson", value: "Alex Thompson" },
        { label: "Sarah Martinez", value: "Sarah Martinez" },
        { label: "James Wilson", value: "James Wilson" },
        { label: "Emily Davis", value: "Emily Davis" },
    ];

    const jobsOptions: OptionType[] = [
        { label: "Senior Software Engineer - GlobalTech Industries", value: "Senior Software Engineer|GlobalTech Industries" },
        { label: "Product Manager - GlobalTech Industries", value: "Product Manager|GlobalTech Industries" },
        { label: "Frontend Developer - Acme Corp", value: "Frontend Developer|Acme Corp" },
        { label: "Fullstack Developer - TechCorp Solutions", value: "Fullstack Developer|TechCorp Solutions" },
    ];

    // Modal Form States
    const [selectedCandidate, setSelectedCandidate] = useState<OptionType | null>(null);
    const [selectedJob, setSelectedJob] = useState<OptionType | null>(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const scheduledInterviews = interviews.filter((i) => i.status === "scheduled");
    const completedInterviews = interviews.filter((i) => i.status === "completed");

    const handleSchedule = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCandidate || !selectedJob || !date || !time) return;

        const [jobRole, jobCompany] = selectedJob.value.split("|");

        const newInterview: Interview = {
            id: String(interviews.length + 1),
            candidateId: String(interviews.length + 2),
            candidateName: selectedCandidate.label,
            role: jobRole,
            company: jobCompany,
            date,
            time,
            status: "scheduled",
        };

        setInterviews([...interviews, newInterview]);
        setIsScheduleModalOpen(false);

        // Reset fields
        setSelectedCandidate(null);
        setSelectedJob(null);
        setDate("");
        setTime("");
    };

    // Calendar grid generator helper for June 2026 (June 1 is Monday, 30 days)
    const renderCalendarGrid = () => {
        const totalDays = 30;
        const days = [];
        // Add headers
        const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        return (
            <div className="bg-white rounded-xl border border-btn-sec-border p-6">
                <div className="flex items-center justify-between mb-6">
                    <Typography variant="h4" className="font-bold text-text-main">
                        June 2026
                    </Typography>
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
                    {/* June 1 is Monday, so no offset days are needed */}
                    {Array.from({ length: totalDays }).map((_, idx) => {
                        const dayNum = idx + 1;
                        const dateString = `2026-06-${dayNum < 10 ? "0" + dayNum : dayNum}`;
                        const dayInterviews = interviews.filter((i) => i.date === dateString);

                        return (
                            <div
                                key={dayNum}
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
                    })}
                </div>
            </div>
        );
    };

    return (
        <main className="space-y-6">
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <Typography variant="h2" className="text-2xl font-bold text-text-main leading-tight">
                        Interviews
                    </Typography>
                    <Typography variant="body1" className="text-muted-text mt-1">
                        Manage your interview schedule
                    </Typography>
                </div>
                <button
                    onClick={() => setIsScheduleModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 h-10 text-sm font-medium bg-primary hover:bg-primary/95 text-white rounded-lg transition-colors cursor-pointer"
                >
                    <CalendarIcon className="w-4 h-4" />
                    Schedule Interview
                </button>
            </div>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs flex flex-col justify-between min-h-[100px]">
                    <Typography variant="body2" className="text-muted-text font-semibold">
                        Scheduled
                    </Typography>
                    <Typography variant="h2" className="font-extrabold text-text-main mt-2">
                        {scheduledInterviews.length}
                    </Typography>
                </div>
                <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs flex flex-col justify-between min-h-[100px]">
                    <Typography variant="body2" className="text-muted-text font-semibold">
                        Completed
                    </Typography>
                    <Typography variant="h2" className="font-extrabold text-green-500 mt-2">
                        {completedInterviews.length}
                    </Typography>
                </div>
                <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs flex flex-col justify-between min-h-[100px]">
                    <Typography variant="body2" className="text-muted-text font-semibold">
                        This Week
                    </Typography>
                    <Typography variant="h2" className="font-extrabold text-primary mt-2">
                        {scheduledInterviews.length}
                    </Typography>
                </div>
            </div>

            {/* Tab Trigger Bar */}
            <div className="flex flex-col gap-4">
                <Tabs
                    options={[
                        { label: `Upcoming (${scheduledInterviews.length})`, value: "upcoming" },
                        { label: `Completed (${completedInterviews.length})`, value: "completed" },
                        { label: "Calendar View", value: "calendar" },
                    ]}
                    value={activeTab}
                    onChange={setActiveTab}
                />

                {/* Tab Contents */}
                {activeTab === "upcoming" && (
                    <div className="bg-white rounded-xl border border-btn-sec-border p-6">
                        <div className="mb-4">
                            <Typography variant="h4" className="font-bold text-text-main leading-none">
                                Upcoming Interviews
                            </Typography>
                        </div>

                        {scheduledInterviews.length === 0 ? (
                            <div className="text-center py-8 text-muted-text text-sm">
                                No upcoming interviews scheduled.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {scheduledInterviews.map((int) => (
                                    <div key={int.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border border-btn-sec-border rounded-xl">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Users className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                <h3 className="font-bold text-text-main">{int.candidateName}</h3>
                                                <span className="inline-flex items-center justify-center rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-xs font-semibold text-primary">
                                                    scheduled
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
                                                    <span>{int.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-4 h-4 text-muted-text" />
                                                    <span>{int.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 w-full md:w-auto">
                                            <Link
                                                to={`/dashboard/candidates/${int.candidateId}`}
                                                className="flex-1 md:flex-none inline-flex items-center justify-center px-4 h-9 text-sm font-semibold border border-btn-sec-border hover:bg-slate-50 text-text-main rounded-lg transition-colors"
                                            >
                                                View Candidate
                                            </Link>
                                            <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 h-9 text-sm font-semibold bg-primary hover:bg-primary/95 text-white rounded-lg transition-colors cursor-pointer">
                                                <Video className="w-4 h-4" />
                                                Join Call
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "completed" && (
                    <div className="bg-white rounded-xl border border-btn-sec-border p-6 text-center py-12">
                        <Typography variant="body1" className="text-muted-text font-medium">
                            No completed interviews yet.
                        </Typography>
                    </div>
                )}

                {activeTab === "calendar" && renderCalendarGrid()}
            </div>

            {/* Schedule Interview Modal */}
            {isScheduleModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in-0 duration-200">
                    <div className="bg-white rounded-xl border border-btn-sec-border shadow-lg max-w-md w-full p-6 relative">
                        <button
                            onClick={() => setIsScheduleModalOpen(false)}
                            className="absolute top-4 right-4 text-muted-text hover:text-text-main cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="mb-6">
                            <Typography variant="h3" className="font-bold text-text-main">
                                Schedule Interview
                            </Typography>
                            <Typography variant="body2" className="text-muted-text mt-1">
                                Setup details for a candidate screening call
                            </Typography>
                        </div>

                        <form onSubmit={handleSchedule} className="space-y-4">
                            <Select
                                label="Candidate Name"
                                placeholder="Select candidate"
                                options={candidatesOptions}
                                value={selectedCandidate}
                                onChange={(val) => setSelectedCandidate(val as OptionType | null)}
                            />

                            <Select
                                label="Job / Role"
                                placeholder="Select job role"
                                options={jobsOptions}
                                value={selectedJob}
                                onChange={(val) => setSelectedJob(val as OptionType | null)}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-text-main">Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full h-10 border border-btn-sec-border rounded-lg bg-white px-3 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-text-main">Time</label>
                                    <input
                                        type="time"
                                        required
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="w-full h-10 border border-btn-sec-border rounded-lg bg-white px-3 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsScheduleModalOpen(false)}
                                    className="flex-1 inline-flex items-center justify-center h-10 text-sm font-semibold border border-btn-sec-border hover:bg-slate-50 text-text-main rounded-lg transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 inline-flex items-center justify-center h-10 text-sm font-semibold bg-primary hover:bg-primary/95 text-white rounded-lg transition-colors cursor-pointer"
                                >
                                    Schedule
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};
