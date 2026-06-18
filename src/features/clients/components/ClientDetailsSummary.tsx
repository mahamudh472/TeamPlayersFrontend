import React from "react";
import { Typography } from "../../../components/ui";
import { Sparkles, CheckCircle, AlertTriangle } from "lucide-react";

interface ClientDetailsSummaryProps {
    relationshipSummary: string;
    strengths: string[];
    concerns: string[];
}

export const ClientDetailsSummary: React.FC<ClientDetailsSummaryProps> = ({
    relationshipSummary,
    strengths,
    concerns,
}) => {
    return (
        <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border p-6 text-left">
            <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                <Typography variant="h4" className="font-bold text-text-main leading-none">
                    AI Account Summary
                </Typography>
            </div>

            <div className="space-y-4">
                <div className="p-4 bg-accent/5 rounded-xl border border-accent/10">
                    <p className="text-sm text-text-main leading-relaxed">{relationshipSummary}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-text-main mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Collaboration Strengths
                    </h3>
                    {!strengths || strengths.length === 0 ? (
                        <p className="text-sm text-muted-text pl-6 italic">No collaboration strengths recorded.</p>
                    ) : (
                        <ul className="space-y-1">
                            {strengths.map((str, idx) => (
                                <li key={idx} className="text-sm text-muted-text flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">•</span>
                                    {str}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div>
                    <h3 className="font-semibold text-text-main mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        Partnership Risks & Bottlenecks
                    </h3>
                    {!concerns || concerns.length === 0 ? (
                        <p className="text-sm text-muted-text pl-6 italic">No relationship risks or bottlenecks identified.</p>
                    ) : (
                        <ul className="space-y-1">
                            {concerns.map((con, idx) => (
                                <li key={idx} className="text-sm text-muted-text flex items-start gap-2">
                                    <span className="text-yellow-500 mt-0.5">•</span>
                                    {con}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};
