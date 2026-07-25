import React, { useState, useRef } from "react";
import { Typography, Button } from "../../../components/ui";
import {
    X,
    UploadCloud,
    FileText,
    Trash2,
    AlertCircle,
    CheckCircle2,
    RotateCw,
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

interface UploadFileItem {
    id: string;
    file: File;
    status: "idle" | "uploading" | "success" | "error";
    progress: number; // 0 to 100
    errorMessage?: string;
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

    const [files, setFiles] = useState<UploadFileItem[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    if (!isOpen) return null;

    const validateFile = (f: File): { isValid: boolean; error?: string } => {
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        const hasValidType =
            allowedTypes.includes(f.type) ||
            f.name.endsWith(".pdf") ||
            f.name.endsWith(".doc") ||
            f.name.endsWith(".docx");

        if (!hasValidType) {
            return {
                isValid: false,
                error: "Invalid file type. Please upload a PDF, DOC, or DOCX document.",
            };
        }
        if (f.size > 10 * 1024 * 1024) {
            return { isValid: false, error: "File exceeds 10MB limit." };
        }
        return { isValid: true };
    };

    const addFiles = (selectedFiles: FileList | File[]) => {
        const newItems: UploadFileItem[] = [];
        Array.from(selectedFiles).forEach((f) => {
            const validation = validateFile(f);
            newItems.push({
                id: Math.random().toString(36).substring(2, 9) + Date.now(),
                file: f,
                status: validation.isValid ? "idle" : "error",
                progress: 0,
                errorMessage: validation.error,
            });
        });
        setFiles((prev) => [...prev, ...newItems]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            addFiles(e.target.files);
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
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            addFiles(e.dataTransfer.files);
        }
    };

    const handleRemoveFile = (id: string) => {
        setFiles((prev) => prev.filter((item) => item.id !== id));
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const uploadSingleFile = async (fileItem: UploadFileItem) => {
        setFiles((prev) =>
            prev.map((item) =>
                item.id === fileItem.id
                    ? { ...item, status: "uploading", progress: 0, errorMessage: undefined }
                    : item
            )
        );

        try {
            const formData = new FormData();
            formData.append("file", fileItem.file);
            formData.append("job", String(jobId));

            await apiClient.post("/api/v1/agency/candidates/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-Agency-ID": String(agencyId),
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setFiles((prev) =>
                            prev.map((item) =>
                                item.id === fileItem.id && item.status === "uploading"
                                    ? { ...item, progress: percentCompleted }
                                    : item
                            )
                        );
                    }
                },
            });

            setFiles((prev) =>
                prev.map((item) =>
                    item.id === fileItem.id
                        ? { ...item, status: "success", progress: 100 }
                        : item
                )
            );
            return true;
        } catch (err: any) {
            console.error(`Failed to upload file ${fileItem.file.name}:`, err);
            const data = err.response?.data;
            let errMsg = "Failed to upload CV. Please try again.";
            if (data && typeof data === "object") {
                const firstKey = Object.keys(data)[0];
                const msgs = data[firstKey];
                errMsg = Array.isArray(msgs)
                    ? msgs[0]
                    : typeof msgs === "string"
                    ? msgs
                    : data.detail || errMsg;
            }

            setFiles((prev) =>
                prev.map((item) =>
                    item.id === fileItem.id
                        ? { ...item, status: "error", progress: 0, errorMessage: errMsg }
                        : item
                )
            );
            return false;
        }
    };

    const handleRetryFile = async (id: string) => {
        const fileItem = files.find((f) => f.id === id);
        if (!fileItem) return;

        setIsUploading(true);
        const success = await uploadSingleFile(fileItem);
        setIsUploading(false);

        if (success) {
            toast.success(`${fileItem.file.name} uploaded successfully!`);
            onSuccess();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const filesToUpload = files.filter(
            (f) =>
                f.status === "idle" ||
                (f.status === "error" &&
                    f.errorMessage &&
                    f.errorMessage !== "File exceeds 10MB limit." &&
                    !f.errorMessage.includes("Invalid file type"))
        );

        if (filesToUpload.length === 0) return;

        setIsUploading(true);
        const results = await Promise.all(filesToUpload.map((f) => uploadSingleFile(f)));
        setIsUploading(false);

        const anySuccess = results.some((r) => r === true);
        if (anySuccess) {
            toast.success("Candidate CV(s) uploaded successfully!");
            onSuccess();
        }
    };

    const handleClose = () => {
        if (isUploading) return;
        setFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
        onClose();
    };

    const getFileCardClass = (status: string) => {
        const base = "flex flex-col p-3.5 rounded-xl border transition-all duration-200 gap-1.5";
        switch (status) {
            case "success":
                return `${base} bg-emerald-50/30 border-emerald-200/50 hover:bg-emerald-50/50 shadow-xs`;
            case "error":
                return `${base} bg-red-50/30 border-red-200/50 hover:bg-red-50/50 shadow-xs`;
            case "uploading":
                return `${base} bg-primary/5 border-primary/20 hover:bg-primary/[0.08] shadow-xs`;
            default:
                return `${base} bg-slate-50/60 border-slate-200/70 hover:bg-slate-50/90`;
        }
    };

    const allSuccessful = files.length > 0 && files.every((f) => f.status === "success");
    const idleFilesCount = files.filter((f) => f.status === "idle").length;
    const errorFilesToRetryCount = files.filter(
        (f) =>
            f.status === "error" &&
            f.errorMessage &&
            f.errorMessage !== "File exceeds 10MB limit." &&
            !f.errorMessage.includes("Invalid file type")
    ).length;
    const canUpload = idleFilesCount > 0 || errorFilesToRetryCount > 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-0 duration-200">
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={handleClose} />

            {/* Modal Content */}
            <div className="bg-white rounded-xl border border-btn-sec-border shadow-xl w-full max-w-xl p-6 relative flex flex-col gap-6 animate-in zoom-in-95 duration-200 z-10 overflow-hidden">
                {/* Accent Top Bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-teal-500 to-emerald-500" />

                {/* Header */}
                <div className="flex flex-col gap-1 text-left mt-1">
                    <Typography variant="h4" className="text-xl font-extrabold text-text-main leading-none">
                        Upload Candidate CVs
                    </Typography>
                    <Typography variant="body2" className="text-muted-text text-sm leading-relaxed mt-1.5">
                        Upload one or multiple resumes to extract candidate details and run AI analysis.
                    </Typography>
                </div>

                {allSuccessful ? (
                    <div className="flex flex-col items-center text-center gap-4 py-6">
                        <div className="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100">
                            <CheckCircle2 className="w-10 h-10 animate-bounce duration-1000" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-bold text-text-main text-base">CVs Uploaded Successfully!</h4>
                            <p className="text-muted-text text-xs leading-relaxed px-2">
                                {files.length} candidate resume{files.length > 1 ? "s have" : " has"} been uploaded and parsed successfully. AI analysis is being generated for each candidate.
                            </p>
                        </div>
                        <Button variant="secondary" onClick={handleClose} className="mt-2">
                            Close
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                        {/* Drop Zone */}
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => !isUploading && fileInputRef.current?.click()}
                            className={`
                                border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200
                                flex flex-col items-center justify-center gap-2
                                ${isUploading ? "opacity-50 cursor-not-allowed border-btn-sec-border bg-slate-50/50" : "cursor-pointer"}
                                ${isDragging && !isUploading
                                    ? "border-primary bg-primary/[0.04] scale-[0.99] shadow-inner"
                                    : "border-btn-sec-border hover:border-primary/50 bg-slate-50/50 hover:bg-slate-50/80"
                                }
                            `}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                                multiple
                                disabled={isUploading}
                                className="hidden"
                            />
                            <UploadCloud className={`w-10 h-10 transition-transform duration-200 ${isDragging && !isUploading ? "text-primary scale-110" : "text-muted-text hover:scale-105"}`} />
                            <div>
                                <p className="text-sm font-bold text-text-main">Drag & Drop Resumes</p>
                                <p className="text-xs text-muted-text mt-0.5">PDF, DOC, or DOCX up to 10MB</p>
                            </div>
                            <span className={`text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-lg px-2.5 py-1 hover:bg-primary/15 transition-colors ${isUploading ? "pointer-events-none" : ""}`}>
                                Browse Files
                            </span>
                        </div>

                        {/* Selected Files List */}
                        {files.length > 0 && (
                            <div className="space-y-2.5">
                                <div className="flex justify-between items-center px-1">
                                    <span className="text-xs font-bold text-text-main">
                                        Selected Files ({files.length})
                                    </span>
                                    {files.some((f) => f.status === "success") && (
                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-md px-1.5 py-0.5 animate-pulse">
                                            {files.filter((f) => f.status === "success").length} of {files.length} uploaded
                                        </span>
                                    )}
                                </div>
                                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                                    {files.map((fileItem) => (
                                        <div key={fileItem.id} className={getFileCardClass(fileItem.status)}>
                                            <div className="flex items-center justify-between gap-2.5 min-w-0">
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    {fileItem.status === "success" ? (
                                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                                    ) : fileItem.status === "error" ? (
                                                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                                                    ) : (
                                                        <FileText className={`w-5 h-5 text-primary shrink-0 ${fileItem.status === "uploading" ? "animate-pulse" : ""}`} />
                                                    )}
                                                    <div className="min-w-0 text-left">
                                                        <p className="text-xs font-bold text-text-main truncate">{fileItem.file.name}</p>
                                                        <p className="text-[10px] text-muted-text font-semibold">
                                                            {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1 shrink-0">
                                                    {fileItem.status === "error" && fileItem.errorMessage && fileItem.errorMessage !== "File exceeds 10MB limit." && !fileItem.errorMessage.includes("Invalid file type") && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRetryFile(fileItem.id)}
                                                            disabled={isUploading}
                                                            className="text-primary hover:text-primary/80 p-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                                                            title="Retry upload"
                                                        >
                                                            <RotateCw className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {fileItem.status !== "success" && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFile(fileItem.id)}
                                                            disabled={isUploading}
                                                            className="text-muted-text hover:text-red-500 p-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                                                            title="Remove file"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Progress bar for uploading status */}
                                            {fileItem.status === "uploading" && (
                                                <div className="w-full mt-0.5">
                                                    <div className="flex justify-between text-[10px] text-muted-text font-bold mb-1">
                                                        <span>Uploading...</span>
                                                        <span>{fileItem.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                        <div
                                                            className="bg-gradient-to-r from-primary to-teal-500 h-1.5 rounded-full transition-all duration-300"
                                                            style={{ width: `${fileItem.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Error message */}
                                            {fileItem.status === "error" && fileItem.errorMessage && (
                                                <p className="text-[10px] text-red-600 font-semibold text-left mt-0.5 pl-[30px] flex items-center gap-1">
                                                    <span>•</span> {fileItem.errorMessage}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Footer Actions */}
                        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-1">
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
                                disabled={!canUpload}
                                prefixIcon={UploadCloud}
                            >
                                {isUploading ? "Uploading..." : "Upload & Parse CVs"}
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
