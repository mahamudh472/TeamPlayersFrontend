import React from "react";
import { Typography, AppBadge, Button } from "../../../components/ui";
import { Mail, Calendar, Zap } from "lucide-react";

export const IntegrationsSettings: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs space-y-6">
            <div>
                <Typography variant="h4" className="font-bold text-text-main">
                    Connected Integrations
                </Typography>
                <Typography variant="body2" className="text-muted-text">
                    Manage your third-party connections
                </Typography>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-btn-sec-border rounded-lg bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <Mail className="w-8 h-8 text-primary shrink-0" />
                        <div>
                            <Typography variant="body1" className="font-semibold text-text-main text-sm">
                                Email Integration
                            </Typography>
                            <Typography variant="body2" className="text-xs text-muted-text">
                                Gmail connected
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <AppBadge variant="primary">Connected</AppBadge>
                        <Button variant="outline" className="text-xs py-1 px-2.5 h-8">
                            Configure
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-btn-sec-border rounded-lg bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-primary shrink-0" />
                        <div>
                            <Typography variant="body1" className="font-semibold text-text-main text-sm">
                                Calendar Sync
                            </Typography>
                            <Typography variant="body2" className="text-xs text-muted-text">
                                Google Calendar
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <AppBadge variant="primary">Connected</AppBadge>
                        <Button variant="outline" className="text-xs py-1 px-2.5 h-8">
                            Configure
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-btn-sec-border rounded-lg bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <Zap className="w-8 h-8 text-light-text shrink-0" />
                        <div>
                            <Typography variant="body1" className="font-semibold text-text-main text-sm">
                                WhatsApp Business
                            </Typography>
                            <Typography variant="body2" className="text-xs text-muted-text">
                                Not connected
                            </Typography>
                        </div>
                    </div>
                    <Button variant="outline" className="text-xs py-1 px-2.5 h-8">
                        Connect
                    </Button>
                </div>
            </div>
        </div>
    );
};
