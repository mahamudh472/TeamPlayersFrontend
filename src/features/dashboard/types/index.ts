import React from "react";

export interface SidebarLinkProps {
    to: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
}

export interface FunnelStep {
    label: string;
    value: number;
}

export interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    type: "job" | "candidate" | "placement";
}

export interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface SearchResult {
    id: string;
    label: string;
    type: "candidate" | "job" | "client" | "lead";
    subtitle: string;
}

export interface AIAssistantProps {
    state: "maximized" | "minimized" | "closed";
    onChangeState: (newState: "maximized" | "minimized" | "closed") => void;
}

export interface RecommendationCardProps {
    type: "alert" | "trend" | "check";
    title: string;
    description: string;
    actionText: string;
    actionLink: string;
}

export interface CandidateCardProps {
    name: string;
    role: string;
    matchScore: number;
    link: string;
}

export interface FollowUpCardProps {
    name: string;
    status: string;
    link: string;
}

export interface DashboardStatItem {
    value: number;
    trend: string;
}

export interface RevenueOverview {
    total_revenue_ytd: number;
    currency_symbol: string;
    trend_ytd: string;
    monthly_data: { month: string; revenue: number }[];
}

export interface ActivePositions {
    open_jobs_count: number;
    trend: string;
    monthly_data: { month: string; pipeline_load: number }[];
}

export interface UpcomingInterview {
    id: number;
    candidate_name: string;
    job_title: string;
    meeting_time: string;
    formatted_meeting_time: string;
}

export interface HotCandidate {
    id: number;
    name: string;
    job_title: string;
    match_percentage: number;
}

export interface PipelineHealthData {
    applications: number;
    shortlisted: number;
    interview_stage: number;
    placed: number;
}

export interface DashboardResponse {
    active_jobs: DashboardStatItem;
    total_candidates: DashboardStatItem;
    active_clients: DashboardStatItem;
    placements_mtd: DashboardStatItem;
    revenue_overview: RevenueOverview;
    active_positions: ActivePositions;
    upcoming_interviews: UpcomingInterview[];
    hot_candidates: HotCandidate[];
    pipeline_health: PipelineHealthData;
}

