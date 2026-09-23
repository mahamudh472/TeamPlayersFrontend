import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Typography, AppBadge, Button } from "../../../components/ui";
import { Zap, Eye, X, CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from "lucide-react";
import { integrationsApi, Integration } from "../../../shared/api/integrations";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

const MicrosoftIcon: React.FC<{ className?: string; isConnected?: boolean }> = ({
    className = "w-8 h-8 shrink-0",
    isConnected = true,
}) => (
    <svg className={`${className} ${!isConnected ? "grayscale opacity-60" : ""}`} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9.5" height="9.5" rx="1.5" fill="#F25022" />
        <rect x="12.5" y="2" width="9.5" height="9.5" rx="1.5" fill="#7FBA00" />
        <rect x="2" y="12.5" width="9.5" height="9.5" rx="1.5" fill="#00A4EF" />
        <rect x="12.5" y="12.5" width="9.5" height="9.5" rx="1.5" fill="#FFB900" />
    </svg>
);

const ZoomIcon: React.FC<{ className?: string; isConnected?: boolean }> = ({
    className = "w-8 h-8 shrink-0",
    isConnected = true,
}) => (
    <svg className={`${className} ${!isConnected ? "grayscale opacity-60" : ""}`} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#2D8CFF" />
        <path
            d="M5.5 8.75C5.5 7.7835 6.2835 7 7.25 7H13.75C14.7165 7 15.5 7.7835 15.5 8.75V15.25C15.5 16.2165 14.7165 17 13.75 17H7.25C6.2835 17 5.5 16.2165 5.5 15.25V8.75Z"
            fill="white"
        />
        <path
            d="M16.5 10.1519L19.0557 8.32639C19.5215 7.99369 20.1667 8.32646 20.1667 8.89531V15.1047C20.1667 15.6735 19.5215 16.0063 19.0557 15.6736L16.5 13.8481V10.1519Z"
            fill="white"
        />
    </svg>
);

const GoogleCalendarIcon: React.FC<{ className?: string; isConnected?: boolean }> = ({
    className = "w-8 h-8 shrink-0",
    isConnected = true,
}) => (
    <svg className={`${className} ${!isConnected ? "grayscale opacity-60" : ""}`} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#4285F4" />
        <rect x="5" y="6" width="14" height="13" rx="2" fill="white" />
        <path d="M5 6H19V9H5V6Z" fill="#EA4335" />
        <circle cx="8.5" cy="12" r="1" fill="#4285F4" />
        <circle cx="12" cy="12" r="1" fill="#FBBC04" />
        <circle cx="15.5" cy="12" r="1" fill="#34A853" />
        <circle cx="8.5" cy="15" r="1" fill="#34A853" />
        <circle cx="12" cy="15" r="1" fill="#4285F4" />
        <circle cx="15.5" cy="15" r="1" fill="#EA4335" />
    </svg>
);

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
            const data = await integrationsApi.getAvailableIntegrations(agencyId);
            setIntegrations(data);
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
            const formatProviderName = (p: string | null) => {
                if (!p) return "Integration";
                if (p === "google_calendar") return "Google Calendar";
                if (p === "microsoft") return "Microsoft";
                if (p === "zoom") return "Zoom";
                return p.charAt(0).toUpperCase() + p.slice(1);
            };

            const providerName = formatProviderName(provider);
            if (status === "success") {
                toast.success(`${providerName} connected successfully!`);
                if (agencyId) {
                    integrationsApi.getAvailableIntegrations(agencyId).then(setIntegrations).catch(console.error);
                }
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
    }, [searchParams, setSearchParams, toast, agencyId]);

    const handleConnect = async (provider: string, name: string) => {
        if (!["zoom", "microsoft"].includes(provider)) {
            toast.info(`${name} integration is coming soon!`);
            return;
        }

        if (!agencyId) {
            toast.error("No active agency selected.");
            return;
        }

        setActionLoading((prev) => ({ ...prev, [provider]: true }));
        try {
            let res: { auth_url: string };
            if (provider === "zoom") {
                res = await integrationsApi.getZoomAuthUrl(agencyId);
            } else if (provider === "microsoft") {
                res = await integrationsApi.getMicrosoftAuthUrl(agencyId);
            } else {
                res = await integrationsApi.getConnectAuthUrl(provider, agencyId);
            }

            if (res.auth_url) {
                window.location.href = res.auth_url;
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
        if (!["zoom", "microsoft"].includes(provider)) {
            toast.info(`Disconnecting ${name} is not supported yet.`);
            return;
        }

        if (!agencyId) {
            toast.error("No active agency selected.");
            return;
        }

        setActionLoading((prev) => ({ ...prev, [provider]: true }));
        try {
            let res;
            if (provider === "zoom") {
                res = await integrationsApi.disconnectZoom(agencyId);
            } else if (provider === "microsoft") {
                res = await integrationsApi.disconnectMicrosoft(agencyId);
            } else {
                res = await integrationsApi.disconnectProvider(provider, agencyId);
            }

            toast.success(res?.message || `${name} disconnected successfully!`);
            
            // Refresh list
            const updated = await integrationsApi.getAvailableIntegrations(agencyId);
            setIntegrations(updated);
        } catch (error: any) {
            console.error(`Failed to disconnect ${name}:`, error);
            const detail = error.response?.data?.detail || error.response?.data?.error || `Failed to disconnect ${name}.`;
            toast.error(detail);
        } finally {
            setActionLoading((prev) => ({ ...prev, [provider]: false }));
        }
    };

    const getIcon = (provider: string, isConnected: boolean) => {
        switch (provider) {
            case "zoom":
                return <ZoomIcon className="w-8 h-8 shrink-0" isConnected={isConnected} />;
            case "microsoft":
            case "outlook":
                return <MicrosoftIcon className="w-8 h-8 shrink-0" isConnected={isConnected} />;
            case "google_calendar":
                return <GoogleCalendarIcon className="w-8 h-8 shrink-0" isConnected={isConnected} />;
            default:
                return <Zap className={`w-8 h-8 shrink-0 ${isConnected ? "text-primary" : "text-slate-400"}`} />;
        }
    };

    const getDescription = (integration: Integration) => {
        if (!integration.is_connected) {
            if (integration.provider === "google_calendar") {
                return "Sync meetings and schedules with Google Calendar";
            }
            if (integration.provider === "microsoft") {
                return "Sync Outlook emails, calendars, and Microsoft Graph";
            }
            if (integration.provider === "zoom") {
                return "Create and manage Zoom video interview links";
            }
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
        return "Connected and active";
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
            <div className="flex items-center justify-between">
                <div>
                    <Typography variant="h4" className="font-bold text-text-main">
                        Connected Integrations
                    </Typography>
                    <Typography variant="body2" className="text-muted-text">
                        Connect and manage your third-party communication and calendar accounts
                    </Typography>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2.5 text-xs text-slate-600 gap-1.5"
                    onClick={fetchIntegrations}
                    loading={isLoading}
                    prefixIcon={RefreshCw}
                >
                    Refresh
                </Button>
            </div>

            <div className="space-y-4">
                {integrations.map((integration) => (
                    <div
                        key={integration.provider}
                        className="flex items-center justify-between p-4 border border-btn-sec-border rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex items-center gap-3.5">
                            {getIcon(integration.provider, integration.is_connected)}
                            <div>
                                <div className="flex items-center gap-2">
                                    <Typography variant="body1" className="font-semibold text-text-main text-sm">
                                        {integration.name}
                                    </Typography>
                                    {integration.is_connected && (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    )}
                                </div>
                                <Typography variant="body2" className="text-xs text-muted-text mt-0.5">
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
                                    <Eye className="w-4 h-4 shrink-0" />
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
                                    className="text-xs py-1 px-2.5 h-8 gap-1"
                                    onClick={() => handleConnect(integration.provider, integration.name)}
                                    loading={actionLoading[integration.provider]}
                                >
                                    <span>Connect</span>
                                    {["zoom", "microsoft"].includes(integration.provider) && (
                                        <ExternalLink className="w-3 h-3 text-slate-400" />
                                    )}
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
                        <div className="flex items-center gap-3 pr-8">
                            {getIcon(selectedIntegration.provider, true)}
                            <div className="flex flex-col gap-0.5">
                                <Typography variant="h4" className="text-lg font-bold text-text-main leading-tight">
                                    {selectedIntegration.name} Integration Details
                                </Typography>
                                <Typography variant="body2" className="text-muted-text text-xs">
                                    Stored attributes and connection status from provider
                                </Typography>
                            </div>
                        </div>

                        {/* Details content */}
                        <div className="space-y-4 py-2 border-t border-b border-slate-100 max-h-[400px] overflow-y-auto pr-1">
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
                                    <Typography variant="body2" className="text-text-main text-xs font-medium">
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
                            {selectedIntegration.metadata && Object.keys(selectedIntegration.metadata).length > 0 ? (
                                <div className="space-y-2 pt-2 border-t border-slate-100">
                                    <Typography variant="body2" className="font-semibold text-text-main text-xs uppercase tracking-wider text-muted-text">
                                        Account Metadata
                                    </Typography>
                                    <div className="grid grid-cols-1 gap-2.5 bg-slate-50/80 p-3.5 border border-slate-100 rounded-lg">
                                        {Object.entries(selectedIntegration.metadata).map(([key, val]) => (
                                            <div key={key} className="flex flex-col gap-0.5">
                                                <label className="text-[10px] font-bold text-muted-text uppercase tracking-wider">
                                                    {formatKey(key)}
                                                </label>
                                                <Typography variant="body2" className="text-text-main text-xs font-medium break-all">
                                                    {typeof val === "object" ? JSON.stringify(val, null, 2) : String(val)}
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-muted-text">
                                    <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
                                    <span>No additional metadata stored for this integration.</span>
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
