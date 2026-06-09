import React from "react";
import { Typography } from "../../../components/ui";

export const AnalyticsClients: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-2 shadow-xs">
                    <Typography variant="body2" className="text-sm font-semibold text-muted-text">
                        Total Clients
                    </Typography>
                    <Typography variant="h2" className="text-2xl font-bold text-text-main mt-1">
                        3
                    </Typography>
                </div>
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-2 shadow-xs">
                    <Typography variant="body2" className="text-sm font-semibold text-muted-text">
                        Avg. Jobs per Client
                    </Typography>
                    <Typography variant="h2" className="text-2xl font-bold text-text-main mt-1">
                        11.7
                    </Typography>
                </div>
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-2 shadow-xs">
                    <Typography variant="body2" className="text-sm font-semibold text-muted-text">
                        Client Retention
                    </Typography>
                    <Typography variant="h2" className="text-2xl font-bold text-green-500 mt-1">
                        94%
                    </Typography>
                </div>
            </div>

            {/* Top Clients Card */}
            <div className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-6">
                <div>
                    <Typography variant="h4" className="font-bold text-text-main">
                        Top Clients by Revenue
                    </Typography>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-sm shrink-0">
                            #1
                        </div>
                        <div className="flex-1">
                            <Typography variant="body1" className="font-semibold text-text-main">
                                Manufacturing United
                            </Typography>
                            <Typography variant="body2" className="text-xs text-muted-text">
                                11 placements
                            </Typography>
                        </div>
                        <div className="text-right">
                            <Typography variant="body1" className="font-bold text-green-500">
                                £165,000
                            </Typography>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-sm shrink-0">
                            #2
                        </div>
                        <div className="flex-1">
                            <Typography variant="body1" className="font-semibold text-text-main">
                                GlobalTech Industries
                            </Typography>
                            <Typography variant="body2" className="text-xs text-muted-text">
                                8 placements
                            </Typography>
                        </div>
                        <div className="text-right">
                            <Typography variant="body1" className="font-bold text-green-500">
                                £125,000
                            </Typography>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-sm shrink-0">
                            #3
                        </div>
                        <div className="flex-1">
                            <Typography variant="body1" className="font-semibold text-text-main">
                                RetailPro Group
                            </Typography>
                            <Typography variant="body2" className="text-xs text-muted-text">
                                5 placements
                            </Typography>
                        </div>
                        <div className="text-right">
                            <Typography variant="body1" className="font-bold text-green-500">
                                £75,000
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
