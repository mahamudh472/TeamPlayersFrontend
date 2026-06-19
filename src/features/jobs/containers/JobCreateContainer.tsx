import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Typography, OptionType, BackButton, Button } from "../../../components/ui";
import { JobCreateForm, JobCreateSidebar } from "../components";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

export const JobCreateContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;
    const isEdit = !!id;

    // Form states
    const [title, setTitle] = useState("");
    const [client, setClient] = useState<OptionType | null>(null);
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [experience, setExperience] = useState("");
    const [skills, setSkills] = useState("");
    const [jobType, setJobType] = useState<OptionType | null>({ label: "Remote", value: "remote" });
    const [status, setStatus] = useState<OptionType | null>({ label: "Open", value: "open" });
    const [description, setDescription] = useState("");

    // AI Upload/Parse states
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisSuccess, setAnalysisSuccess] = useState(false);

    // Dynamic clients options state
    const [clients, setClients] = useState<OptionType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch clients dropdown options
    useEffect(() => {
        const fetchClientsOptions = async () => {
            if (!agencyId) return;
            try {
                const res = await apiClient.get("/api/v1/agency/clients/", {
                    headers: { "X-Agency-ID": String(agencyId) },
                    params: { page_size: 100 },
                });
                const mappedClients = (res.data.results || []).map((c: any) => ({
                    label: c.company,
                    value: String(c.id),
                }));
                setClients(mappedClients);
            } catch (err) {
                console.error("Failed to fetch clients for dropdown:", err);
            }
        };

        fetchClientsOptions();
    }, [agencyId]);

    // Fetch job details for editing
    useEffect(() => {
        const fetchJobDetails = async () => {
            if (!isEdit || !id || !agencyId) return;

            try {
                setIsLoading(true);
                const res = await apiClient.get(`/api/v1/agency/jobs/${id}/`, {
                    headers: { "X-Agency-ID": String(agencyId) },
                });
                const job = res.data;

                setTitle(job.title || "");
                setClient({ label: job.client_name, value: String(job.client) });
                setLocation(job.location || "");
                setSalary(job.salary_range || "");
                setExperience(job.experince_required !== undefined ? String(job.experince_required) : "");
                setSkills(job.skills ? job.skills.join(", ") : "");
                setJobType({
                    label: job.job_type ? job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1) : "Remote",
                    value: job.job_type || "remote",
                });
                setStatus({
                    label: job.status ? job.status.charAt(0).toUpperCase() + job.status.slice(1) : "Open",
                    value: job.status || "open",
                });
                setDescription(job.description || "");
            } catch (err: any) {
                console.error("Failed to load job details for editing:", err);
                toast.error("Failed to load job details for editing");
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobDetails();
    }, [id, isEdit, agencyId, toast]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!agencyId) {
            toast.error("Agency selection is required");
            return;
        }

        if (!client) {
            toast.error("Client is required");
            return;
        }

        const payload: any = {
            client: Number(client.value),
            title: title,
            description: description,
            location: location || "",
            salary_range: salary || "",
            experince_required: parseInt(experience) || 0,
            skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
            job_type: jobType?.value || "remote",
            status: status?.value || "open",
        };

        try {
            setIsLoading(true);
            if (isEdit) {
                await apiClient.patch(`/api/v1/agency/jobs/${id}/`, payload, {
                    headers: { "X-Agency-ID": String(agencyId) },
                });
                toast.success("Job updated successfully");
                navigate(`/dashboard/jobs/${id}`);
            } else {
                const res = await apiClient.post("/api/v1/agency/jobs/", payload, {
                    headers: { "X-Agency-ID": String(agencyId) },
                });
                toast.success("Job created successfully");
                navigate("/dashboard/jobs");
            }
        } catch (err: any) {
            console.error("Failed to save job:", err);
            const validationErrors = err.response?.data;
            if (validationErrors && typeof validationErrors === "object") {
                const firstKey = Object.keys(validationErrors)[0];
                const messages = validationErrors[firstKey];
                const msg = Array.isArray(messages) ? messages[0] : (typeof messages === "string" ? messages : "Validation error");
                toast.error(`${firstKey}: ${msg}`);
            } else {
                toast.error(err.response?.data?.detail || "Failed to save job profile");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = title.trim() !== "" && client !== null && description.trim() !== "";

    if (isLoading && isEdit && title === "") {
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
                <span className="text-sm text-muted-text mt-4">Loading job details for editing...</span>
            </div>
        );
    }

    return (
        <main className="space-y-6">
            {/* Header section with back navigation */}
            <div className="flex flex-col gap-2 text-left">
                <BackButton
                    label={`Back to ${isEdit ? "Job Details" : "Jobs"}`}
                    to={isEdit ? `/dashboard/jobs/${id}` : "/dashboard/jobs"}
                />
                <div>
                    <Typography variant="h2" className="text-2xl font-bold text-text-main leading-tight">
                        {isEdit ? "Edit Job Profile" : "Create New Job"}
                    </Typography>
                    <Typography variant="body1" className="text-muted-text mt-1">
                        {isEdit
                            ? `Modify details for job ID: ${id} below.`
                            : "Post a new job and let AI screen candidates"}
                    </Typography>
                </div>
            </div>

            {/* Left aligned 3-Column layout grid */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <JobCreateForm
                        title={title}
                        setTitle={setTitle}
                        client={client}
                        setClient={setClient}
                        location={location}
                        setLocation={setLocation}
                        salary={salary}
                        setSalary={setSalary}
                        experience={experience}
                        setExperience={setExperience}
                        skills={skills}
                        setSkills={setSkills}
                        jobType={jobType}
                        setJobType={setJobType}
                        status={status}
                        setStatus={setStatus}
                        description={description}
                        setDescription={setDescription}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        isAnalyzing={isAnalyzing}
                        setIsAnalyzing={setIsAnalyzing}
                        analysisSuccess={analysisSuccess}
                        setAnalysisSuccess={setAnalysisSuccess}
                        clients={clients}
                        isEdit={isEdit}
                    />
                </div>

                {/* Right Column: AI screening criteria and action buttons */}
                <div className="space-y-6">
                    <JobCreateSidebar />

                    {/* Submit & Cancel triggers */}
                    <div className="space-y-3">
                        <Button
                            type="submit"
                            disabled={!isFormValid || isLoading}
                            className="w-full font-semibold"
                        >
                            {isEdit ? "Save Changes" : "Create Job & Activate Pipeline"}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={isLoading}
                            onClick={() => {
                                if (isEdit) {
                                    navigate(`/dashboard/jobs/${id}`);
                                } else {
                                    navigate("/dashboard/jobs");
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
