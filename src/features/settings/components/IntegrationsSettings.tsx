import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Typography, AppBadge, Button } from "../../../components/ui";
import { Mail, Calendar, Video, Zap, Eye, X } from "lucide-react";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

interface Integration {
    id: string | null;
    provider: string;
    name: string;
    is_connected: boolean;
    connected_at: string | null;
    metadata: {
        email?: string;
        display_name?: string;
        [key: string]: any;
    };
    created_at: string | null;
    updated_at: string | null;
}

export const IntegrationsSettings: React.FC = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [searchParams, setSearchParams] = useSearchParams();

    const [integrations, setIntegrations] = useState<Integration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
    const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    const fetchIntegrations = async () => {
        if (!agencyId) {
            setIsLoading(false);
            return;
        }
        try {
            setIsLoading(true);
            const response = await apiClient.get<Integration[]>("/api/v1/integrations/available/", {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            setIntegrations(response.data);
        } catch (error: any) {
            console.error("Failed to fetch integrations:", error);
            toast.error(error.response?.data?.detail || error.response?.data?.error || "Failed to load integrations");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchIntegrations();
    }, [agencyId]);

    useEffect(() => {
        const status = searchParams.get("status");
        const provider = searchParams.get("provider");
        const message = searchParams.get("message");

        if (status) {
            const providerName = provider ? (provider === "google_calendar" ? "Google Calendar" : provider.charAt(0).toUpperCase() + provider.slice(1)) : "Integration";
            if (status === "success") {
                toast.success(`${providerName} connected successfully!`);
            } else if (status === "error") {
                toast.error(message ? `Failed to connect ${providerName}: ${message}` : `Failed to connect ${providerName}.`);
            }

            // Clean up the search parameters so they don't trigger the toast again on page reload
            const newParams = new URLSearchParams(searchParams);
            newParams.delete("status");
            newParams.delete("provider");
            newParams.delete("message");
            setSearchParams(newParams, { replace: true });
        }
    }, [searchParams, setSearchParams, toast]);

    const handleConnect = async (provider: string, name: string) => {
        if (provider !== "zoom") {
            toast.info(`${name} integration is coming soon!`);
            return;
        }

        if (!agencyId) {
            toast.error("No active agency selected.");
            return;
        }

        setActionLoading((prev) => ({ ...prev, [provider]: true }));
        try {
            const response = await apiClient.get<{ auth_url: string }>(`/api/v1/integrations/${provider}/connect/`, {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            if (response.data.auth_url) {
                window.location.href = response.data.auth_url;
            } else {
                toast.error("Could not retrieve connection link.");
            }
        } catch (error: any) {
            console.error(`Failed to connect to ${name}:`, error);
            const detail = error.response?.data?.detail || error.response?.data?.error || `Failed to initiate ${name} connection.`;
            toast.error(detail);
        } finally {
            setActionLoading((prev) => ({ ...prev, [provider]: false }));
        }
    };

    const handleDisconnect = async (provider: string, name: string) => {
        if (provider !== "zoom") {
            toast.info(`Disconnecting ${name} is not supported yet.`);
            return;
        }

        if (!agencyId) {
            toast.error("No active agency selected.");
            return;
        }

        setActionLoading((prev) => ({ ...prev, [provider]: true }));
        try {
            await apiClient.post(`/api/v1/integrations/${provider}/disconnect/`, {}, {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            toast.success(`${name} disconnected successfully!`);
            
            // Refresh list
            const response = await apiClient.get<Integration[]>("/api/v1/integrations/available/", {
                headers: { "X-Agency-ID": String(agencyId) },
            });
            setIntegrations(response.data);
        } catch (error: any) {
            console.error(`Failed to disconnect ${name}:`, error);
            const detail = error.response?.data?.detail || error.response?.data?.error || `Failed to disconnect ${name}.`;
            toast.error(detail);
        } finally {
            setActionLoading((prev) => ({ ...prev, [provider]: false }));
        }
    };

    const getIcon = (provider: string, isConnected: boolean) => {
        const colorClass = isConnected ? "text-primary" : "text-slate-400";
        switch (provider) {
            case "zoom":
                return <Video className={`w-8 h-8 shrink-0 ${colorClass}`} />;
            case "outlook":
                return <Mail className={`w-8 h-8 shrink-0 ${colorClass}`} />;
            case "google_calendar":
                return <Calendar className={`w-8 h-8 shrink-0 ${colorClass}`} />;
            default:
                return <Zap className={`w-8 h-8 shrink-0 ${colorClass}`} />;
        }
    };

    const getDescription = (integration: Integration) => {
        if (!integration.is_connected) {
            return "Not connected";
        }

        const parts: string[] = [];
        if (integration.metadata?.display_name) {
            parts.push(integration.metadata.display_name);
        }
        if (integration.metadata?.email) {
            parts.push(integration.metadata.email);
        }

        if (parts.length > 0) {
            return `Connected as ${parts.join(" - ")}`;
        }
        return "Connected";
    };

    const formatKey = (key: string) => {
        return key
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "N/A";
        try {
            return new Date(dateStr).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
            });
        } catch {
            return dateStr;
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
                    Loading integrations...
                </Typography>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs space-y-6 text-left">
            <div>
                <Typography variant="h4" className="font-bold text-text-main">
                    Connected Integrations
                </Typography>
                <Typography variant="body2" className="text-muted-text">
                    Manage your third-party connections
                </Typography>
            </div>
            <div className="space-y-4">
                {integrations.map((integration) => (
                    <div
                        key={integration.provider}
                        className="flex items-center justify-between p-4 border border-btn-sec-border rounded-lg bg-slate-50/50"
                    >
                        <div className="flex items-center gap-3">
                            {getIcon(integration.provider, integration.is_connected)}
                            <div>
                                <Typography variant="body1" className="font-semibold text-text-main text-sm">
                                    {integration.name}
                                </Typography>
                                <Typography variant="body2" className="text-xs text-muted-text">
                                    {getDescription(integration)}
                                </Typography>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {integration.is_connected && (
                                <button
                                    type="button"
                                    className="p-1.5 h-8 w-8 rounded-lg border border-btn-sec-border bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-xs flex items-center justify-center cursor-pointer transition-all duration-200 shrink-0"
                                    onClick={() => setSelectedIntegration(integration)}
                                    title="View integration details"
                                >
                                    <Eye className="w-5 h-5 shrink-0" />
                                </button>
                            )}
                            <AppBadge variant={integration.is_connected ? "primary" : "neutral"}>
                                {integration.is_connected ? "Connected" : "Not connected"}
                            </AppBadge>
                            {integration.is_connected ? (
                                <Button
                                    variant="outline"
                                    className="text-xs py-1 px-2.5 h-8 border-red-200 hover:bg-red-50 hover:text-red-600 text-red-500"
                                    onClick={() => handleDisconnect(integration.provider, integration.name)}
                                    loading={actionLoading[integration.provider]}
                                >
                                    Disconnect
                                </Button>
                            ) : (
                                <Button
                                    variant="outline"
                                    className="text-xs py-1 px-2.5 h-8"
                                    onClick={() => handleConnect(integration.provider, integration.name)}
                                    loading={actionLoading[integration.provider]}
                                >
                                    Connect
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Integration Details Modal */}
            {selectedIntegration && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-0 duration-200">
                    <div className="absolute inset-0" onClick={() => setSelectedIntegration(null)} />
                    <div className="bg-white rounded-xl border border-btn-sec-border shadow-xl w-full max-w-lg p-6 relative flex flex-col gap-6 animate-in zoom-in-95 duration-200 z-10 text-left">
                        {/* Header */}
                        <div className="flex flex-col gap-1 pr-8">
                            <Typography variant="h4" className="text-lg font-bold text-text-main leading-none">
                                {selectedIntegration.name} Integration Details
                            </Typography>
                            <Typography variant="body2" className="text-muted-text text-sm">
                                Stored attributes and connection details from the server.
                            </Typography>
                        </div>

                        {/* Details content */}
                        <div className="space-y-4 py-2 border-t border-b border-slate-100/50 max-h-[400px] overflow-y-auto pr-1">
                            {/* Standard Fields */}
                            <div>
                                <label className="text-[10px] font-bold text-muted-text uppercase tracking-wider block mb-1">
                                    Integration ID
                                </label>
                                <Typography variant="body2" className="font-mono text-xs text-text-main bg-slate-50 px-2 py-1 rounded border border-slate-100 w-fit">
                                    {selectedIntegration.id || "N/A"}
                                </Typography>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-muted-text uppercase tracking-wider block mb-1">
                                        Connected At
                                    </label>
                                    <Typography variant="body2" className="text-text-main text-xs">
                                        {formatDate(selectedIntegration.connected_at)}
                                    </Typography>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-muted-text uppercase tracking-wider block mb-1">
                                        Status
                                    </label>
                                    <div>
                                        <AppBadge
                                            variant={selectedIntegration.is_connected ? "primary" : "neutral"}
                                            className="py-0.5"
                                        >
                                            {selectedIntegration.is_connected ? "Connected" : "Not connected"}
                                        </AppBadge>
                                    </div>
                                </div>
                            </div>

                            {/* Metadata fields */}
                            {selectedIntegration.metadata && Object.keys(selectedIntegration.metadata).length > 0 && (
                                <div className="space-y-3 pt-2 border-t border-slate-100/50">
                                    <Typography variant="body2" className="font-semibold text-text-main">
                                        Metadata
                                    </Typography>
                                    <div className="grid grid-cols-1 gap-3 bg-slate-50/50 p-3 border border-slate-100 rounded-lg">
                                        {Object.entries(selectedIntegration.metadata).map(([key, val]) => (
                                            <div key={key}>
                                                <label className="text-[10px] font-bold text-muted-text uppercase tracking-wider block mb-0.5">
                                                    {formatKey(key)}
                                                </label>
                                                <Typography variant="body2" className="text-text-main text-xs break-all">
                                                    {typeof val === "object" ? JSON.stringify(val) : String(val)}
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 pt-2">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => setSelectedIntegration(null)}
                            >
                                Close
                            </Button>
                        </div>

                        {/* Close button (top right) */}
                        <Button
                            type="button"
                            variant="icon"
                            size="sm"
                            onClick={() => setSelectedIntegration(null)}
                            className="absolute top-4 right-4 p-1 h-8 w-8 min-w-0 text-slate-500 hover:text-slate-700"
                        >
                            <X className="w-4 h-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
