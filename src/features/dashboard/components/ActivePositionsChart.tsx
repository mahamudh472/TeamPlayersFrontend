import React from "react";
import { ChartWrapper } from "../../../components/ui";
import { TrendingUp } from "lucide-react";
import {
    CartesianGrid,
    Bar,
    BarChart,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";
import { ActivePositions } from "../types";

interface ActivePositionsChartProps {
    data?: ActivePositions;
}

export const ActivePositionsChart: React.FC<ActivePositionsChartProps> = ({ data }) => {
    const chartData = data?.monthly_data.map(item => ({
        name: item.month,
        y: item.pipeline_load
    })) || [];

    const openJobsCount = data?.open_jobs_count ?? 0;
    const trend = data?.trend || "0%";

    return (
        <ChartWrapper
            title="Active Positions"
            subtitle="Monthly recruitment pipeline load"
            value={openJobsCount}
            valuelabel="Open Jobs"
            badge={{
                icon: TrendingUp,
                text: `${trend} MoM`,
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
                        />
                        <Tooltip
                            formatter={(value: any) => [value, "Pipeline Load"]}
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
                            dataKey="y"
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
    );
};
