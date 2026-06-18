import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Typography, BackButton, OptionType, Button } from "../../../components/ui";
import { ClientCreateForm } from "../components/ClientCreateForm";
import { ClientCreateSidebar } from "../components/ClientCreateSidebar";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

export const ClientCreateContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;
    const isEdit = !!id;

    // Form states
    const [name, setName] = useState("");
    const [industry, setIndustry] = useState<OptionType | null>(null);
    const [status, setStatus] = useState<OptionType | null>({ label: "Active", value: "active" });
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [location, setLocation] = useState("");
    const [summary, setSummary] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Prefill states in edit mode from the API
    useEffect(() => {
        const fetchClientDetails = async () => {
            if (!isEdit || !id || !agencyId) return;

            try {
                setIsLoading(true);
                const res = await apiClient.get(`/api/v1/agency/clients/${id}/`, {
                    headers: { "X-Agency-ID": String(agencyId) },
                });
                const client = res.data;
                setName(client.company || "");
                if (client.industry) {
                    setIndustry({ label: client.industry, value: client.industry });
                }
                setStatus(
                    client.is_active
                        ? { label: "Active", value: "active" }
                        : { label: "Inactive", value: "inactive" }
                );
                setContactName(client.contact_person || "");
                setContactEmail(client.contact_email || "");
                setContactPhone(client.contact_phone || "");
                setLocation(client.location || "");
                setSummary(client.note || ""); // In case note is returned
            } catch (err: any) {
                console.error("Failed to load client details for editing:", err);
                toast.error("Failed to load client details for editing");
            } finally {
                setIsLoading(false);
            }
        };

        fetchClientDetails();
    }, [id, isEdit, agencyId, toast]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!agencyId) {
            toast.error("Agency selection is required");
            return;
        }

        const payload: any = {
            company: name,
            contact_person: contactName,
            contact_email: contactEmail,
            contact_phone: contactPhone || "",
            location: location || "",
            industry: industry?.value || "",
            is_active: status?.value === "active",
        };

        try {
            setIsLoading(true);
            if (isEdit) {
                // PATCH update - exclude 'note' or 'summary' from updates as per endpoint specs
                await apiClient.patch(`/api/v1/agency/clients/${id}/`, payload, {
                    headers: { "X-Agency-ID": String(agencyId) },
                });
                toast.success("Client updated successfully");
                navigate(`/dashboard/clients/${id}`);
            } else {
                // POST create - include 'note'
                payload.note = summary || "";
                await apiClient.post("/api/v1/agency/clients/", payload, {
                    headers: { "X-Agency-ID": String(agencyId) },
                });
                toast.success("Client created successfully");
                navigate("/dashboard/clients");
            }
        } catch (err: any) {
            console.error("Failed to save client:", err);
            const validationErrors = err.response?.data;
            if (validationErrors && typeof validationErrors === "object") {
                const firstKey = Object.keys(validationErrors)[0];
                const messages = validationErrors[firstKey];
                const msg = Array.isArray(messages) ? messages[0] : (typeof messages === "string" ? messages : "Validation error");
                toast.error(`${firstKey}: ${msg}`);
            } else {
                toast.error(err.response?.data?.detail || "Failed to save client profile");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = name.trim() !== "" && industry !== null && contactName.trim() !== "" && contactEmail.trim() !== "";

    if (isLoading && isEdit && name === "") {
        return (
            <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
                <svg
                    className="animate-spin text-primary shrink-0 w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
                <span className="text-sm text-muted-text mt-4">Loading client details for editing...</span>
            </div>
        );
    }

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
                            ? `Modify details for ${name} below.`
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
                        location={location}
                        setLocation={setLocation}
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
                            disabled={!isFormValid || isLoading}
                            className="w-full cursor-pointer"
                        >
                            {isEdit ? "Save Changes" : "Create Client Profile"}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={isLoading}
                            onClick={() => {
                                if (isEdit) {
                                    navigate(`/dashboard/clients/${id}`);
                                } else {
                                    navigate("/dashboard/clients");
                                }
                            }}
                            className="w-full cursor-pointer"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </main>
    );
};
