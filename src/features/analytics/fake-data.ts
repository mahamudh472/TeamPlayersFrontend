import { Users, Calendar, Award, Hourglass } from "lucide-react";
import { AnalyticsStatCard, LineDataPoint, PieDataPoint, IndustryDataPoint, RecruiterPerformanceItem } from "./types";

export const statCards: AnalyticsStatCard[] = [
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

export const lineData: LineDataPoint[] = [
    { name: "Jan", uv: 24000 },
    { name: "Feb", uv: 43000 },
    { name: "Mar", uv: 82000 },
    { name: "Apr" },
    { name: "May", uv: 120890 },
    { name: "Jun", uv: 132390 },
];

export const pieData: PieDataPoint[] = [
    { name: "Applications", value: 40 },
    { name: "Shortlisted", value: 20 },
    { name: "Interview", value: 5 },
    { name: "Placed", value: 10 },
];

export const industryData: IndustryDataPoint[] = [
    { name: "Technology", placements: 8 },
    { name: "Finance", placements: 5 },
    { name: "Healthcare", placements: 3 },
    { name: "Retail", placements: 4 },
    { name: "Manufacturing", placements: 6 },
];

export const recruiters: RecruiterPerformanceItem[] = [
    {
        name: "You",
        initial: "Y",
        placementsCount: 8,
        activeJobsCount: 4,
        revenue: "£125k",
    },
    {
        name: "Sarah Johnson",
        initial: "S",
        placementsCount: 6,
        activeJobsCount: 3,
        revenue: "£95k",
    },
    {
        name: "Michael Chen",
        initial: "M",
        placementsCount: 5,
        activeJobsCount: 3,
        revenue: "£78k",
    },
];
