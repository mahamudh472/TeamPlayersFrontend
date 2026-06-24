import React, { useState, useEffect } from "react";
import { Typography, Input, AppBadge, Button } from "../../../components/ui";
import { Building, Upload } from "lucide-react";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

export const AgencySettings: React.FC = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    const [agencyName, setAgencyName] = useState("");
    const [logoPreview, setLogoPreview] = useState("");
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [currentPlan, setCurrentPlan] = useState("");
    const [teamSize, setTeamSize] = useState<number | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSavingAgency, setIsSavingAgency] = useState(false);

    useEffect(() => {
        const fetchAgencyInfo = async () => {
            if (!agencyId) {
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                const response = await apiClient.get("/api/v1/agency/info/", {
                    headers: { "X-Agency-ID": String(agencyId) }
                });
                setAgencyName(response.data.name || "");
                setLogoPreview(response.data.logo || "");
                setLogoFile(null);
                setCurrentPlan(response.data.current_plan || "Free Plan");
                setTeamSize(response.data.team_size ?? 0);
            } catch (error: any) {
                console.error("Failed to load agency info:", error);
                toast.error(error.response?.data?.detail || "Failed to load agency info");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAgencyInfo();
    }, [agencyId, toast]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveAgency = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agencyId) {
            toast.error("No active agency selected.");
            return;
        }
        setIsSavingAgency(true);
        try {
            const formData = new FormData();
            formData.append("name", agencyName);
            if (logoFile) {
                formData.append("logo", logoFile);
            }

            const response = await apiClient.patch("/api/v1/agency/info/", formData, {
                headers: {
                    "X-Agency-ID": String(agencyId),
                    "Content-Type": "multipart/form-data",
                }
            });

            toast.success("Agency details updated successfully!");
            setAgencyName(response.data.name || "");
            setLogoPreview(response.data.logo || "");
            setLogoFile(null);
            setCurrentPlan(response.data.current_plan || "Free Plan");
            setTeamSize(response.data.team_size ?? 0);

            // Dispatch event to notify layout (e.g. Header) to update agency listings
            window.dispatchEvent(new Event("agency-updated"));
        } catch (error: any) {
            console.error("Failed to update agency info:", error);
            const detail = error.response?.data?.detail || error.response?.data?.error || "Failed to save agency details.";
            toast.error(detail);
        } finally {
            setIsSavingAgency(false);
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl border border-btn-sec-border shadow-xs flex flex-col items-center justify-center p-12 min-h-[350px]">
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
                <Typography variant="body2" className="text-muted-text mt-4">
                    Loading agency details...
                </Typography>
            </div>
        );
    }

    return (
        <form onSubmit={handleSaveAgency} className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs space-y-6 text-left">
            <div>
                <Typography variant="h4" className="font-bold text-text-main">
                    Agency Information
                </Typography>
                <Typography variant="body2" className="text-muted-text">
                    Update your agency details and brand assets
                </Typography>
            </div>
            <div className="space-y-5">
                <Input
                    label="Agency Name"
                    type="text"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    prefixIcon={Building}
                    required
                />
                
                <div className="space-y-2">
                    <Typography variant="body2" className="font-semibold text-text-main text-sm">
                        Agency Logo
                    </Typography>
                    <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 overflow-hidden shrink-0 border border-btn-sec-border">
                            {logoPreview ? (
                                <img src={logoPreview} alt="Agency Logo" className="w-full h-full object-contain p-1" />
                            ) : (
                                <Building className="w-8 h-8 text-slate-300" />
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="logo-file-input"
                            />
                            <label
                                htmlFor="logo-file-input"
                                className="cursor-pointer bg-white hover:bg-slate-50 text-text-main text-xs font-semibold py-2 px-3 rounded-lg border border-btn-sec-border transition-all shadow-xs inline-flex items-center gap-1.5 w-fit select-none"
                            >
                                <Upload size={14} />
                                <span>Upload New Logo</span>
                            </label>
                            <span className="text-[11px] text-light-text leading-none mt-1">
                                {logoFile ? `Selected: ${logoFile.name}` : "Supports PNG, JPG, or SVG up to 2MB."}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                        <Typography variant="body2" className="font-medium text-text-main text-sm">
                            Current Plan
                        </Typography>
                        <div className="flex items-center gap-2">
                            <Input
                                type="text"
                                value={currentPlan}
                                disabled
                                className="bg-slate-50 cursor-not-allowed grow"
                            />
                            <AppBadge variant="primary" className="capitalize text-xs leading-none py-1">
                                {currentPlan || "free"}
                            </AppBadge>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Typography variant="body2" className="font-medium text-text-main text-sm">
                            Team Size
                        </Typography>
                        <Input
                            type="text"
                            value={teamSize !== null ? `${teamSize} ${teamSize === 1 ? 'member' : 'members'}` : "0 members"}
                            disabled
                            className="bg-slate-50 cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" loading={isSavingAgency}>
                    Save Changes
                </Button>
            </div>
        </form>
    );
};
