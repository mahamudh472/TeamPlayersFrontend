import React from "react";
import { Typography } from "../../../components/ui";
import { Sparkles } from "lucide-react";

export const AnalyticsAIPerformance: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* AI Performance Metrics Card */}
            <div className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-6">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <div>
                        <Typography variant="h4" className="font-bold text-text-main">
                            AI Performance Metrics
                        </Typography>
                        <Typography variant="body2" className="text-muted-text mt-1">
                            How well is AI screening performing?
                        </Typography>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-2">
                            <Typography variant="body1" className="font-semibold text-text-main">
                                Screening Accuracy
                            </Typography>
                            <Typography variant="body2" className="text-sm font-bold text-primary">
                                94%
                            </Typography>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: "94%" }}></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <Typography variant="body1" className="font-semibold text-text-main">
                                Match Score Precision
                            </Typography>
                            <Typography variant="body2" className="text-sm font-bold text-primary">
                                91%
                            </Typography>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: "91%" }}></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <Typography variant="body1" className="font-semibold text-text-main">
                                Interview Success Rate
                            </Typography>
                            <Typography variant="body2" className="text-sm font-bold text-primary">
                                87%
                            </Typography>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: "87%" }}></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <Typography variant="body1" className="font-semibold text-text-main">
                                Placement Rate
                            </Typography>
                            <Typography variant="body2" className="text-sm font-bold text-primary">
                                85%
                            </Typography>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: "85%" }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid for Savings and Volume */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cost Savings Card */}
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-6">
                    <div>
                        <Typography variant="h4" className="font-bold text-text-main">
                            AI Cost Savings
                        </Typography>
                        <Typography variant="body2" className="text-muted-text mt-1">
                            Time saved through automation
                        </Typography>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <Typography variant="body2" className="text-xs text-muted-text">
                                Hours saved per month
                            </Typography>
                            <Typography variant="h2" className="text-3xl font-bold text-primary">
                                156 hours
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body2" className="text-xs text-muted-text">
                                Cost savings
                            </Typography>
                            <Typography variant="h2" className="text-3xl font-bold text-green-500">
                                £6,240
                            </Typography>
                        </div>
                    </div>
                </div>

                {/* Screening Volume Card */}
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-6">
                    <div>
                        <Typography variant="h4" className="font-bold text-text-main">
                            Screening Volume
                        </Typography>
                        <Typography variant="body2" className="text-muted-text mt-1">
                            AI processed applications
                        </Typography>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <Typography variant="body2" className="text-xs text-muted-text">
                                This month
                            </Typography>
                            <Typography variant="h2" className="text-3xl font-bold text-text-main">
                                4 candidates
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body2" className="text-xs text-muted-text">
                                Avg. processing time
                            </Typography>
                            <Typography variant="h2" className="text-3xl font-bold text-text-main">
                                2.3 mins
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
