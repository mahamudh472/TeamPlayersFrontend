import React from "react";
import { Typography } from "../../../components/ui";
import { Sparkles, BrainCircuit, Zap, Hourglass } from "lucide-react";

export const AnalyticsAIPerformance: React.FC = () => {
    const aiStats = [
        {
            title: "Resumes Processed",
            value: "1,420",
            desc: "Screened by AI parser",
            icon: BrainCircuit,
            color: "text-purple-500",
        },
        {
            title: "Hours Saved",
            value: "185 hrs",
            desc: "From manual CV reviews",
            icon: Hourglass,
            color: "text-blue-500",
        },
        {
            title: "Matching Accuracy",
            value: "92%",
            desc: "Recruiter approval rate",
            icon: Sparkles,
            color: "text-yellow-500",
        },
        {
            title: "Automated Matches",
            value: "284",
            desc: "Recommended for shortlists",
            icon: Zap,
            color: "text-green-500",
        },
    ];

    const pipelineStages = [
        { stage: "Resume Parsing & Enrichment", accuracy: 98, duration: "1.2s avg" },
        { stage: "Semantic Match & Scoring", accuracy: 92, duration: "2.4s avg" },
        { stage: "Skill Gap & Fit Analysis", accuracy: 89, duration: "3.1s avg" },
        { stage: "Outreach & Engagement Bot", accuracy: 85, duration: "Automated" },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {aiStats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-4 shadow-xs">
                            <div className="flex items-center justify-between">
                                <Typography variant="body2" className="text-sm font-semibold text-muted-text">
                                    {stat.title}
                                </Typography>
                                <Icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <div>
                                <Typography variant="h2" className="text-2xl font-bold text-text-main">
                                    {stat.value}
                                </Typography>
                                <Typography variant="caption" className="text-xs text-muted-text mt-1 block">
                                    {stat.desc}
                                </Typography>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs">
                <div className="mb-6">
                    <Typography variant="h4" className="font-bold text-text-main">
                        AI Matching Models Reliability
                    </Typography>
                    <Typography variant="body2" className="text-muted-text mt-1">
                        Success rates and latency stats per automated matching sub-system
                    </Typography>
                </div>

                <div className="space-y-4">
                    {pipelineStages.map((stage, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-btn-sec-border rounded-xl bg-slate-50/20">
                            <div className="flex-1 min-w-0">
                                <Typography variant="body1" className="font-semibold text-text-main">
                                    {stage.stage}
                                </Typography>
                                <Typography variant="caption" className="text-muted-text">
                                    Average process time: {stage.duration}
                                </Typography>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <span className="text-sm font-bold text-primary">{stage.accuracy}% accuracy</span>
                                </div>
                                <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden shrink-0">
                                    <div
                                        className="bg-primary h-full rounded-full"
                                        style={{ width: `${stage.accuracy}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
