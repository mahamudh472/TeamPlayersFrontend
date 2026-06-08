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

export const ActivePositionsChart: React.FC = () => {
    const barData = [
        { name: "Jan", y: 4000 },
        { name: "Feb", y: 3000 },
        { name: "Mar", y: 2000 },
        { name: "Apr", y: 2780 },
        { name: "May", y: 1890 },
        { name: "Jun", y: 2390 },
    ];

    return (
        <ChartWrapper
            title="Active Positions"
            subtitle="Monthly recruitment pipeline load"
            value="12"
            valuelabel="Open Jobs"
            badge={{
                icon: TrendingUp,
                text: "+15% MoM",
            }}
        >
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={barData}
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
    );
};
