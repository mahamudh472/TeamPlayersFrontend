import React from "react";
import { Typography, ChartWrapper } from "../../../components/ui";
import { Users, Calendar, Award, Hourglass } from "lucide-react";
import {
    CartesianGrid,
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Sector,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
    PieLabelRenderProps,
    PieSectorShapeProps,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

const RADIAN = Math.PI / 180;
const COLORS = ["#14b8a6", "#1e293b", "#64748b", "#0ea5e9"];

const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, name, value, index }: PieLabelRenderProps) => {
    if (cx == null || cy == null || outerRadius == null) {
        return null;
    }
    const radius = Number(outerRadius) + 20;
    const ncx = Number(cx);
    const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const ncy = Number(cy);
    const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
    const color = COLORS[(index ?? 0) % COLORS.length];

    return (
        <text
            x={x}
            y={y}
            fill={color}
            textAnchor={x > ncx ? "start" : "end"}
            dominantBaseline="central"
            className="text-xs font-semibold font-mono"
        >
            {`${name}: ${value}`}
        </text>
    );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
    return <Sector {...props} fill={COLORS[(props.index ?? 0) % COLORS.length]} />;
};

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

    const lineData = [
        { name: "Jan", uv: 24000 },
        { name: "Feb", uv: 43000 },
        { name: "Mar", uv: 82000 },
        { name: "Apr" },
        { name: "May", uv: 120890 },
        { name: "Jun", uv: 132390 },
    ];

    const pieData = [
        { name: "Applications", value: 40 },
        { name: "Shortlisted", value: 20 },
        { name: "Interview", value: 5 },
        { name: "Placed", value: 10 },
    ];

    const industryData = [
        { name: "Technology", placements: 8 },
        { name: "Finance", placements: 5 },
        { name: "Healthcare", placements: 3 },
        { name: "Retail", placements: 4 },
        { name: "Manufacturing", placements: 6 },
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

            {/* Two half-width charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Line Chart */}
                <ChartWrapper
                    title="Revenue & Placements Trend"
                    subtitle="Monthly performance overview"
                    chartBottom={["Revenue (£)", "Placements"]}
                >
                    <div className="w-full h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={lineData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                                <XAxis dataKey="name" stroke="var(--color-text-3)" />
                                <YAxis stroke="var(--color-text-3)" domain={[0, 140000]} ticks={[0, 35000, 70000, 105000, 140000]} />
                                <Tooltip
                                    cursor={{ stroke: "var(--color-border-2)" }}
                                    contentStyle={{ backgroundColor: "var(--color-surface-base)", borderColor: "var(--color-border-2)" }}
                                />
                                <Line
                                    connectNulls
                                    type="monotone"
                                    dataKey="uv"
                                    stroke="var(--color-chart-1)"
                                    fill="var(--color-chart-1)"
                                    activeDot={{
                                        stroke: "var(--color-surface-base)",
                                    }}
                                />
                                <RechartsDevtools />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </ChartWrapper>

                {/* Pie Chart */}
                <ChartWrapper
                    title="Pipeline Distribution"
                    subtitle="Candidate flow through stages"
                >
                    <div className="w-full h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <Pie
                                    data={pieData}
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    fill="#8884d8"
                                    dataKey="value"
                                    isAnimationActive={true}
                                    shape={MyCustomPie}
                                    outerRadius={80}
                                />
                                <RechartsDevtools />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </ChartWrapper>
            </div>

            {/* Full width Bar Chart */}
            <ChartWrapper
                title="Placements by Industry"
                subtitle="Distribution across sectors"
            >
                <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={industryData}
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
                                stroke="#000000"
                                fontSize={12}
                                tickLine={true}
                                axisLine={true}
                                dy={10}
                            />
                            <YAxis
                                stroke="#000000"
                                fontSize={12}
                                tickLine={true}
                                axisLine={true}
                                dx={-5}
                                domain={[0, 8]}
                                ticks={[0, 2, 4, 6, 8]}
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
                                stroke="#000000"
                                strokeWidth={2}
                                fill="#000000"
                                fillOpacity={1}
                                radius={[2, 2, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </ChartWrapper>
        </div>
    );
};
