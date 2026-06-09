import React, { useState } from "react";
import { Link } from "react-router";
import { Typography, Tabs, TabOption, Button } from "../../../components/ui";
import { Briefcase } from "lucide-react";

interface JobItem {
    id: string;
    title: string;
    status: string;
    location: string;
    salary: string;
    experience: string;
    applicants: number;
    shortlisted: number;
}

export const ClientDetailsTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("jobs");
    const [notes, setNotes] = useState<string[]>([
        "Initial discovery call completed successfully. Interested in senior tech hires.",
    ]);
    const [newNote, setNewNote] = useState("");

    const jobs: JobItem[] = [
        {
            id: "1",
            title: "Senior Software Engineer",
            status: "active",
            location: "London, UK",
            salary: "£70,000 - £90,000",
            experience: "5+ years",
            applicants: 45,
            shortlisted: 8,
        },
        {
            id: "2",
            title: "Product Manager",
            status: "active",
            location: "Manchester, UK",
            salary: "£60,000 - £80,000",
            experience: "3-5 years",
            applicants: 32,
            shortlisted: 6,
        },
    ];

    const handleAddNote = (e: React.FormEvent) => {
        e.preventDefault();
        if (newNote.trim()) {
            setNotes([newNote, ...notes]);
            setNewNote("");
        }
    };

    const tabOptions: TabOption[] = [
        { label: `Jobs (${jobs.length})`, value: "jobs" },
        { label: "Activity", value: "activity" },
        { label: `Notes (${notes.length})`, value: "notes" },
    ];

    return (
        <div className="flex flex-col gap-4">
            <Tabs
                options={tabOptions}
                value={activeTab}
                onChange={setActiveTab}
            />

            {/* Jobs Tab Content */}
            {activeTab === "jobs" && (
                <div className="bg-white rounded-xl border border-btn-sec-border flex flex-col gap-6">
                    <div className="px-6 pt-6 pb-2">
                        <div className="flex items-center justify-between">
                            <Typography variant="h4" className="font-bold text-text-main leading-none">
                                Active Jobs
                            </Typography>
                            <Link
                                to="/dashboard/jobs/create"
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all bg-primary hover:bg-primary/95 text-white h-8 rounded-md gap-1.5 px-3"
                            >
                                <Briefcase className="w-4 h-4" />
                                New Job
                            </Link>
                        </div>
                    </div>

                    <div className="px-6 pb-6">
                        <div className="space-y-3">
                            {jobs.map((job) => (
                                <Link
                                    key={job.id}
                                    to={`/dashboard/jobs/${job.id}`}
                                    className="flex items-center gap-4 p-4 border border-btn-sec-border rounded-xl hover:bg-slate-50/50 transition-colors"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Typography variant="body1" className="font-semibold text-text-main">
                                                {job.title}
                                            </Typography>
                                            <span className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold w-fit capitalize">
                                                {job.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-text">
                                            <span>{job.location}</span>
                                            <span>{job.salary}</span>
                                            <span>{job.experience}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 text-sm text-right">
                                        <div>
                                            <p className="text-lg font-bold text-text-main">{job.applicants}</p>
                                            <p className="text-xs text-muted-text">Applicants</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-text-main">{job.shortlisted}</p>
                                            <p className="text-xs text-muted-text">Shortlisted</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Activity Tab Content */}
            {activeTab === "activity" && (
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-4">
                    <Typography variant="h4" className="font-bold text-text-main">
                        Recent Activity
                    </Typography>
                    <div className="border-l-2 border-slate-100 pl-4 space-y-6 py-2">
                        <div className="relative">
                            <div className="absolute -left-[23px] top-1 bg-white border-2 border-primary w-2.5 h-2.5 rounded-full" />
                            <p className="text-sm font-semibold text-text-main">Placement confirmed</p>
                            <p className="text-xs text-muted-text">2 days ago by John Doe</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[23px] top-1 bg-white border-2 border-slate-300 w-2.5 h-2.5 rounded-full" />
                            <p className="text-sm font-semibold text-text-main">Job "Product Manager" posted</p>
                            <p className="text-xs text-muted-text">1 week ago by John Doe</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Notes Tab Content */}
            {activeTab === "notes" && (
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-6">
                    <Typography variant="h4" className="font-bold text-text-main">
                        Client Notes
                    </Typography>

                    <form onSubmit={handleAddNote} className="space-y-3">
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Add a new note for this client..."
                            rows={3}
                            className="w-full resize-none border border-btn-sec-border rounded-lg bg-white px-3 py-2 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                        <Button
                            type="submit"
                        >
                            Add Note
                        </Button>
                    </form>

                    <div className="space-y-3 pt-2">
                        {notes.map((note, idx) => (
                            <div key={idx} className="p-4 border border-btn-sec-border rounded-xl bg-slate-50/30">
                                <p className="text-sm text-text-main">{note}</p>
                                <p className="text-xs text-muted-text mt-1.5">Just now</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
