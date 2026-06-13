import { LucideIcon } from "lucide-react";

export interface AnalyticsStatCard {
    title: string;
    value: string;
    desc: string;
    icon: LucideIcon;
    iconColor: string;
}

export interface LineDataPoint {
    name: string;
    uv?: number;
}

export interface PieDataPoint {
    name: string;
    value: number;
}

export interface IndustryDataPoint {
    name: string;
    placements: number;
}

export interface RecruiterPerformanceItem {
    name: string;
    initial: string;
    placementsCount: number;
    activeJobsCount: number;
    revenue: string;
}
