import React, { useRef } from "react";
import { Typography, Select, OptionType, Button } from "../../../components/ui";
import { Upload, Sparkles, CheckCircle2 } from "lucide-react";

import { JobCreateFormProps } from "../types";

export const JobCreateForm: React.FC<JobCreateFormProps> = ({
    title,
    setTitle,
    client,
    setClient,
    location,
    setLocation,
    salary,
    setSalary,
    experience,
    setExperience,
    skills,
    setSkills,
    jobType,
    setJobType,
    status,
    setStatus,
    description,
    setDescription,
    selectedFile,
    setSelectedFile,
    isAnalyzing,
    setIsAnalyzing,
    analysisSuccess,
    setAnalysisSuccess,
    clients,
    isEdit,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const jobTypeOptions: OptionType[] = [
        { label: "Remote", value: "remote" },
        { label: "Hybrid", value: "hybrid" },
        { label: "On-site", value: "onsite" },
    ];

    const statusOptions: OptionType[] = [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
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
            // Set client to the first client in the dropdown if available
            if (clients && clients.length > 0) {
                setClient(clients[0]);
            }
            setLocation("London, UK (Hybrid)");
            setSalary("£75,000 - £85,000");
            setExperience("5");
            setSkills("React, TypeScript, Node.js, CSS");
            setJobType({ label: "Hybrid", value: "hybrid" });
            setStatus({ label: "Open", value: "open" });
            setDescription(
                "We are seeking a Senior React Developer to join our growing engineering team. You will be responsible for building high-performance, responsive web applications using React, TypeScript, and modern state management libraries."
            );
        }, 1200);
    };

    return (
        <div className="space-y-6">
            {/* Job Details Card */}
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6 text-left">
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

                    {/* Job Type & Status Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                            label="Job Type"
                            placeholder="Select job type"
                            options={jobTypeOptions}
                            value={jobType}
                            onChange={(val) => setJobType(val as OptionType | null)}
                        />
                        <Select
                            label="Status"
                            placeholder="Select status"
                            options={statusOptions}
                            value={status}
                            onChange={(val) => setStatus(val as OptionType | null)}
                        />
                    </div>

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

                    {/* Experience Required */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="experience" className="text-sm font-semibold text-text-main select-none">
                            Experience Required (Years)
                        </label>
                        <input
                            type="number"
                            id="experience"
                            placeholder="e.g. 5"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            min={0}
                            className="w-full h-10 border border-btn-sec-border rounded-lg bg-white px-3 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>

                    {/* Skills */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="skills" className="text-sm font-semibold text-text-main select-none">
                            Skills (Comma separated, e.g. Python, Django, PostgreSQL)
                        </label>
                        <input
                            type="text"
                            id="skills"
                            placeholder="e.g. React, TypeScript, Node.js"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
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
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6 text-left">
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
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Select File
                        </Button>
                        {selectedFile && (
                            <Button
                                type="button"
                                onClick={handleAnalyzeAI}
                                loading={isAnalyzing}
                                prefixIcon={!isAnalyzing ? Sparkles : undefined}
                            >
                                Analyze with AI
                            </Button>
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
    );
};
