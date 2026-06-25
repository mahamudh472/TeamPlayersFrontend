import React, { useState } from "react";
import { Typography, Select, OptionType, Button } from "../../../components/ui";
import { Sparkles, Search, X } from "lucide-react";

import { GenerateLeadsModalProps } from "../types";

export const GenerateLeadsModal: React.FC<GenerateLeadsModalProps> = ({
    isOpen,
    onClose,
    onGenerate,
}) => {
    const [country, setCountry] = useState<OptionType | null>(null);
    const [industry, setIndustry] = useState<OptionType | null>(null);
    const [companySize, setCompanySize] = useState<OptionType | null>(null);
    const [hiringActivity, setHiringActivity] = useState<OptionType | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await onGenerate({
                country: country?.value || "",
                industry: industry?.value || "",
                companySize: companySize?.value || "",
                hiringActivity: hiringActivity?.value || "",
            });
            onClose();
            // Reset filters on success
            setCountry(null);
            setIndustry(null);
            setCompanySize(null);
            setHiringActivity(null);
        } catch (error) {
            // Error is handled/toasted in parent
        } finally {
            setIsSubmitting(false);
        }
    };

    const countries: OptionType[] = [
        { label: "United Kingdom", value: "United Kingdom" },
        { label: "United States", value: "United States" },
        { label: "Canada", value: "Canada" },
        { label: "Germany", value: "Germany" },
        { label: "France", value: "France" },
    ];

    const industries: OptionType[] = [
        { label: "Technology", value: "Technology" },
        { label: "Finance", value: "Finance" },
        { label: "Healthcare", value: "Healthcare" },
        { label: "Retail", value: "Retail" },
        { label: "Education", value: "Education" },
    ];

    const sizes: OptionType[] = [
        { label: "1-10 employees", value: "1-10 employees" },
        { label: "10-50 employees", value: "10-50 employees" },
        { label: "50-200 employees", value: "50-200 employees" },
        { label: "200-500 employees", value: "200-500 employees" },
        { label: "500+ employees", value: "500+ employees" },
    ];

    const activities: OptionType[] = [
        { label: "High", value: "High" },
        { label: "Medium", value: "Medium" },
        { label: "Low", value: "Low" },
        { label: "None", value: "None" },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-0 duration-200">
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={isSubmitting ? undefined : onClose} />

            {/* Modal Body */}
            <div className="bg-white rounded-xl border border-btn-sec-border shadow-xl w-full max-w-lg p-6 relative flex flex-col gap-6 animate-in zoom-in-95 duration-200 z-10">
                
                {/* Header */}
                <div className="flex flex-col gap-1.5 text-left">
                    <Typography variant="h4" className="text-lg font-bold text-text-main leading-none">
                        Generate New Leads with AI
                    </Typography>
                    <Typography variant="body2" className="text-muted-text text-sm">
                        Define your target market and let AI find potential clients
                    </Typography>
                </div>

                {/* Form fields */}
                <div className="space-y-4 py-2">
                    <div className="grid grid-cols-2 gap-4">
                        
                        {/* Country Select */}
                        <Select
                            label="Country"
                            placeholder="Select country"
                            options={countries}
                            value={country}
                            onChange={(val) => setCountry(val as OptionType | null)}
                            isDisabled={isSubmitting}
                        />

                        {/* Industry Select */}
                        <Select
                            label="Industry"
                            placeholder="Select industry"
                            options={industries}
                            value={industry}
                            onChange={(val) => setIndustry(val as OptionType | null)}
                            isDisabled={isSubmitting}
                        />

                        {/* Company Size Select */}
                        <Select
                            label="Company Size"
                            placeholder="Select size"
                            options={sizes}
                            value={companySize}
                            onChange={(val) => setCompanySize(val as OptionType | null)}
                            isDisabled={isSubmitting}
                        />

                        {/* Hiring Activity Select */}
                        <Select
                            label="Hiring Activity"
                            placeholder="Select activity"
                            options={activities}
                            value={hiringActivity}
                            onChange={(val) => setHiringActivity(val as OptionType | null)}
                            isDisabled={isSubmitting}
                        />

                    </div>

                    {/* Sparkle info banner */}
                    <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 mt-4 text-left">
                        <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <p className="font-semibold text-text-main mb-1">AI will search for:</p>
                                <ul className="space-y-1 text-muted-text">
                                    <li>• Companies matching your criteria</li>
                                    <li>• Recent job postings and hiring signals</li>
                                    <li>• Decision makers and contact information</li>
                                    <li>• Company health and growth indicators</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        prefixIcon={Search}
                        loading={isSubmitting}
                    >
                        Generate Leads
                    </Button>
                </div>

                {/* Top-right close button */}
                <Button
                    type="button"
                    variant="icon"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="absolute top-4 right-4"
                >
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                </Button>
            </div>
        </div>
    );
};
