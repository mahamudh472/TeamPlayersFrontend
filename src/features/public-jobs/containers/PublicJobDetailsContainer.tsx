import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router";
import { 
    ArrowLeft, MapPin, Briefcase, DollarSign, Clock, FileText, 
    UploadCloud, CheckCircle2, AlertCircle, Building2, Download, Trash2, Calendar
} from "lucide-react";
import { apiClient } from "../../../shared/api/apiClient";
import { useToast } from "../../../shared/context/ToastContext";
import { AppBadge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";

interface PublicJobDetails {
    id: number;
    agency_name: string;
    agency_logo: string | null;
    title: string;
    location: string;
    salary_range: string;
    experince_required: number;
    skills: string[];
    job_type: string;
    created_at: string;
    description: string;
    description_file: string | null;
}

export const PublicJobDetailsContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // States
    const [job, setJob] = useState<PublicJobDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // File Upload States
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Check if CV already submitted for this job
    useEffect(() => {
        if (!id) return;
        try {
            const submitted = JSON.parse(localStorage.getItem("submitted_job_cvs") || "[]");
            if (Array.isArray(submitted) && (submitted.includes(Number(id)) || submitted.includes(String(id)))) {
                setIsSubmitted(true);
            }
        } catch (e) {
            console.error("Failed to read from localStorage", e);
        }
    }, [id]);

    // Fetch Job Details
    useEffect(() => {
        const fetchJobDetails = async () => {
            if (!id) return;
            try {
                setIsLoading(true);
                const res = await apiClient.get(`/api/v1/agency/jobs/public/${id}/`);
                setJob(res.data);
                setError(null);
            } catch (err: any) {
                console.error("Failed to fetch public job details:", err);
                if (err.response?.status === 404) {
                    setError("Job position not found.");
                } else {
                    setError(err.response?.data?.detail || "Failed to load job details. Please try again later.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setUploadError(null);
        }
    };

    // Drag and Drop handlers
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            const allowedTypes = [
                "application/pdf", 
                "application/msword", 
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ];
            if (allowedTypes.includes(droppedFile.type) || 
                droppedFile.name.endsWith(".pdf") || 
                droppedFile.name.endsWith(".doc") || 
                droppedFile.name.endsWith(".docx")) {
                setFile(droppedFile);
                setUploadError(null);
            } else {
                setUploadError("Invalid file type. Please upload a PDF, DOC, or DOCX document.");
            }
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setUploadError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUploadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !id) return;

        try {
            setIsUploading(true);
            setUploadError(null);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("job", id);

            await apiClient.post("/api/v1/agency/candidates/public/upload-cv/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Track submission in localStorage
            const submitted = JSON.parse(localStorage.getItem("submitted_job_cvs") || "[]");
            if (!submitted.includes(Number(id))) {
                submitted.push(Number(id));
            }
            localStorage.setItem("submitted_job_cvs", JSON.stringify(submitted));
            
            setIsSubmitted(true);
            setFile(null);
            toast.success("CV uploaded and application submitted successfully!");
        } catch (err: any) {
            console.error("Failed to upload CV:", err);
            const data = err.response?.data;
            let errDetail = "Failed to submit application. Please try again.";
            if (data && typeof data === "object") {
                const firstKey = Object.keys(data)[0];
                const msgs = data[firstKey];
                errDetail = Array.isArray(msgs) ? msgs[0] : typeof msgs === "string" ? msgs : data.detail || errDetail;
            }
            setUploadError(errDetail);
            toast.error(errDetail);
        } finally {
            setIsUploading(false);
        }
    };

    const handleResetSubmission = () => {
        if (!id) return;
        try {
            const submitted = JSON.parse(localStorage.getItem("submitted_job_cvs") || "[]");
            const filtered = submitted.filter((item: any) => String(item) !== String(id) && Number(item) !== Number(id));
            localStorage.setItem("submitted_job_cvs", JSON.stringify(filtered));
            setIsSubmitted(false);
        } catch (e) {
            console.error(e);
        }
    };

    const formatRelativeTime = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffDays < 1) {
            return "Today";
        } else if (diffDays === 1) {
            return "Yesterday";
        } else if (diffDays < 30) {
            return `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-slate-50/50">
                <div className="animate-spin text-teal-600 w-12 h-12 border-4 border-current border-t-transparent rounded-full" />
                <p className="text-slate-500 text-sm font-medium animate-pulse">Fetching position details...</p>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="max-w-xl mx-auto px-4 py-20 text-center">
                <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-xs">
                    <div className="inline-flex p-4 rounded-full bg-red-50 text-red-500 mb-4 border border-red-100">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl text-slate-900 mb-2">Error Occurred</h3>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                        {error || "We could not find the job details you were looking for."}
                    </p>
                    <Link to="/jobs">
                        <Button variant="primary" className="bg-teal-600 hover:bg-teal-500">
                            Back to Job Board
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50/50 min-h-screen pb-20 pt-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        to="/jobs"
                        className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors duration-200 gap-1.5"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Job Board
                    </Link>
                </div>

                {/* Main Job Banner */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 shadow-inner">
                                {job.agency_logo ? (
                                    <img
                                        src={job.agency_logo}
                                        alt={`${job.agency_name} logo`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-bold flex items-center justify-center text-2xl">
                                        {job.agency_name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                                    {job.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                                        <Building2 className="w-4 h-4 text-slate-400" /> {job.agency_name}
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-slate-400" /> {job.location}
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4 text-slate-400" /> Posted {formatRelativeTime(job.created_at)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 self-start md:self-center shrink-0">
                            <AppBadge variant="primary" className="capitalize text-sm px-4 py-1.5 rounded-xl font-bold bg-teal-50 text-teal-700 border-teal-200/50">
                                {job.job_type}
                            </AppBadge>
                        </div>
                    </div>
                </div>

                {/* Details layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Job Description & Skills */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description Section */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs">
                            <h2 className="text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                                Job Description
                            </h2>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-normal whitespace-pre-wrap">
                                {job.description}
                            </div>

                            {job.description_file && (
                                <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl bg-teal-100 text-teal-700">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800 text-sm">Detailed Job Specification</p>
                                            <p className="text-xs text-slate-500">Read additional details for this job listing</p>
                                        </div>
                                    </div>
                                    <a
                                        href={job.description_file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 hover:border-teal-500 hover:text-teal-600 bg-white transition-all duration-200"
                                    >
                                        <Download className="w-5 h-5" />
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Skills Section */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs">
                            <h2 className="text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                                Required Technical Skills & Competencies
                            </h2>
                            <div className="flex flex-wrap gap-2.5">
                                {job.skills.map((skill, index) => (
                                    <AppBadge
                                        key={index}
                                        variant="secondary"
                                        className="text-slate-800 bg-slate-100/80 hover:bg-slate-200 border-none font-semibold text-sm px-4.5 py-1.5 rounded-xl transition-all duration-200"
                                    >
                                        {skill}
                                    </AppBadge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Quick facts & Application form */}
                    <div className="space-y-8">
                        {/* Quick Facts Card */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                            <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-2">
                                Job Overview
                            </h3>
                            <div className="space-y-3.5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-slate-100 text-slate-500">
                                        <DollarSign className="w-4.5 h-4.5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Offered Salary</p>
                                        <p className="text-sm font-bold text-slate-800">{job.salary_range}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-slate-100 text-slate-500">
                                        <Briefcase className="w-4.5 h-4.5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Experience Required</p>
                                        <p className="text-sm font-bold text-slate-800">{job.experince_required}+ Years</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-slate-100 text-slate-500">
                                        <MapPin className="w-4.5 h-4.5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Location</p>
                                        <p className="text-sm font-bold text-slate-800">{job.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-slate-100 text-slate-500">
                                        <Calendar className="w-4.5 h-4.5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Date Posted</p>
                                        <p className="text-sm font-bold text-slate-800">
                                            {new Date(job.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Resume Upload / Application Card */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                            <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-2">
                                Apply for this Position
                            </h3>

                            {isSubmitted ? (
                                <div className="text-center py-4 space-y-4">
                                    <div className="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-slate-900 text-base">Application Submitted!</h4>
                                        <p className="text-slate-500 text-xs px-2 leading-relaxed">
                                            Your CV has been successfully uploaded for this position. We've tracked this submission in your local profile history.
                                        </p>
                                    </div>
                                    <div className="pt-2">
                                        <button
                                            onClick={handleResetSubmission}
                                            className="text-xs font-semibold text-teal-600 hover:text-teal-500 hover:underline cursor-pointer"
                                        >
                                            Submit another resume
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleUploadSubmit} className="space-y-4">
                                    <div
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`
                                            border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200
                                            flex flex-col items-center justify-center space-y-2
                                            ${isDragging ? "border-teal-500 bg-teal-50/50" : "border-slate-300 hover:border-teal-400 bg-slate-50/50"}
                                        `}
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx"
                                            className="hidden"
                                        />
                                        <UploadCloud className={`w-10 h-10 ${isDragging ? "text-teal-500" : "text-slate-400"}`} />
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">Drag & Drop Resume</p>
                                            <p className="text-xs text-slate-400 mt-1">PDF, DOC, or DOCX up to 10MB</p>
                                        </div>
                                        <span className="text-xs font-semibold text-teal-600 bg-teal-50 border border-teal-100 rounded-lg px-2.5 py-1">
                                            Browse File
                                        </span>
                                    </div>

                                    {file && (
                                        <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <FileText className="w-5 h-5 text-teal-600 shrink-0" />
                                                <div className="min-w-0">
                                                    <p className="text-xs font-semibold text-slate-800 truncate">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-[10px] text-slate-400 font-medium">
                                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleRemoveFile}
                                                className="text-slate-400 hover:text-red-500 p-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}

                                    {uploadError && (
                                        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs">
                                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                            <span>{uploadError}</span>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={!file}
                                        loading={isUploading}
                                        className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2.5 rounded-xl shadow-md transition-colors"
                                    >
                                        Submit Application
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
