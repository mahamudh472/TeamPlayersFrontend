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

export interface OverviewRevenuePlacement {
    month: string;
    revenue: number;
    placements: number;
}

export interface PipelineDistribution {
    new: number;
    shortlisted: number;
    interviewing: number;
    offered: number;
    accepted: number;
    rejected: number;
}

export interface IndustryPlacement {
    industry: string;
    count: number;
}

export interface AnalyticsOverviewData {
    placement_rate: number;
    avg_days_to_fill: number;
    active_pipelines: number;
    interviews_booked: number;
    revenue_placements_trend: OverviewRevenuePlacement[];
    pipeline_distribution: PipelineDistribution;
    placements_by_industry: IndustryPlacement[];
    currency_symbol: string;
}

export interface AnalyticsClientData {
    id: number;
    company: string;
    industry: string;
    active_jobs: number;
    placements_count: number;
    revenue: number;
    success_rate: number;
}

export interface AnalyticsClientsResponse {
    total_clients: number;
    avg_jobs_per_client: number;
    avg_client_success_rate: number;
    top_clients: AnalyticsClientData[];
}

export interface ExperienceDistributionItem {
    level: string;
    count: number;
}

export interface SkillItem {
    skill: string;
    count: number;
}

export interface AnalyticsCandidatesData {
    total_applications: number;
    top_skill_match: string;
    primary_experience_bracket: string;
    experience_distribution: ExperienceDistributionItem[];
    top_skills: SkillItem[];
}

export interface AnalyticsRecruiterData {
    id: number;
    name: string;
    role: string;
    placements_count: number;
    interviews_count: number;
}

export interface AnalyticsAIPerformanceData {
    avg_overall_match_score: number;
    avg_placed_match_score: number;
    avg_rejected_match_score: number;
}

export interface AnalyticsResponse {
    overview: AnalyticsOverviewData;
    clients: AnalyticsClientsResponse;
    candidates: AnalyticsCandidatesData;
    recruiters: AnalyticsRecruiterData[];
    ai_performance: AnalyticsAIPerformanceData;
}


