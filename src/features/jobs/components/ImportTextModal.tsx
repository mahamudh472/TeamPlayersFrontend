import React, { useState } from "react";
import { Typography, Button } from "../../../components/ui";
import { X, Sparkles } from "lucide-react";
import { apiClient } from "../../../shared/api/apiClient";
import { useToast } from "../../../shared/context/ToastContext";

interface ImportTextModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jobId: string | number;
    agencyId: string | number;
}

export const ImportTextModal: React.FC<ImportTextModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    jobId,
    agencyId,
}) => {
    const { toast } = useToast();
    const [text, setText] = useState("");
    const [isImporting, setIsImporting] = useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        if (isImporting) return;
        setText("");
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) {
            toast.error("Please enter some candidate text information.");
            return;
        }

        try {
            setIsImporting(true);
            await apiClient.post(
                "/api/v1/agency/candidates/upload-text/",
                {
                    text: text,
                    job: Number(jobId),
                },
                {
                    headers: {
                        "X-Agency-ID": String(agencyId),
                    },
                }
            );

            toast.success("Candidates import process started in the background!");
            onSuccess();
            handleClose();
        } catch (err: any) {
            console.error("Failed to import candidates from text:", err);
            const data = err.response?.data;
            let errMsg = "Failed to import candidate text. Please try again.";
            if (data && typeof data === "object") {
                errMsg = data.detail || data.text?.[0] || errMsg;
            }
            toast.error(errMsg);
        } finally {
            setIsImporting(false);
        }
    };

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
                        Import Candidates from Text
                    </Typography>
                    <Typography variant="body2" className="text-muted-text text-sm leading-relaxed mt-1.5">
                        Paste candidate profiles, LinkedIn export texts, resumes, or any text block containing information for one or more candidates. AI will parse them and run match analysis.
                    </Typography>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                    {/* Textarea Area */}
                    <div className="flex flex-col gap-1.5">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            disabled={isImporting}
                            placeholder="e.g.&#10;John Doe&#10;Email: john.doe@example.com&#10;Phone: +1-555-0199&#10;Location: Seattle, WA&#10;Skills: React, Node.js, Python&#10;&#10;Jane Smith&#10;Email: jane.smith@example.com&#10;..."
                            className="w-full h-64 p-3 border border-btn-sec-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-sm text-text-main placeholder-muted-text/75 bg-slate-50/50 resize-none outline-hidden"
                        />
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-1">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleClose}
                            disabled={isImporting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            loading={isImporting}
                            disabled={!text.trim() || isImporting}
                            prefixIcon={Sparkles}
                        >
                            {isImporting ? "Importing..." : "Import Candidates"}
                        </Button>
                    </div>
                </form>

                {/* Close Button */}
                <Button
                    type="button"
                    variant="icon"
                    onClick={handleClose}
                    disabled={isImporting}
                    className="absolute top-4 right-4 text-muted-text hover:text-text-main"
                >
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                </Button>
            </div>
        </div>
    );
};
