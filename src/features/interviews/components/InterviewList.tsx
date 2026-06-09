import React, { useState } from "react";
import { Link } from "react-router";
import { Typography, Tabs, Button } from "../../../components/ui";
import { Calendar as CalendarIcon, Users, Briefcase, MapPin, Clock, Video } from "lucide-react";

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

interface InterviewListProps {
    interviews: Interview[];
}

export const InterviewList: React.FC<InterviewListProps> = ({ interviews }) => {
    const [activeTab, setActiveTab] = useState<string>("upcoming");

    const scheduledInterviews = interviews.filter((i) => i.status === "scheduled");
    const completedInterviews = interviews.filter((i) => i.status === "completed");

    const renderCalendarGrid = () => {
        const totalDays = 30;
        const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        return (
            <div className="bg-white rounded-xl border border-btn-sec-border p-6 text-left">
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

            {activeTab === "upcoming" && (
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 text-left">
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
                                            className="flex-1 md:flex-none"
                                        >
                                            <Button variant="secondary" className="w-full">
                                                View Candidate
                                            </Button>
                                        </Link>
                                        <Button
                                            className="flex-1 md:flex-none font-semibold text-white"
                                            prefixIcon={Video}
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
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 text-center py-12">
                    <Typography variant="body1" className="text-muted-text font-medium">
                        No completed interviews yet.
                    </Typography>
                </div>
            )}

            {activeTab === "calendar" && renderCalendarGrid()}
        </div>
    );
};
