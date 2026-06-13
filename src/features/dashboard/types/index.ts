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
