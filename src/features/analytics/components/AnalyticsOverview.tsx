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
import { AnalyticsOverviewData } from "../types";

const RADIAN = Math.PI / 180;
const COLORS = ["#14b8a6", "#1e293b", "#64748b", "#0ea5e9", "#10b981", "#ef4444"];

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

interface AnalyticsOverviewProps {
    data?: AnalyticsOverviewData;
}

export const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ data }) => {
    const currencySymbol = data?.currency_symbol || "£";

    const statCards = [
        {
            title: "Placement Rate",
            value: data ? `${data.placement_rate}%` : "0%",
            desc: "Successful match ratio",
            icon: Award,
            iconColor: "text-green-500",
        },
        {
            title: "Avg. Days to Fill",
            value: data ? `${data.avg_days_to_fill} Days` : "0 Days",
            desc: "From posting to offer",
            icon: Hourglass,
            iconColor: "text-blue-500",
        },
        {
            title: "Active Pipelines",
            value: data ? `${data.active_pipelines} Active` : "0 Active",
            desc: "In-progress job roles",
            icon: Calendar,
            iconColor: "text-purple-500",
        },
        {
            title: "Interviews Booked",
            value: data ? `${data.interviews_booked} Total` : "0 Total",
            desc: "Conducted in selected range",
            icon: Users,
            iconColor: "text-primary",
        },
    ];

    // Map line data
    const lineChartData = data?.revenue_placements_trend || [];
    const maxRevenue = lineChartData.length > 0 ? Math.max(...lineChartData.map(d => d.revenue)) : 10000;
    const revenueUpperLimit = Math.max(10000, Math.ceil(maxRevenue / 10000) * 10000);
    const revenueStep = revenueUpperLimit / 4;
    const revenueTicks = [0, revenueStep, revenueStep * 2, revenueStep * 3, revenueUpperLimit];

    // Map pie data
    const pieChartData = data ? [
        { name: "New", value: data.pipeline_distribution.new },
        { name: "Shortlisted", value: data.pipeline_distribution.shortlisted },
        { name: "Interviewing", value: data.pipeline_distribution.interviewing },
        { name: "Offered", value: data.pipeline_distribution.offered },
        { name: "Accepted", value: data.pipeline_distribution.accepted },
        { name: "Rejected", value: data.pipeline_distribution.rejected },
    ].filter(item => item.value > 0) : [];

    // Map bar data
    const barChartData = data?.placements_by_industry.map(item => ({
        name: item.industry,
        placements: item.count
    })) || [];

    const maxPlacements = barChartData.length > 0 ? Math.max(...barChartData.map(d => d.placements)) : 8;
    const placementsUpperLimit = Math.max(4, Math.ceil(maxPlacements / 2) * 2);
    const placementsStep = placementsUpperLimit / 4;
    const placementsTicks = [0, placementsStep, placementsStep * 2, placementsStep * 3, placementsUpperLimit];

    return (
        <div className="space-y-6 text-left">
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
                {/* Dual Axis Line Chart */}
                <ChartWrapper
                    title="Revenue & Placements Trend"
                    subtitle="Monthly performance overview"
                    chartBottom={[`Revenue (${currencySymbol})`, "Placements"]}
                >
                    <div className="w-full h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={lineChartData}
                                margin={{
                                    top: 10,
                                    right: 5,
                                    left: 5,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                                <XAxis dataKey="month" stroke="var(--color-text-3)" />
                                <YAxis 
                                    yAxisId="left" 
                                    stroke="#14b8a6" 
                                    domain={[0, revenueUpperLimit]} 
                                    ticks={revenueTicks}
                                    tickFormatter={(val) => `${currencySymbol}${val.toLocaleString()}`}
                                />
                                <YAxis 
                                    yAxisId="right" 
                                    orientation="right" 
                                    stroke="#0ea5e9"
                                    tickFormatter={(val) => Math.round(val).toString()}
                                />
                                <Tooltip
                                    cursor={{ stroke: "var(--color-border-2)" }}
                                    contentStyle={{ backgroundColor: "var(--color-surface-base)", borderColor: "var(--color-border-2)" }}
                                    formatter={(value: any, name: string) => {
                                        if (name === "Revenue") {
                                            return [`${currencySymbol}${value.toLocaleString()}`, name];
                                        }
                                        return [value, name];
                                    }}
                                />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="revenue"
                                    name="Revenue"
                                    stroke="#14b8a6"
                                    strokeWidth={3}
                                    dot={{ r: 4, stroke: "#14b8a6", strokeWidth: 2, fill: "#14b8a6" }}
                                    activeDot={{ r: 6, stroke: "#14b8a6", strokeWidth: 2, fill: "#ffffff" }}
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="placements"
                                    name="Placements"
                                    stroke="#0ea5e9"
                                    strokeWidth={2}
                                    dot={{ r: 4, stroke: "#0ea5e9", strokeWidth: 2, fill: "#0ea5e9" }}
                                    activeDot={{ r: 6, stroke: "#0ea5e9", strokeWidth: 2, fill: "#ffffff" }}
                                />
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
                                    data={pieChartData}
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
                            data={barChartData}
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
                                stroke="#14b8a6"
                                fontSize={12}
                                tickLine={true}
                                axisLine={true}
                                dx={-5}
                                domain={[0, placementsUpperLimit]}
                                ticks={placementsTicks}
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
        </div>
    );
};
