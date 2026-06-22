import React from "react";
import { Typography, Button } from "../../../components/ui";
import { Briefcase, X } from "lucide-react";

interface ShortlistConfirmModalProps {
    isOpen: boolean;
    candidateName: string;
    onClose: () => void;
    onConfirm: () => void;
}

export const ShortlistConfirmModal: React.FC<ShortlistConfirmModalProps> = ({
    isOpen,
    candidateName,
    onClose,
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-0 duration-200">
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Content */}
            <div className="bg-white rounded-xl border border-btn-sec-border shadow-xl w-full max-w-md p-6 relative flex flex-col gap-6 animate-in zoom-in-95 duration-200 z-10">
                {/* Header */}
                <div className="flex flex-col gap-1 text-left">
                    <Typography variant="h4" className="text-lg font-bold text-text-main leading-none">
                        Shortlist Candidate
                    </Typography>
                    <Typography variant="body2" className="text-muted-text text-sm leading-relaxed mt-1">
                        Are you sure you want to shortlist <strong>{candidateName}</strong>?
                    </Typography>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={onConfirm}
                        prefixIcon={Briefcase}
                    >
                        Shortlist
                    </Button>
                </div>

                {/* Top-right close button */}
                <Button
                    type="button"
                    variant="icon"
                    onClick={onClose}
                    className="absolute top-4 right-4"
                >
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                </Button>
            </div>
        </div>
    );
};
