import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Typography, OptionType, BackButton, Button } from "../../../components/ui";
import { JobCreateForm, JobCreateSidebar } from "../components";

export const JobCreateContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEdit = !!id;

    // Form states
    const [title, setTitle] = useState("");
    const [client, setClient] = useState<OptionType | null>(null);
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [experience, setExperience] = useState("");
    const [description, setDescription] = useState("");

    // AI Upload/Parse states
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisSuccess, setAnalysisSuccess] = useState(false);

    // Mock details for pre-filling edit mode
    const getJobDetails = (jobId: string | undefined) => {
        if (jobId === "2") {
            return {
                title: "Product Manager",
                client: { label: "GlobalTech Industries", value: "GlobalTech Industries" },
                location: "Manchester, UK",
                salary: "£60,000 - £80,000",
                experience: "4 years",
                description: "We are looking for a Product Manager to lead development of our client platforms and translate user needs into beautiful digital solutions.",
            };
        }
        if (jobId === "3") {
            return {
                title: "Store Manager",
                client: { label: "RetailPro Group", value: "RetailPro Group" },
                location: "Birmingham, UK",
                salary: "£35,000 - £45,000",
                experience: "3 years",
                description: "We are seeking an experienced Store Manager to lead retail staff, optimize store performance, and deliver exceptional service.",
            };
        }
        if (jobId === "4") {
            return {
                title: "Operations Manager",
                client: { label: "Manufacturing United", value: "Manufacturing United" },
                location: "Leeds, UK",
                salary: "£50,000 - £65,000",
                experience: "5 years",
                description: "Operations Manager required for manufacturing facility operations. Supervise production schedules, quality, and output.",
            };
        }
        // Fallback or Job 1 (Senior Software Engineer)
        return {
            title: "Senior Software Engineer",
            client: { label: "GlobalTech Industries", value: "GlobalTech Industries" },
            location: "London, UK",
            salary: "£70,000 - £90,000",
            experience: "5 years",
            description: "We are looking for a Senior Software Engineer to join our growing team. You will be responsible for building premium user interfaces, standardizing core components, and designing robust API integration layers.",
        };
    };

    // Pre-fill states in edit mode
    useEffect(() => {
        if (isEdit && id) {
            const job = getJobDetails(id);
            if (job) {
                setTitle(job.title);
                setClient(job.client);
                setLocation(job.location);
                setSalary(job.salary);
                setExperience(job.experience);
                setDescription(job.description);
            }
        }
    }, [id, isEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Return back to job details or jobs list after simulated save
        if (isEdit) {
            navigate(`/dashboard/jobs/${id}`);
        } else {
            navigate("/dashboard/jobs");
        }
    };

    const isFormValid = title.trim() !== "" && client !== null && description.trim() !== "";

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
                        description={description}
                        setDescription={setDescription}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        isAnalyzing={isAnalyzing}
                        setIsAnalyzing={setIsAnalyzing}
                        analysisSuccess={analysisSuccess}
                        setAnalysisSuccess={setAnalysisSuccess}
                    />
                </div>

                {/* Right Column: AI screening criteria and action buttons */}
                <div className="space-y-6">
                    <JobCreateSidebar />

                    {/* Submit & Cancel triggers */}
                    <div className="space-y-3">
                        <Button
                            type="submit"
                            disabled={!isFormValid}
                            className="w-full font-semibold"
                        >
                            {isEdit ? "Save Changes" : "Create Job & Activate Pipeline"}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
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
