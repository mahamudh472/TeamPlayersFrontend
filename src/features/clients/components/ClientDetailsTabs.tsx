import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { Typography, Tabs, TabOption, Button, Select, OptionType } from "../../../components/ui";
import { Briefcase, Loader2, Calendar, User } from "lucide-react";
import { apiClient } from "../../../shared/api/apiClient";
import { useToast } from "../../../shared/context/ToastContext";

interface JobItem {
    id: number;
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
    description_file: string | null;
    applicants: number;
    shortlisted: number;
    interviewed: number;
    created_at: string;
    updated_at: string;
}

interface ActivityUser {
    id: string;
    email: string;
    full_name: string;
}

interface ActivityItem {
    id: number;
    client: number;
    user: ActivityUser;
    summary: string;
    created_at: string;
    updated_at: string;
}

interface NoteUser {
    id: string;
    email: string;
    full_name: string;
}

interface NoteItem {
    id: number;
    content: string;
    model: string;
    model_id: number;
    user: NoteUser;
    created_at: string;
    updated_at: string;
}

interface ClientDetailsTabsProps {
    clientId: string;
    agencyId: string;
}

export const ClientDetailsTabs: React.FC<ClientDetailsTabsProps> = ({ clientId, agencyId }) => {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<string>("jobs");

    // Jobs state
    const [jobs, setJobs] = useState<JobItem[]>([]);
    const [isJobsLoading, setIsJobsLoading] = useState(true);
    const [jobsError, setJobsError] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<OptionType>({ label: "Open (Active)", value: "open" });

    // Activities state
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [isActivitiesLoading, setIsActivitiesLoading] = useState(true);
    const [activitiesError, setActivitiesError] = useState<string | null>(null);

    // Notes state
    const [notes, setNotes] = useState<NoteItem[]>([]);
    const [isNotesLoading, setIsNotesLoading] = useState(true);
    const [notesError, setNotesError] = useState<string | null>(null);
    const [newNote, setNewNote] = useState("");
    const [isSubmittingNote, setIsSubmittingNote] = useState(false);

    const statusOptions: OptionType[] = [
        { label: "Open (Active)", value: "open" },
        { label: "Closed", value: "closed" },
        { label: "Filled", value: "filled" },
        { label: "All Jobs", value: "all" },
    ];

    const fetchJobs = useCallback(async () => {
        if (!clientId || !agencyId) return;
        setIsJobsLoading(true);
        try {
            const res = await apiClient.get(`/api/v1/agency/clients/${clientId}/jobs/`, {
                params: { status: selectedStatus.value },
                headers: { "X-Agency-ID": agencyId },
            });
            setJobs(res.data);
            setJobsError(null);
        } catch (err: any) {
            console.error("Failed to fetch client jobs:", err);
            const errMsg = err.response?.data?.detail || "Failed to load jobs";
            setJobsError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsJobsLoading(false);
        }
    }, [clientId, agencyId, selectedStatus.value, toast]);

    const fetchActivities = useCallback(async () => {
        if (!clientId || !agencyId) return;
        setIsActivitiesLoading(true);
        try {
            const res = await apiClient.get(`/api/v1/agency/clients/${clientId}/activities/`, {
                headers: { "X-Agency-ID": agencyId },
            });
            setActivities(res.data);
            setActivitiesError(null);
        } catch (err: any) {
            console.error("Failed to fetch client activities:", err);
            const errMsg = err.response?.data?.detail || "Failed to load activities";
            setActivitiesError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsActivitiesLoading(false);
        }
    }, [clientId, agencyId, toast]);

    const fetchNotes = useCallback(async () => {
        if (!clientId || !agencyId) return;
        setIsNotesLoading(true);
        try {
            const res = await apiClient.get(`/api/v1/agency/clients/${clientId}/notes/`, {
                headers: { "X-Agency-ID": agencyId },
            });
            setNotes(res.data);
            setNotesError(null);
        } catch (err: any) {
            console.error("Failed to fetch client notes:", err);
            const errMsg = err.response?.data?.detail || "Failed to load notes";
            setNotesError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsNotesLoading(false);
        }
    }, [clientId, agencyId, toast]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const handleAddNote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNote.trim()) return;

        setIsSubmittingNote(true);
        try {
            const res = await apiClient.post(
                `/api/v1/agency/clients/${clientId}/notes/`,
                { content: newNote.trim() },
                { headers: { "X-Agency-ID": agencyId } }
            );
            setNotes((prevNotes) => [res.data, ...prevNotes]);
            setNewNote("");
            toast.success("Note added successfully");
        } catch (err: any) {
            console.error("Failed to add note:", err);
            const errMsg = err.response?.data?.error || err.response?.data?.detail || "Failed to add note";
            toast.error(errMsg);
        } finally {
            setIsSubmittingNote(false);
        }
    };

    const tabOptions: TabOption[] = [
        { label: `Jobs (${jobs.length})`, value: "jobs" },
        { label: "Activity", value: "activity" },
        { label: `Notes (${notes.length})`, value: "notes" },
    ];

    const getStatusBadgeClass = (status: string) => {
        switch (status.toLowerCase()) {
            case "open":
                return "bg-green-500/10 text-green-600";
            case "closed":
                return "bg-red-500/10 text-red-600";
            case "filled":
                return "bg-blue-500/10 text-blue-600";
            default:
                return "bg-slate-500/10 text-slate-600";
        }
    };

    const LoaderBlock = () => (
        <div className="flex items-center justify-center p-8 min-h-[150px]">
            <Loader2 className="animate-spin text-primary w-6 h-6 mr-2" />
            <span className="text-sm text-muted-text">Loading...</span>
        </div>
    );

    const ErrorBlock = ({ message }: { message: string }) => (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 text-center m-4">
            {message}
        </div>
    );

    const EmptyBlock = ({ message }: { message: string }) => (
        <div className="p-8 border border-dashed border-btn-sec-border rounded-xl text-center text-sm text-muted-text m-4 w-full">
            {message}
        </div>
    );

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
                    <div className="px-6 pt-6 pb-2 text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <Typography variant="h4" className="font-bold text-text-main leading-none">
                                {selectedStatus.value === "open" ? "Active Jobs" : `${selectedStatus.label} Jobs`}
                            </Typography>
                            <div className="flex items-center gap-3">
                                <Select
                                    options={statusOptions}
                                    value={selectedStatus}
                                    onChange={(val) => {
                                        if (val) setSelectedStatus(val as OptionType);
                                    }}
                                    className="w-44"
                                />
                                <Link
                                    to="/dashboard/jobs/create"
                                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all bg-primary hover:bg-primary/95 text-white h-[42px] rounded-md gap-1.5 px-3"
                                >
                                    <Briefcase className="w-4 h-4" />
                                    New Job
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 pb-6">
                        {isJobsLoading ? (
                            <LoaderBlock />
                        ) : jobsError ? (
                            <ErrorBlock message={jobsError} />
                        ) : jobs.length === 0 ? (
                            <EmptyBlock message={`No ${selectedStatus.value === "all" ? "" : selectedStatus.value} jobs found for this client.`} />
                        ) : (
                            <div className="space-y-3">
                                {jobs.map((job) => (
                                    <Link
                                        key={job.id}
                                        to={`/dashboard/jobs/${job.id}`}
                                        className="flex items-center gap-4 p-4 border border-btn-sec-border rounded-xl hover:bg-slate-50/50 transition-colors"
                                    >
                                        <div className="flex-1 text-left">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <Typography variant="body1" className="font-semibold text-text-main">
                                                    {job.title}
                                                </Typography>
                                                <span className={`inline-flex items-center justify-center rounded-md border border-transparent px-2 py-0.5 text-xs font-semibold w-fit capitalize ${getStatusBadgeClass(job.status)}`}>
                                                    {job.status}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-text text-left">
                                                <span>{job.location}</span>
                                                {job.salary_range && <span>{job.salary_range}</span>}
                                                {job.experince_required !== undefined && <span>{job.experince_required} Yrs Required</span>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6 text-sm text-right shrink-0">
                                            <div>
                                                <p className="text-lg font-bold text-text-main">{job.applicants}</p>
                                                <p className="text-xs text-muted-text">Applicants</p>
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold text-text-main">{job.shortlisted}</p>
                                                <p className="text-xs text-muted-text">Shortlisted</p>
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold text-text-main">{job.interviewed}</p>
                                                <p className="text-xs text-muted-text">Interviewed</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Activity Tab Content */}
            {activeTab === "activity" && (
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-4 text-left">
                    <Typography variant="h4" className="font-bold text-text-main">
                        Recent Activity
                    </Typography>

                    {isActivitiesLoading ? (
                        <LoaderBlock />
                    ) : activitiesError ? (
                        <ErrorBlock message={activitiesError} />
                    ) : activities.length === 0 ? (
                        <EmptyBlock message="No recent activities found for this client." />
                    ) : (
                        <div className="border-l-2 border-slate-100 pl-4 space-y-6 py-2">
                            {activities.map((act) => (
                                <div key={act.id} className="relative">
                                    <div className="absolute -left-[23px] top-1 bg-white border-2 border-primary w-2.5 h-2.5 rounded-full" />
                                    <p className="text-sm font-semibold text-text-main">{act.summary}</p>
                                    <p className="text-xs text-muted-text mt-0.5">
                                        {new Date(act.created_at).toLocaleString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}{" "}
                                        by {act.user.full_name || act.user.email}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Notes Tab Content */}
            {activeTab === "notes" && (
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-6 text-left">
                    <Typography variant="h4" className="font-bold text-text-main">
                        Client Notes
                    </Typography>

                    <form onSubmit={handleAddNote} className="space-y-3">
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Add a new note for this client..."
                            rows={3}
                            disabled={isSubmittingNote}
                            className="w-full resize-none border border-btn-sec-border rounded-lg bg-white px-3 py-2 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-slate-50 disabled:text-muted-text"
                        />
                        <Button
                            type="submit"
                            disabled={isSubmittingNote || !newNote.trim()}
                            className="flex items-center justify-center gap-1.5"
                        >
                            {isSubmittingNote && <Loader2 className="w-4 h-4 animate-spin" />}
                            Add Note
                        </Button>
                    </form>

                    {isNotesLoading ? (
                        <LoaderBlock />
                    ) : notesError ? (
                        <ErrorBlock message={notesError} />
                    ) : notes.length === 0 ? (
                        <EmptyBlock message="No client notes found. Write the first one above!" />
                    ) : (
                        <div className="space-y-3 pt-2">
                            {notes.map((note) => (
                                <div key={note.id} className="p-4 border border-btn-sec-border rounded-xl bg-slate-50/30">
                                    <p className="text-sm text-text-main whitespace-pre-wrap">{note.content}</p>
                                    <p className="text-xs text-muted-text mt-1.5 flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-muted-text/75" />
                                        <span>{note.user.full_name || note.user.email}</span>
                                        <span>•</span>
                                        <Calendar className="w-3.5 h-3.5 text-muted-text/75" />
                                        <span>
                                            {new Date(note.created_at).toLocaleString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
