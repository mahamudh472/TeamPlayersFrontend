import React, { useState } from "react";
import { Typography, Input, Button } from "../../../components/ui";
import { DollarSign, Calendar, X } from "lucide-react";

interface SendOfferModalProps {
    isOpen: boolean;
    candidateName: string;
    onClose: () => void;
    onSendOffer: (salary: string, noticePeriod: number) => void;
}

export const SendOfferModal: React.FC<SendOfferModalProps> = ({
    isOpen,
    candidateName,
    onClose,
    onSendOffer,
}) => {
    const [salary, setSalary] = useState("");
    const [noticePeriod, setNoticePeriod] = useState("30");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!salary || !noticePeriod) return;
        onSendOffer(salary, parseInt(noticePeriod, 10));
        setSalary("");
        setNoticePeriod("30");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-0 duration-200">
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Content */}
            <div className="bg-white rounded-xl border border-btn-sec-border shadow-xl w-full max-w-md p-6 relative flex flex-col gap-6 animate-in zoom-in-95 duration-200 z-10">
                {/* Header */}
                <div className="flex flex-col gap-1 text-left">
                    <Typography variant="h4" className="text-lg font-bold text-text-main leading-none">
                        Send Job Offer
                    </Typography>
                    <Typography variant="body2" className="text-muted-text text-sm">
                        Specify the offer salary and notice period for {candidateName}
                    </Typography>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 py-2 text-left">
                    <Input
                        label="Salary (annual / numeric)"
                        type="number"
                        placeholder="e.g. 135000.00"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        prefixIcon={DollarSign}
                    />
                    <Input
                        label="Notice Period (days)"
                        type="number"
                        min="0"
                        value={noticePeriod}
                        onChange={(e) => setNoticePeriod(e.target.value)}
                        prefixIcon={Calendar}
                    />
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
                        onClick={handleSubmit}
                        disabled={!salary || !noticePeriod}
                        prefixIcon={DollarSign}
                    >
                        Send Offer
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
