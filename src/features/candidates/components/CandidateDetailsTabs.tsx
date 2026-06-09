import React, { useState } from "react";
import { Typography, Tabs, TabOption, Button } from "../../../components/ui";

interface CandidateDetailsTabsProps {
    experience: string;
    location: string;
    currentSalary: string;
    expectedSalary: string;
    skills: string[];
    appliedDate: string;
}

export const CandidateDetailsTabs: React.FC<CandidateDetailsTabsProps> = ({
    experience,
    location,
    currentSalary,
    expectedSalary,
    skills,
    appliedDate,
}) => {
    const [activeTab, setActiveTab] = useState<string>("profile");
    const [notes, setNotes] = useState<string[]>(["Highly recommended candidate. Good cultural fit."]);
    const [newNote, setNewNote] = useState("");

    const handleAddNote = (e: React.FormEvent) => {
        e.preventDefault();
        if (newNote.trim()) {
            setNotes([newNote, ...notes]);
            setNewNote("");
        }
    };

    const tabOptions: TabOption[] = [
        { label: "Profile", value: "profile" },
        { label: "CV", value: "cv" },
        { label: `Notes (${notes.length})`, value: "notes" },
        { label: "Activity", value: "activity" },
    ];

    return (
        <div className="flex flex-col gap-4">
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
                    <p className="text-sm text-muted-text">CV document is uploaded and verified by AI parser.</p>
                    <Button variant="outline">
                        Download CV PDF
                    </Button>
                </div>
            )
            }

            {/* Notes Content */}
            {
                activeTab === "notes" && (
                    <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-6">
                        <Typography variant="h4" className="font-bold text-text-main">
                            Evaluation Notes
                        </Typography>

                        <form onSubmit={handleAddNote} className="space-y-3">
                            <textarea
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="Add evaluation note..."
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
                )
            }

            {/* Activity Content */}
            {
                activeTab === "activity" && (
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
                )
            }
        </div >
    );
};
