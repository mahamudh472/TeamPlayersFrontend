import React, { useState } from "react";
import { Typography, Tabs, TabOption, Button } from "../../../components/ui";

import { CandidateDetailsTabsProps } from "../types";

export const CandidateDetailsTabs: React.FC<CandidateDetailsTabsProps> = ({
    experience,
    location,
    currentSalary,
    expectedSalary,
    skills,
    appliedDate,
    notes,
    onAddNote,
    isLoadingNotes,
    resume,
}) => {
    const [activeTab, setActiveTab] = useState<string>("profile");
    const [newNote, setNewNote] = useState("");
    const [isAddingNote, setIsAddingNote] = useState(false);

    const handleAddNoteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newNote.trim() && !isAddingNote) {
            setIsAddingNote(true);
            try {
                await onAddNote(newNote.trim());
                setNewNote("");
            } catch (err) {
                console.error("Failed to add note:", err);
            } finally {
                setIsAddingNote(false);
            }
        }
    };

    const tabOptions: TabOption[] = [
        { label: "Profile", value: "profile" },
        { label: "CV", value: "cv" },
        { label: `Notes (${notes.length})`, value: "notes" },
        { label: "Activity", value: "activity" },
    ];

    return (
        <div className="flex flex-col gap-4 text-left">
            <Tabs
                options={tabOptions}
                value={activeTab}
                onChange={setActiveTab}
            />

            {/* Profile Content */}
            {activeTab === "profile" && (
                <div className="bg-white rounded-xl border border-btn-sec-border flex flex-col gap-6 p-6">
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        Candidate Profile
                    </Typography>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-text">Experience</p>
                            <p className="font-semibold text-text-main">{experience}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-text">Location</p>
                            <p className="font-semibold text-text-main">{location}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-text">Current Salary</p>
                            <p className="font-semibold text-text-main">{currentSalary}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-text">Expected Salary</p>
                            <p className="font-semibold text-text-main">{expectedSalary}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-muted-text mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="inline-flex items-center justify-center rounded-md border border-btn-sec-border px-2.5 py-0.5 text-xs font-medium text-text-main bg-slate-50"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-muted-text">Applied Date</p>
                        <p className="font-semibold text-text-main">{appliedDate}</p>
                    </div>
                </div>
            )}

            {/* CV Content */}
            {activeTab === "cv" && (
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 text-center space-y-4">
                    <Typography variant="h4" className="font-bold text-text-main">
                        Curriculum Vitae
                    </Typography>
                    {resume ? (
                        <>
                            <p className="text-sm text-muted-text">CV document is uploaded and verified by AI parser.</p>
                            <Button
                                variant="outline"
                                onClick={() => window.open(resume, "_blank")}
                            >
                                Download CV PDF
                            </Button>
                        </>
                    ) : (
                        <p className="text-sm text-muted-text">No CV document uploaded for this candidate.</p>
                    )}
                </div>
            )}

            {/* Notes Content */}
            {activeTab === "notes" && (
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-6">
                    <Typography variant="h4" className="font-bold text-text-main">
                        Evaluation Notes
                    </Typography>

                    <form onSubmit={handleAddNoteSubmit} className="space-y-3">
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Add evaluation note..."
                            rows={3}
                            disabled={isAddingNote}
                            className="w-full resize-none border border-btn-sec-border rounded-lg bg-white px-3 py-2 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                        />
                        <Button
                            type="submit"
                            disabled={!newNote.trim() || isAddingNote}
                            loading={isAddingNote}
                        >
                            Add Note
                        </Button>
                    </form>

                    <div className="space-y-3 pt-2">
                        {isLoadingNotes ? (
                            <div className="flex items-center gap-2 justify-center py-4 text-sm text-muted-text">
                                <svg
                                    className="animate-spin text-primary shrink-0 w-5 h-5"
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
                                <span>Loading notes...</span>
                            </div>
                        ) : notes.length > 0 ? (
                            notes.map((note) => (
                                <div key={note.id} className="p-4 border border-btn-sec-border rounded-xl bg-slate-50/30">
                                    <p className="text-sm text-text-main leading-relaxed">{note.content}</p>
                                    <p className="text-xs text-muted-text mt-1.5 flex items-center gap-1.5 flex-wrap">
                                        {note.user && (
                                            <span className="font-medium text-slate-600">
                                                by {note.user.full_name || note.user.email}
                                            </span>
                                        )}
                                        <span>•</span>
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
                            ))
                        ) : (
                            <p className="text-sm text-muted-text py-4 text-center">
                                No evaluation notes added yet.
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Activity Content */}
            {activeTab === "activity" && (
                <div className="bg-white rounded-xl border border-btn-sec-border p-6">
                    <Typography variant="h4" className="font-bold text-text-main mb-4">
                        Applicant History
                    </Typography>
                    <div className="border-l-2 border-slate-100 pl-4 space-y-4 py-1">
                        <div>
                            <p className="text-sm font-semibold text-text-main">Applied online</p>
                            <p className="text-xs text-muted-text">{appliedDate}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-text-main">AI Screening completed</p>
                            <p className="text-xs text-muted-text">{appliedDate}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

