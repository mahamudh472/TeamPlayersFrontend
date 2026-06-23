import React, { useState, useRef } from "react";
import { Typography, Button } from "../../../components/ui";
import {
    X,
    UploadCloud,
    FileText,
    Trash2,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";
import { apiClient } from "../../../shared/api/apiClient";
import { useToast } from "../../../shared/context/ToastContext";

interface UploadCVModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jobId: string | number;
    agencyId: string | number;
}

export const UploadCVModal: React.FC<UploadCVModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    jobId,
    agencyId,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setUploadError(null);
        }
    };

    const validateAndSetFile = (f: File) => {
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (
            allowedTypes.includes(f.type) ||
            f.name.endsWith(".pdf") ||
            f.name.endsWith(".doc") ||
            f.name.endsWith(".docx")
        ) {
            setFile(f);
            setUploadError(null);
        } else {
            setUploadError("Invalid file type. Please upload a PDF, DOC, or DOCX document.");
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setUploadError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        try {
            setIsUploading(true);
            setUploadError(null);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("job", String(jobId));

            await apiClient.post("/api/v1/agency/candidates/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-Agency-ID": String(agencyId),
                },
            });

            setIsSuccess(true);
            toast.success("Candidate CV uploaded and parsed successfully!");
            onSuccess();
        } catch (err: any) {
            console.error("Failed to upload CV:", err);
            const data = err.response?.data;
            let errMsg = "Failed to upload CV. Please try again.";
            if (data && typeof data === "object") {
                const firstKey = Object.keys(data)[0];
                const msgs = data[firstKey];
                errMsg = Array.isArray(msgs) ? msgs[0] : typeof msgs === "string" ? msgs : data.detail || errMsg;
            }
            setUploadError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsUploading(false);
        }
    };

    const handleClose = () => {
        if (isUploading) return;
        setFile(null);
        setUploadError(null);
        setIsSuccess(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-0 duration-200">
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={handleClose} />

            {/* Modal Content */}
            <div className="bg-white rounded-xl border border-btn-sec-border shadow-xl w-full max-w-md p-6 relative flex flex-col gap-6 animate-in zoom-in-95 duration-200 z-10">
                {/* Header */}
                <div className="flex flex-col gap-1 text-left">
                    <Typography variant="h4" className="text-lg font-bold text-text-main leading-none">
                        Upload Candidate CV
                    </Typography>
                    <Typography variant="body2" className="text-muted-text text-sm leading-relaxed mt-1">
                        Upload a resume to extract candidate details and run AI analysis against this job.
                    </Typography>
                </div>

                {isSuccess ? (
                    <div className="flex flex-col items-center text-center gap-4 py-4">
                        <div className="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-bold text-text-main text-base">CV Uploaded Successfully!</h4>
                            <p className="text-muted-text text-xs leading-relaxed px-2">
                                The candidate has been created and AI analysis is being generated. Refresh the candidates list to see the new entry.
                            </p>
                        </div>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                        {/* Drop Zone */}
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`
                                border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200
                                flex flex-col items-center justify-center gap-2
                                ${isDragging
                                    ? "border-primary bg-primary/5"
                                    : "border-btn-sec-border hover:border-primary/50 bg-slate-50/50"
                                }
                            `}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                            />
                            <UploadCloud className={`w-10 h-10 ${isDragging ? "text-primary" : "text-muted-text"}`} />
                            <div>
                                <p className="text-sm font-semibold text-text-main">Drag & Drop Resume</p>
                                <p className="text-xs text-muted-text mt-0.5">PDF, DOC, or DOCX up to 10MB</p>
                            </div>
                            <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-lg px-2.5 py-1">
                                Browse File
                            </span>
                        </div>

                        {/* Selected File Preview */}
                        {file && (
                            <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-btn-sec-border rounded-xl">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <FileText className="w-5 h-5 text-primary shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-text-main truncate">{file.name}</p>
                                        <p className="text-[10px] text-muted-text font-medium">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRemoveFile}
                                    className="text-muted-text hover:text-red-500 p-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* Error */}
                        {uploadError && (
                            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs">
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                <span>{uploadError}</span>
                            </div>
                        )}

                        {/* Footer Actions */}
                        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleClose}
                                disabled={isUploading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                loading={isUploading}
                                disabled={!file}
                                prefixIcon={UploadCloud}
                            >
                                Upload & Parse CV
                            </Button>
                        </div>
                    </form>
                )}

                {/* Close Button */}
                <Button
                    type="button"
                    variant="icon"
                    onClick={handleClose}
                    disabled={isUploading}
                    className="absolute top-4 right-4 text-muted-text hover:text-text-main"
                >
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                </Button>
            </div>
        </div>
    );
};
