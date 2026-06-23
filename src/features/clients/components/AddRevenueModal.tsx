import React, { useState } from "react";
import { Typography, Button, Input } from "../../../components/ui";
import { Coins, X } from "lucide-react";
import { apiClient } from "../../../shared/api/apiClient";
import { useToast } from "../../../shared/context/ToastContext";

interface AddRevenueModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    clientId: string;
    agencyId: string;
}

export const AddRevenueModal: React.FC<AddRevenueModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    clientId,
    agencyId,
}) => {
    const [amount, setAmount] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError("Revenue amount must be greater than zero.");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            await apiClient.post(
                `/api/v1/finance/clients/${clientId}/revenue/`,
                {
                    amount: numericAmount.toFixed(2),
                },
                {
                    headers: {
                        "X-Agency-ID": String(agencyId),
                    },
                }
            );

            toast.success("Revenue recorded successfully!");
            setAmount("");
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error("Failed to record revenue:", err);
            const validationErrors = err.response?.data;
            if (validationErrors && typeof validationErrors === "object") {
                const firstKey = Object.keys(validationErrors)[0];
                const messages = validationErrors[firstKey];
                const msg = Array.isArray(messages)
                    ? messages[0]
                    : typeof messages === "string"
                    ? messages
                    : "Validation error";
                setError(`${firstKey}: ${msg}`);
            } else {
                const fallbackMsg =
                    err.response?.data?.detail || "Failed to record revenue. Please try again.";
                setError(fallbackMsg);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setError(null);
            setAmount("");
            onClose();
        }
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
                        Record Revenue
                    </Typography>
                    <Typography variant="body2" className="text-muted-text text-sm leading-relaxed mt-1">
                        Record new client revenue. This will be added to the total revenue for this client.
                    </Typography>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                    <Input
                        label="Revenue Amount (GBP £) *"
                        type="number"
                        id="revenue-amount"
                        name="amount"
                        step="0.01"
                        min="0.01"
                        placeholder="e.g. 15000.00"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                            if (error) setError(null);
                        }}
                        required
                        disabled={isLoading}
                        autoFocus
                    />

                    {error && (
                        <div className="bg-red-50 border border-red-200/50 p-3 rounded-lg text-sm text-red-700 font-medium">
                            {error}
                        </div>
                    )}

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            loading={isLoading}
                            prefixIcon={Coins}
                        >
                            Record Revenue
                        </Button>
                    </div>
                </form>

                {/* Close Button top-right */}
                <Button
                    type="button"
                    variant="icon"
                    onClick={handleClose}
                    disabled={isLoading}
                    className="absolute top-4 right-4 text-muted-text hover:text-text-main"
                >
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                </Button>
            </div>
        </div>
    );
};
