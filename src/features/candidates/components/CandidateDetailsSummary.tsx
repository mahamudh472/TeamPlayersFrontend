import React from "react";
import { Typography } from "../../../components/ui";
import { Sparkles, CheckCircle, AlertTriangle } from "lucide-react";

import { CandidateDetailsSummaryProps } from "../types";

export const CandidateDetailsSummary: React.FC<CandidateDetailsSummaryProps> = ({
    matchScore,
    summaryText,
    strengths,
    concerns,
}) => {
    return (
        <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6">
            <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                <Typography variant="h4" className="font-bold text-text-main leading-none">
                    AI Screening Summary
                </Typography>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm text-text-main">Match Score</span>
                        <span className="text-2xl font-bold text-accent">{matchScore}%</span>
                    </div>
                    <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-2">
                        <div
                            className="bg-primary h-full rounded-full transition-all"
                            style={{ width: `${matchScore}%` }}
                        />
                    </div>
                </div>

                <div className="p-4 bg-accent/5 rounded-xl border border-accent/10">
                    <p className="text-sm text-text-main">{summaryText}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-text-main mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Key Strengths
                    </h3>
                    <ul className="space-y-1">
                        {strengths.map((str, idx) => (
                            <li key={idx} className="text-sm text-muted-text flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">•</span>
                                {str}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-text-main mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        Potential Concerns
                    </h3>
                    <ul className="space-y-1">
                        {concerns.map((con, idx) => (
                            <li key={idx} className="text-sm text-muted-text flex items-start gap-2">
                                <span className="text-yellow-500 mt-0.5">•</span>
                                {con}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
