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

export const RevenueChart: React.FC = () => {
    const data = [
        { name: "Jan", revenue: 10000 },
        { name: "Feb", revenue: 45000 },
        { name: "Mar", revenue: 35000 },
        { name: "Apr", revenue: 85000 },
        { name: "May", revenue: 70000 },
        { name: "Jun", revenue: 140000 },
    ];

    return (
        <ChartWrapper
            title="Revenue Overview"
            subtitle="Monthly revenue from placements"
            value="£365,000"
            valuelabel="Total revenue (YTD)"
            badge={{
                icon: TrendingUp,
                text: "+34% YTD",
            }}
        >
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
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
                            domain={[0, 140000]}
                            ticks={[0, 35000, 70000, 105000, 140000]}
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
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#000000"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                stroke: "#000000",
                                strokeWidth: 2,
                                fill: "#ffffff",
                            }}
                            activeDot={{
                                r: 6,
                                stroke: "#000000",
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
