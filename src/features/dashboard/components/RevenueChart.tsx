import React from "react";
import { ChartWrapper } from "../../../components/ui";
import { TrendingUp } from "lucide-react";
import {
    CartesianGrid,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";
import { RevenueOverview } from "../types";

interface RevenueChartProps {
    data?: RevenueOverview;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
    // Map monthly data to recharts expected format
    const chartData = data?.monthly_data.map(item => ({
        name: item.month,
        revenue: item.revenue
    })) || [];

    const currencySymbol = data?.currency_symbol || "£";
    const totalRevenueYtd = data?.total_revenue_ytd || 0;
    const trendYtd = data?.trend_ytd || "0%";

    // Dynamically calculate domain and ticks based on max revenue
    const maxRevenue = chartData.length > 0 ? Math.max(...chartData.map(d => d.revenue)) : 10000;
    // Round up maxRevenue to nice increments
    const upperLimit = Math.max(10000, Math.ceil(maxRevenue / 10000) * 10000);
    const tickStep = upperLimit / 4;
    const ticks = [0, tickStep, tickStep * 2, tickStep * 3, upperLimit];

    return (
        <ChartWrapper
            title="Revenue Overview"
            subtitle="Monthly revenue from placements"
            value={`${currencySymbol}${totalRevenueYtd.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`}
            valuelabel="Total revenue (YTD)"
            badge={{
                icon: TrendingUp,
                text: `${trendYtd} YTD`,
            }}
        >
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 15,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f1f5f9"
                        />
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
                            domain={[0, upperLimit]}
                            ticks={ticks}
                            tickFormatter={(value) => `${currencySymbol}${value.toLocaleString()}`}
                        />
                        <Tooltip
                            formatter={(value: any) => [`${currencySymbol}${value.toLocaleString()}`, "Revenue"]}
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
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#14b8a6"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                stroke: "#14b8a6",
                                strokeWidth: 2,
                                fill: "#14b8a6",
                            }}
                            activeDot={{
                                r: 6,
                                stroke: "#14b8a6",
                                strokeWidth: 2,
                                fill: "#ffffff",
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </ChartWrapper>
    );
};
