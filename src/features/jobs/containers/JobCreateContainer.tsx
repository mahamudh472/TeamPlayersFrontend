import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Typography, OptionType, BackButton } from "../../../components/ui";
import { JobCreateForm, JobCreateSidebar } from "../components";

export const JobCreateContainer: React.FC = () => {
    const navigate = useNavigate();

    // Form states
    const [title, setTitle] = useState("");
    const [client, setClient] = useState<OptionType | null>(null);
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [experience, setExperience] = useState("");
    const [description, setDescription] = useState("");

    // AI Upload/Parse states
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisSuccess, setAnalysisSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Return back to jobs list after simulated save
        navigate("/dashboard/jobs");
    };

    const isFormValid = title.trim() !== "" && client !== null && description.trim() !== "";

    return (
        <main className="space-y-6">
            {/* Header section with back navigation */}
            <div className="flex flex-col gap-2">
                <BackButton label="Back to Jobs" />
                <div className="text-left">
                    <Typography variant="h2" className="text-2xl font-bold text-text-main leading-tight">
                        Create New Job
                    </Typography>
                    <Typography variant="body1" className="text-muted-text mt-1">
                        Post a new job and let AI screen candidates
                    </Typography>
                </div>
            </div>

            {/* Left aligned 3-Column layout grid */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <JobCreateForm
                        title={title}
                        setTitle={setTitle}
                        client={client}
                        setClient={setClient}
                        location={location}
                        setLocation={setLocation}
                        salary={salary}
                        setSalary={setSalary}
                        experience={experience}
                        setExperience={setExperience}
                        description={description}
                        setDescription={setDescription}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        isAnalyzing={isAnalyzing}
                        setIsAnalyzing={setIsAnalyzing}
                        analysisSuccess={analysisSuccess}
                        setAnalysisSuccess={setAnalysisSuccess}
                    />
                </div>

                {/* Right Column: AI screening criteria and action buttons */}
                <div className="space-y-6">
                    <JobCreateSidebar />

                    {/* Submit & Cancel triggers */}
                    <div className="space-y-3">
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className="w-full inline-flex items-center justify-center px-4 h-10 text-sm font-medium bg-primary hover:bg-primary/95 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Create Job & Activate Pipeline
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard/jobs")}
                            className="w-full inline-flex items-center justify-center px-4 h-10 text-sm font-medium border border-btn-sec-border bg-white hover:bg-slate-50 text-text-main rounded-lg transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
};
