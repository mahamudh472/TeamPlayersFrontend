import React from "react";
import { Typography, Input, Select, OptionType } from "../../../components/ui";

interface ClientCreateFormProps {
    name: string;
    setName: (val: string) => void;
    industry: OptionType | null;
    setIndustry: (val: OptionType | null) => void;
    contactName: string;
    setContactName: (val: string) => void;
    contactEmail: string;
    setContactEmail: (val: string) => void;
    contactPhone: string;
    setContactPhone: (val: string) => void;
    status: OptionType | null;
    setStatus: (val: OptionType | null) => void;
    summary: string;
    setSummary: (val: string) => void;
    isEdit: boolean;
}

export const ClientCreateForm: React.FC<ClientCreateFormProps> = ({
    name,
    setName,
    industry,
    setIndustry,
    contactName,
    setContactName,
    contactEmail,
    setContactEmail,
    contactPhone,
    setContactPhone,
    status,
    setStatus,
    summary,
    setSummary,
    isEdit,
}) => {
    const industries: OptionType[] = [
        { label: "Technology", value: "Technology" },
        { label: "Retail", value: "Retail" },
        { label: "Manufacturing", value: "Manufacturing" },
        { label: "Finance", value: "Finance" },
        { label: "Healthcare", value: "Healthcare" },
    ];

    const statusOptions: OptionType[] = [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
    ];

    return (
        <div className="space-y-6 text-left">
            {/* General Info Card */}
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6">
                <div>
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        Company Details
                    </Typography>
                    <p className="text-sm text-muted-text mt-1.5">Basic profile details of the client</p>
                </div>

                <div className="space-y-4">
                    {/* Client Name */}
                    <Input
                        label="Client Name *"
                        id="client-name"
                        placeholder="e.g. Acme Corporation"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    {/* Industry Dropdown */}
                    <Select
                        label="Industry *"
                        placeholder="Select industry"
                        options={industries}
                        value={industry}
                        onChange={(val) => setIndustry(val as OptionType | null)}
                    />

                    {/* Status Dropdown */}
                    <Select
                        label="Account Status *"
                        placeholder="Select status"
                        options={statusOptions}
                        value={status}
                        onChange={(val) => setStatus(val as OptionType | null)}
                    />
                </div>
            </div>

            {/* Primary Contact Card */}
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6">
                <div>
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        Primary Contact Details
                    </Typography>
                    <p className="text-sm text-muted-text mt-1.5">Who to reach out to for roles and placements</p>
                </div>

                <div className="space-y-4">
                    {/* Contact Person Name */}
                    <Input
                        label="Contact Person Name *"
                        id="contact-name"
                        placeholder="e.g. John Doe"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                    />

                    {/* Contact Email & Phone Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Email Address *"
                            type="email"
                            id="contact-email"
                            placeholder="john.doe@company.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            required
                        />
                        <Input
                            label="Phone Number"
                            type="tel"
                            id="contact-phone"
                            placeholder="+44 20 1234 5678"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* AI Account Summary Card */}
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6">
                <div>
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        Partnership Notes & AI Summary
                    </Typography>
                    <p className="text-sm text-muted-text mt-1.5">Key background info, target roles, or specific coordination instructions</p>
                </div>

                <div className="w-full flex flex-col gap-1.5">
                    <label htmlFor="summary" className="cursor-pointer select-none">
                        <Typography variant="body2" className="font-semibold text-text-main">
                            Account Summary / Notes
                        </Typography>
                    </label>
                    <textarea
                        id="summary"
                        placeholder="Provide relationship notes or specific guidelines for this client account..."
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        rows={5}
                        className="w-full resize-none border border-btn-sec-border rounded-lg bg-white px-3 py-2 text-sm text-text-main outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>
            </div>
        </div>
    );
};
