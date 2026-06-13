import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Typography, BackButton, OptionType, Button } from "../../../components/ui";
import { ClientCreateForm } from "../components/ClientCreateForm";
import { ClientCreateSidebar } from "../components/ClientCreateSidebar";

export const ClientCreateContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEdit = !!id;

    // Form states
    const [name, setName] = useState("");
    const [industry, setIndustry] = useState<OptionType | null>(null);
    const [status, setStatus] = useState<OptionType | null>({ label: "Active", value: "active" });
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [summary, setSummary] = useState("");

    // Mock details for pre-filling edit mode
    const getClientDetails = (clientId: string | undefined) => {
        if (clientId === "2") {
            return {
                name: "RetailPro Group",
                industry: { label: "Retail", value: "Retail" },
                status: { label: "Active", value: "active" },
                contactName: "David Miller",
                contactEmail: "d.miller@retailpro.com",
                contactPhone: "+44 20 8901 2233",
                summary: "Large scale retail management and supply chain group across the UK.",
            };
        }
        if (clientId === "3") {
            return {
                name: "Manufacturing United",
                industry: { label: "Manufacturing", value: "Manufacturing" },
                status: { label: "Active", value: "active" },
                contactName: "Robert Taylor",
                contactEmail: "r.taylor@mfg-united.co.uk",
                contactPhone: "+44 113 496 0122",
                summary: "National manufacturing corporation with multiple production facilities.",
            };
        }
        // Fallback (Client 1: GlobalTech Industries)
        return {
            name: "GlobalTech Industries",
            industry: { label: "Technology", value: "Technology" },
            status: { label: "Active", value: "active" },
            contactName: "Sarah Jenkins",
            contactEmail: "s.jenkins@globaltech.com",
            contactPhone: "+44 20 7946 0192",
            summary: "Leading technology services provider specializing in enterprise solutions.",
        };
    };

    // Pre-fill states in edit mode
    useEffect(() => {
        if (isEdit && id) {
            const client = getClientDetails(id);
            if (client) {
                setName(client.name);
                setIndustry(client.industry);
                setStatus(client.status);
                setContactName(client.contactName);
                setContactEmail(client.contactEmail);
                setContactPhone(client.contactPhone);
                setSummary(client.summary);
            }
        }
    }, [id, isEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Return back to client details or clients list after simulated save
        if (isEdit) {
            navigate(`/dashboard/clients/${id}`);
        } else {
            navigate("/dashboard/clients");
        }
    };

    const isFormValid = name.trim() !== "" && industry !== null && contactName.trim() !== "";

    return (
        <main className="space-y-6">
            {/* Header section with back navigation */}
            <div className="flex flex-col gap-2 text-left">
                <BackButton
                    label={`Back to ${isEdit ? "Client Details" : "Clients"}`}
                    to={isEdit ? `/dashboard/clients/${id}` : "/dashboard/clients"}
                />
                <div>
                    <Typography variant="h2" className="text-2xl font-bold text-text-main leading-tight">
                        {isEdit ? "Edit Client Profile" : "Create New Client"}
                    </Typography>
                    <Typography variant="body1" className="text-muted-text mt-1">
                        {isEdit
                            ? `Modify details for client ID: ${id} below.`
                            : "Add a new client company profile to manage their jobs and leads"}
                    </Typography>
                </div>
            </div>

            {/* Left aligned 3-Column layout grid */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ClientCreateForm
                        name={name}
                        setName={setName}
                        industry={industry}
                        setIndustry={setIndustry}
                        status={status}
                        setStatus={setStatus}
                        contactName={contactName}
                        setContactName={setContactName}
                        contactEmail={contactEmail}
                        setContactEmail={setContactEmail}
                        contactPhone={contactPhone}
                        setContactPhone={setContactPhone}
                        summary={summary}
                        setSummary={setSummary}
                        isEdit={isEdit}
                    />
                </div>

                {/* Right Column: AI criteria/rules & actions */}
                <div className="space-y-6">
                    <ClientCreateSidebar />

                    {/* Submit & Cancel triggers */}
                    <div className="space-y-3">
                        <Button
                            type="submit"
                            disabled={!isFormValid}
                            className="w-full"
                        >
                            {isEdit ? "Save Changes" : "Create Client Profile"}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                if (isEdit) {
                                    navigate(`/dashboard/clients/${id}`);
                                } else {
                                    navigate("/dashboard/clients");
                                }
                            }}
                            className="w-full"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </main>
    );
};
