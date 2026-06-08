import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Typography, Select, OptionType, BackButton } from "../../../components/ui";
import { Upload, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

export const JobCreateContainer: React.FC = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const clients: OptionType[] = [
        { label: "TechCorp Solutions", value: "TechCorp Solutions" },
        { label: "GlobalTech Industries", value: "GlobalTech Industries" },
        { label: "Acme Corp", value: "Acme Corp" },
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setAnalysisSuccess(false);
        }
    };

    const handleAnalyzeAI = () => {
        if (!selectedFile) return;

        setIsAnalyzing(true);
        setAnalysisSuccess(false);

        // Simulate AI extraction timeout
        setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisSuccess(true);
            setTitle("Senior React Developer");
            setClient({ label: "TechCorp Solutions", value: "TechCorp Solutions" });
            setLocation("London, UK (Hybrid)");
            setSalary("£75,000 - £85,000");
            setExperience("5+ years");
            setDescription(
                "We are seeking a Senior React Developer to join our growing engineering team. You will be responsible for building high-performance, responsive web applications using React, TypeScript, and modern state management libraries."
            );
        }, 1200);
    };

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
                <div>
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
                <div className="lg:col-span-2 space-y-6">
                    {/* Job Details Card */}
                    <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6">
                        <div>
                            <Typography variant="h4" className="font-bold text-text-main leading-none">
                                Job Details
                            </Typography>
                            <p className="text-sm text-muted-text mt-1.5">Basic information about the position</p>
                        </div>

                        <div className="space-y-4">
                            {/* Job Title */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="title" className="text-sm font-semibold text-text-main select-none">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    placeholder="e.g. Senior Software Engineer"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full h-10 border border-btn-sec-border rounded-lg bg-white px-3 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            {/* Client Dropdown */}
                            <Select
                                label="Client"
                                placeholder="Select client"
                                options={clients}
                                value={client}
                                onChange={(val) => setClient(val as OptionType | null)}
                            />

                            {/* Location & Salary Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="location" className="text-sm font-semibold text-text-main select-none">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        placeholder="London, UK"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full h-10 border border-btn-sec-border rounded-lg bg-white px-3 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="salary" className="text-sm font-semibold text-text-main select-none">
                                        Salary Range
                                    </label>
                                    <input
                                        type="text"
                                        id="salary"
                                        placeholder="£60,000 - £80,000"
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        className="w-full h-10 border border-btn-sec-border rounded-lg bg-white px-3 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Experience */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="experience" className="text-sm font-semibold text-text-main select-none">
                                    Experience Required
                                </label>
                                <input
                                    type="text"
                                    id="experience"
                                    placeholder="5+ years"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    className="w-full h-10 border border-btn-sec-border rounded-lg bg-white px-3 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="description" className="text-sm font-semibold text-text-main select-none">
                                    Job Description
                                </label>
                                <textarea
                                    id="description"
                                    placeholder="Describe the role, responsibilities, and requirements..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={6}
                                    className="w-full resize-none border border-btn-sec-border rounded-lg bg-white px-3 py-2 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Upload Job Description Card */}
                    <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6">
                        <div>
                            <Typography variant="h4" className="font-bold text-text-main leading-none">
                                Upload Job Description
                            </Typography>
                            <p className="text-sm text-muted-text mt-1.5">Let AI extract requirements from your JD</p>
                        </div>

                        <div className="border-2 border-dashed rounded-xl p-6 text-center border-btn-sec-border bg-slate-50/20 flex flex-col items-center justify-center">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept=".pdf,.doc,.docx,.txt"
                            />
                            <Upload className="w-10 h-10 mx-auto mb-3 text-muted-text" />
                            {selectedFile ? (
                                <div className="mb-4">
                                    <p className="text-sm font-semibold text-text-main">{selectedFile.name}</p>
                                    <p className="text-xs text-muted-text">
                                        {(selectedFile.size / 1024).toFixed(1)} KB
                                    </p>
                                </div>
                            ) : (
                                <p className="mb-4 text-sm text-muted-text">Upload a job description file (PDF, DOC, TXT)</p>
                            )}

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="inline-flex items-center justify-center px-4 h-9 text-sm font-medium border border-btn-sec-border bg-white hover:bg-slate-50 text-text-main rounded-lg transition-colors"
                                >
                                    Select File
                                </button>
                                {selectedFile && (
                                    <button
                                        type="button"
                                        onClick={handleAnalyzeAI}
                                        disabled={isAnalyzing}
                                        className="inline-flex items-center justify-center gap-1.5 px-4 h-9 text-sm font-medium bg-primary hover:bg-primary/95 text-white rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {isAnalyzing ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-4 h-4" />
                                                Analyze with AI
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>

                            {analysisSuccess && (
                                <div className="mt-4 flex items-center gap-1.5 text-xs text-green-600 font-semibold">
                                    <CheckCircle2 className="w-4 h-4" />
                                    AI successfully extracted details!
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: AI screening criteria and action buttons */}
                <div className="space-y-6">
                    <div className="bg-white  stikcy top-5 text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6">
                        <div>
                            <Typography variant="h4" className="font-bold text-text-main leading-none">
                                AI Screening Criteria
                            </Typography>
                            <p className="text-sm text-muted-text mt-1.5">
                                Automatically generated from job requirements
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50/50 rounded-xl border border-btn-sec-border">
                                <p className="text-sm font-bold text-text-main mb-2">Match Score Weighting</p>
                                <div className="space-y-2 text-sm text-text-main">
                                    <div className="flex justify-between">
                                        <span className="text-muted-text">Skills</span>
                                        <span className="font-semibold">40%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-text">Experience</span>
                                        <span className="font-semibold">30%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-text">Education</span>
                                        <span className="font-semibold">20%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-text">Location</span>
                                        <span className="font-semibold">10%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Fit Ranges alerts */}
                            <div className="p-3.5 bg-green-50/60 border border-green-200 rounded-xl">
                                <p className="text-sm font-bold text-green-900">High Fit (85%+)</p>
                                <p className="text-xs text-green-700 mt-0.5">Auto-shortlist for interview</p>
                            </div>

                            <div className="p-3.5 bg-yellow-50/60 border border-yellow-200 rounded-xl">
                                <p className="text-sm font-bold text-yellow-900">Medium Fit (70-84%)</p>
                                <p className="text-xs text-yellow-700 mt-0.5">Enter nurture sequence</p>
                            </div>

                            <div className="p-3.5 bg-slate-50/60 border border-btn-sec-border rounded-xl">
                                <p className="text-sm font-bold text-slate-900">Low Fit (&lt;70%)</p>
                                <p className="text-xs text-muted-text mt-0.5">Polite rejection email</p>
                            </div>
                        </div>
                    </div>

                    {/* Submit & Cancel triggers */}
                    <div className="space-y-3">
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className="w-full inline-flex items-center justify-center px-4 h-10 text-sm font-medium bg-primary hover:bg-primary/95 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Job & Activate Pipeline
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard/jobs")}
                            className="w-full inline-flex items-center justify-center px-4 h-10 text-sm font-medium border border-btn-sec-border bg-white hover:bg-slate-50 text-text-main rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
};
