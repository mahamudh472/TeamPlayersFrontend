import React from "react";
import { Typography, ChartWrapper } from "../../../components/ui";
import {
    CartesianGrid,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { AnalyticsCandidatesData } from "../types";

interface AnalyticsCandidatesProps {
    candidates?: AnalyticsCandidatesData;
}

export const AnalyticsCandidates: React.FC<AnalyticsCandidatesProps> = ({ candidates }) => {
    const totalApps = candidates?.total_applications ?? 0;
    const topSkillMatch = candidates?.top_skill_match || "None";
    const primaryExpBracket = candidates?.primary_experience_bracket || "None";

    // Experience Distribution chart data
    const expData = candidates?.experience_distribution.map(item => ({
        name: item.level,
        count: item.count,
    })) || [];

    const maxExpCount = expData.length > 0 ? Math.max(...expData.map(d => d.count)) : 10;
    const yAxisUpperLimit = Math.max(5, Math.ceil(maxExpCount / 5) * 5);
    const tickStep = yAxisUpperLimit / 5;
    const ticks = [0, tickStep, tickStep * 2, tickStep * 3, tickStep * 4, yAxisUpperLimit];

    // Skills list progress bar calculations
    const skillsList = candidates?.top_skills || [];
    const maxSkillCount = skillsList.length > 0 ? Math.max(...skillsList.map(s => s.count)) : 1;

    return (
        <div className="space-y-6 text-left">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-2 shadow-xs">
                    <Typography variant="body2" className="text-sm font-semibold text-muted-text">
                        Total Applications
                    </Typography>
                    <Typography variant="h2" className="text-2xl font-bold text-text-main mt-1">
                        {totalApps}
                    </Typography>
                </div>
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-2 shadow-xs">
                    <Typography variant="body2" className="text-sm font-semibold text-muted-text">
                        Top Skill Match
                    </Typography>
                    <Typography variant="h2" className="text-2xl font-bold text-text-main mt-1">
                        {topSkillMatch}
                    </Typography>
                </div>
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-2 shadow-xs">
                    <Typography variant="body2" className="text-sm font-semibold text-muted-text">
                        Primary Experience Bracket
                    </Typography>
                    <Typography variant="h2" className="text-2xl font-bold text-text-main mt-1">
                        {primaryExpBracket}
                    </Typography>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Experience levels chart */}
                <ChartWrapper
                    title="Experience Level Distribution"
                    subtitle="Applicants grouped by years of experience"
                >
                    <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={expData}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#000000"
                                    fontSize={12}
                                    tickLine={true}
                                    axisLine={true}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#14b8a6"
                                    fontSize={12}
                                    tickLine={true}
                                    axisLine={true}
                                    dx={-5}
                                    domain={[0, yAxisUpperLimit]}
                                    ticks={ticks}
                                />
                                <Tooltip
                                    formatter={(value: any) => [value, "Candidates"]}
                                    contentStyle={{
                                        backgroundColor: "#ffffff",
                                        borderColor: "#e2e8f0",
                                        borderRadius: "8px",
                                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                                    }}
                                    labelStyle={{
                                        fontWeight: "bold",
                                        color: "#1e293b",
                                    }}
                                />
                                <Bar
                                    dataKey="count"
                                    stroke="#14b8a6"
                                    strokeWidth={2}
                                    fill="#14b8a6"
                                    fillOpacity={1}
                                    radius={[2, 2, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartWrapper>

                {/* Top Skills density list */}
                <div className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-6">
                    <div>
                        <Typography variant="h4" className="font-bold text-text-main">
                            Top Skills In Candidate Pool
                        </Typography>
                        <Typography variant="body2" className="text-muted-text mt-1">
                            Frequency of technical skills in applicant profiles
                        </Typography>
                    </div>

                    <div className="space-y-4 pr-1 max-h-[300px] overflow-y-auto">
                        {skillsList.length === 0 ? (
                            <div className="text-center py-8 text-muted-text text-sm">
                                No skills data available.
                            </div>
                        ) : (
                            skillsList.map((skillItem) => {
                                const percentage = maxSkillCount > 0 ? (skillItem.count / maxSkillCount) * 100 : 0;
                                return (
                                    <div key={skillItem.skill}>
                                        <div className="flex justify-between mb-2">
                                            <Typography variant="body1" className="font-semibold text-text-main">
                                                {skillItem.skill}
                                            </Typography>
                                            <Typography variant="body2" className="text-sm font-bold text-primary">
                                                {skillItem.count} candidates
                                            </Typography>
                                        </div>
                                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                            <div
                                                className="bg-primary h-full rounded-full transition-all duration-500"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
