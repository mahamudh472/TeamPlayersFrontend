import React from "react";
import { Typography, ChartWrapper } from "../../../components/ui";
import { TrendingUp, Users, Calendar, Award, Hourglass } from "lucide-react";
import {
    CartesianGrid,
    BarChart,
    Bar,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

export const AnalyticsOverview: React.FC = () => {
    const statCards = [
        {
            title: "Placement Rate",
            value: "84.6%",
            desc: "Successful match ratio",
            icon: Award,
            iconColor: "text-green-500",
        },
        {
            title: "Avg. Days to Fill",
            value: "22 Days",
            desc: "From posting to offer",
            icon: Hourglass,
            iconColor: "text-blue-500",
        },
        {
            title: "Active Pipelines",
            value: "18 Active",
            desc: "In-progress job roles",
            icon: Calendar,
            iconColor: "text-purple-500",
        },
        {
            title: "Interviews Booked",
            value: "42 Total",
            desc: "Conducted this month",
            icon: Users,
            iconColor: "text-primary",
        },
    ];

    const chartData = [
        { name: "Jan", placements: 3, goal: 4 },
        { name: "Feb", placements: 5, goal: 4 },
        { name: "Mar", placements: 4, goal: 5 },
        { name: "Apr", placements: 7, goal: 6 },
        { name: "May", placements: 6, goal: 6 },
        { name: "Jun", placements: 8, goal: 7 },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <div key={idx} className="bg-white rounded-xl border border-btn-sec-border p-6 flex flex-col gap-4 shadow-xs">
                            <div className="flex items-center justify-between">
                                <Typography variant="body2" className="text-sm font-semibold text-muted-text">
                                    {card.title}
                                </Typography>
                                <Icon className={`w-5 h-5 ${card.iconColor}`} />
                            </div>
                            <div>
                                <Typography variant="h2" className="text-2xl font-bold text-text-main">
                                    {card.value}
                                </Typography>
                                <Typography variant="caption" className="text-xs text-muted-text mt-1 block">
                                    {card.desc}
                                </Typography>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Performance Chart */}
            <ChartWrapper
                title="Placements Trend"
                subtitle="Monthly placements compared to target goals"
                value="33 Placements"
                valuelabel="Total placements (H1)"
                badge={{
                    icon: TrendingUp,
                    text: "+15% vs Goal",
                }}
            >
                <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 15,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis
                                dataKey="name"
                                stroke="#78879a"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                            />
                            <YAxis
                                stroke="#78879a"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                dx={-5}
                                domain={[0, 10]}
                                ticks={[0, 2, 4, 6, 8, 10]}
                            />
                            <Tooltip
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
                                dataKey="placements"
                                fill="var(--color-primary, #14b8a6)"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={30}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </ChartWrapper>
        </div>
    );
};
