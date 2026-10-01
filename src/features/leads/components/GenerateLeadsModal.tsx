import React, { useState } from "react";
import { Typography, Select, OptionType, Button, Input } from "../../../components/ui";
import { Sparkles, Search, X, Briefcase } from "lucide-react";

import { GenerateLeadsModalProps } from "../types";
import { COUNTRIES } from "../constants/countries";

const INDUSTRY_SUGGESTIONS = [
    "Technology",
    "Software & SaaS",
    "Finance & Banking",
    "Healthcare & Life Sciences",
    "Retail & E-commerce",
    "Education & EdTech",
    "Manufacturing",
    "Real Estate",
    "Marketing & Advertising",
    "Telecommunications",
    "Logistics & Supply Chain",
    "Consulting & Professional Services",
];

export const GenerateLeadsModal: React.FC<GenerateLeadsModalProps> = ({
    isOpen,
    onClose,
    onGenerate,
}) => {
    const [country, setCountry] = useState<OptionType | null>(null);
    const [industry, setIndustry] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [companySize, setCompanySize] = useState<OptionType | null>(null);
    const [hiringActivity, setHiringActivity] = useState<OptionType | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{
        country?: string;
        industry?: string;
        companySize?: string;
        hiringActivity?: string;
    }>({});

    if (!isOpen) return null;

    const handleClose = () => {
        if (isSubmitting) return;
        setErrors({});
        onClose();
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const newErrors: {
            country?: string;
            industry?: string;
            companySize?: string;
            hiringActivity?: string;
        } = {};

        if (!country?.value) {
            newErrors.country = "Please select a country";
        }
        if (!industry.trim()) {
            newErrors.industry = "Please enter an industry";
        }
        if (!companySize?.value) {
            newErrors.companySize = "Please select company size";
        }
        if (!hiringActivity?.value) {
            newErrors.hiringActivity = "Please select hiring activity";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            await onGenerate({
                country: country!.value,
                industry: industry.trim(),
                jobTitle: jobTitle.trim() || undefined,
                companySize: companySize!.value,
                hiringActivity: hiringActivity!.value,
            });
            onClose();
            // Reset filters on success
            setCountry(null);
            setIndustry("");
            setJobTitle("");
            setCompanySize(null);
            setHiringActivity(null);
            setErrors({});
        } catch (error) {
            // Error is handled/toasted in parent
        } finally {
            setIsSubmitting(false);
        }
    };

    const countries = COUNTRIES;

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
            <div className="absolute inset-0" onClick={handleClose} />

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
                <form onSubmit={handleSubmit} className="space-y-4 py-1">
                    <div className="grid grid-cols-2 gap-4">
                        
                        {/* Country Select */}
                        <Select
                            label="Country"
                            placeholder="Select country"
                            options={countries}
                            value={country}
                            onChange={(val) => {
                                setCountry(val as OptionType | null);
                                if (errors.country) setErrors((prev) => ({ ...prev, country: undefined }));
                            }}
                            isDisabled={isSubmitting}
                            error={errors.country}
                        />

                        {/* Industry Input */}
                        <div>
                            <Input
                                id="lead-industry"
                                label="Industry"
                                placeholder="Type or select industry"
                                value={industry}
                                onChange={(e) => {
                                    setIndustry(e.target.value);
                                    if (errors.industry) setErrors((prev) => ({ ...prev, industry: undefined }));
                                }}
                                disabled={isSubmitting}
                                error={errors.industry}
                                list="lead-industry-options"
                                autoComplete="off"
                            />
                            <datalist id="lead-industry-options">
                                {INDUSTRY_SUGGESTIONS.map((item) => (
                                    <option key={item} value={item} />
                                ))}
                            </datalist>
                        </div>

                        {/* Job Title Input (col-span-2) */}
                        <div className="col-span-2">
                            <Input
                                id="lead-job-title"
                                label="Job Title (Optional)"
                                placeholder="e.g. Software Engineer, Sales Manager, React Developer..."
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                disabled={isSubmitting}
                                prefixIcon={Briefcase}
                                helperText="Search for companies actively hiring for this specific role"
                            />
                        </div>

                        {/* Company Size Select */}
                        <Select
                            label="Company Size"
                            placeholder="Select size"
                            options={sizes}
                            value={companySize}
                            onChange={(val) => {
                                setCompanySize(val as OptionType | null);
                                if (errors.companySize) setErrors((prev) => ({ ...prev, companySize: undefined }));
                            }}
                            isDisabled={isSubmitting}
                            error={errors.companySize}
                        />

                        {/* Hiring Activity Select */}
                        <Select
                            label="Hiring Activity"
                            placeholder="Select activity"
                            options={activities}
                            value={hiringActivity}
                            onChange={(val) => {
                                setHiringActivity(val as OptionType | null);
                                if (errors.hiringActivity) setErrors((prev) => ({ ...prev, hiringActivity: undefined }));
                            }}
                            isDisabled={isSubmitting}
                            error={errors.hiringActivity}
                        />

                    </div>

                    {/* Sparkle info banner */}
                    <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 mt-4 text-left">
                        <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <p className="font-semibold text-text-main mb-1">AI will search for:</p>
                                <ul className="space-y-1 text-muted-text">
                                    <li>• Companies matching your criteria and location</li>
                                    {jobTitle.trim() ? (
                                        <li className="text-primary font-semibold">
                                            • Companies actively hiring for "{jobTitle.trim()}"
                                        </li>
                                    ) : (
                                        <li>• Recent job postings and hiring signals</li>
                                    )}
                                    <li>• Decision makers and contact information</li>
                                    <li>• Company health and growth indicators</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            prefixIcon={Search}
                            loading={isSubmitting}
                        >
                            Generate Leads
                        </Button>
                    </div>
                </form>

                {/* Top-right close button */}
                <Button
                    type="button"
                    variant="icon"
                    onClick={handleClose}
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
