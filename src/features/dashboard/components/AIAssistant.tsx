import React from "react";
import { Link } from "react-router";
import {
    Sparkles,
    Minimize2,
    Maximize2,
    X,
    AlertCircle,
    TrendingUp,
    CheckCircle2,
    Users,
    ChevronRight,
    Bell,
    ArrowRight,
} from "lucide-react";
import { Button } from "../../../components/ui";

const RECOMMENDATIONS = [
    {
        id: "rec-1",
        type: "alert" as const,
        title: "High-match candidate needs follow-up",
        description: "Sarah Johnson (92% match) has been shortlisted for 3 days",
        actionText: "Schedule Interview",
        actionLink: "/dashboard/candidates/1?schedule=true",
    },
    {
        id: "rec-2",
        type: "trend" as const,
        title: "New high-value lead detected",
        description: "TechCorp Ltd matches your success profile - similar to your top clients",
        actionText: "View Lead",
        actionLink: "/dashboard/leads",
    },
    {
        id: "rec-3",
        type: "check" as const,
        title: "Perfect candidate for Senior Developer role",
        description: "Michael Chen is 95% match - consider fast-tracking",
        actionText: "Review Now",
        actionLink: "/dashboard/candidates/2",
    },
];

const HOT_CANDIDATES = [
    {
        id: "cand-1",
        name: "Alex Thompson",
        role: "Senior Software Engineer",
        matchScore: 92,
        link: "/dashboard/candidates/1",
    },
    {
        id: "cand-2",
        name: "Sarah Martinez",
        role: "Senior Software Engineer",
        matchScore: 88,
        link: "/dashboard/candidates/2",
    },
    {
        id: "cand-3",
        name: "James Wilson",
        role: "Product Manager",
        matchScore: 85,
        link: "/dashboard/candidates/3",
    },
];

const FOLLOW_UPS = [
    {
        id: "follow-1",
        name: "Alex Thompson",
        status: "shortlisted - No activity in 3 days",
        link: "/dashboard/candidates/1",
    },
    {
        id: "follow-2",
        name: "Sarah Martinez",
        status: "interview - No activity in 3 days",
        link: "/dashboard/candidates/2",
    },
    {
        id: "follow-3",
        name: "James Wilson",
        status: "shortlisted - No activity in 3 days",
        link: "/dashboard/candidates/3",
    },
];

interface AIAssistantProps {
    state: "maximized" | "minimized" | "closed";
    onChangeState: (newState: "maximized" | "minimized" | "closed") => void;
}

// Sub-component for Recommendation Cards
interface RecommendationCardProps {
    type: "alert" | "trend" | "check";
    title: string;
    description: string;
    actionText: string;
    actionLink: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
    type,
    title,
    description,
    actionText,
    actionLink,
}) => {
    const configMap = {
        alert: {
            icon: AlertCircle,
            bgColor: "bg-red-100",
            textColor: "text-red-600",
        },
        trend: {
            icon: TrendingUp,
            bgColor: "bg-blue-100",
            textColor: "text-blue-600",
        },
        check: {
            icon: CheckCircle2,
            bgColor: "bg-green-100",
            textColor: "text-green-600",
        },
    };

    const config = configMap[type];
    const Icon = config.icon;

    return (
        <div className="text-card-foreground flex flex-col gap-6 rounded-xl border border-primary/20 bg-primary/5">
            <div className="p-3">
                <div className="flex gap-2">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${config.bgColor} ${config.textColor}`}>
                        <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1 text-text-main">
                            {title}
                        </p>
                        <p className="text-xs text-muted-text mb-2">
                            {description}
                        </p>
                        <Link to={actionLink}>
                            <Button
                                variant="secondary"
                                size="sm"
                                suffixIcon={ArrowRight}
                                className="!h-7 !py-0 !px-3 shadow-sm hover:border-slate-300"
                            >
                                {actionText}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-component for Hot Candidate Cards
interface CandidateCardProps {
    name: string;
    role: string;
    matchScore: number;
    link: string;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
    name,
    role,
    matchScore,
    link,
}) => {
    return (
        <Link to={link} className="block">
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="p-3">
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-main">{name}</p>
                            <p className="text-xs text-muted-text">{role}</p>
                        </div>
                        <span className="inline-flex items-center justify-center rounded-md border border-transparent px-2 py-0.5 font-medium bg-green-500 text-white text-xs">
                            {matchScore}%
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// Sub-component for Follow-up Cards
interface FollowUpCardProps {
    name: string;
    status: string;
    link: string;
}

const FollowUpCard: React.FC<FollowUpCardProps> = ({
    name,
    status,
    link,
}) => {
    return (
        <Link to={link} className="block">
            <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border hover:bg-slate-50 transition-colors cursor-pointer border-primary-light">
                <div className="p-3">
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-main">{name}</p>
                            <p className="text-xs text-muted-text capitalize">{status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export const AIAssistant: React.FC<AIAssistantProps> = ({ state, onChangeState }) => {
    if (state === "closed") {
        return (
            <Button
                variant="outline"
                onClick={() => onChangeState("maximized")}
                className="fixed bottom-6 right-6 z-40 !w-16 !h-16 !rounded-full !bg-black flex items-center justify-center transition-all bg-white border-1 border-primary-light animate-bounce"
            >
                <img src="/ai-assistant-button.svg" className="w-14 h-14 object-contain" alt="AI Assistant" />
            </Button>
        );
    }

    if (state === "minimized") {
        return (
            <div className="fixed bottom-6 right-6 w-96 z-40 transition-all text-left">
                <div data-slot="card" className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border shadow-2xl">
                    <div data-slot="card-header" className="px-6 pt-6 pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <h4 data-slot="card-title" className="text-sm font-semibold text-text-main">AI Assistant</h4>
                            </div>
                            <div className="flex gap-1">
                                <Button
                                    variant="icon"
                                    size="sm"
                                    onClick={() => onChangeState("maximized")}
                                    className="!h-6 !w-6 text-muted-text hover:text-text-main"
                                >
                                    <Maximize2 className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                    variant="icon"
                                    size="sm"
                                    onClick={() => onChangeState("closed")}
                                    className="!h-6 !w-6 text-muted-text hover:text-text-main"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div data-slot="card-content" className="px-6 pb-6">
                        <p className="text-xs text-muted-text">{RECOMMENDATIONS.length} recommendations waiting</p>
                    </div>
                </div>
            </div>
        );
    }

    // Maximized State
    return (
        <div className="fixed top-0 right-0 h-full w-96 z-40 transition-all text-left">
            <div className="h-full bg-white border-l border-btn-sec-border shadow-xl flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-btn-sec-border bg-primary/5">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <img src="/ai-assistant.svg" className="w-6 h-6 object-contain" alt="AI Assistant" />
                            <h2 className="font-semibold text-text-main text-base">AI Assistant</h2>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex gap-1">
                            <Button
                                variant="icon"
                                size="sm"
                                onClick={() => onChangeState("minimized")}
                                className="text-muted-text hover:text-text-main"
                            >
                                <Minimize2 className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="icon"
                                size="sm"
                                onClick={() => onChangeState("closed")}
                                className="text-muted-text hover:text-text-main"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <p className="text-xs text-muted-text">Your intelligent recruitment assistant</p>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-6">
                    {/* AI Recommendations */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <h3 className="font-semibold text-sm text-text-main">AI Recommendations</h3>
                            <span className="inline-flex items-center justify-center rounded-md border border-btn-sec-border px-2 py-0.5 font-medium bg-slate-100 text-text-main text-xs">
                                {RECOMMENDATIONS.length}
                            </span>
                        </div>
                        <div className="space-y-2">
                            {RECOMMENDATIONS.map((rec) => (
                                <RecommendationCard
                                    key={rec.id}
                                    type={rec.type}
                                    title={rec.title}
                                    description={rec.description}
                                    actionText={rec.actionText}
                                    actionLink={rec.actionLink}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Hot Candidates */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-orange-500" />
                                <h3 className="font-semibold text-sm text-text-main">Hot Candidates</h3>
                            </div>
                            <Link to="/dashboard/candidates">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    suffixIcon={ChevronRight}
                                    className="!h-6 !py-0 !px-2.5 shadow-sm text-xs font-semibold text-text-main"
                                >
                                    View All
                                </Button>
                            </Link>
                        </div>
                        <div className="space-y-2">
                            {HOT_CANDIDATES.map((cand) => (
                                <CandidateCard
                                    key={cand.id}
                                    name={cand.name}
                                    role={cand.role}
                                    matchScore={cand.matchScore}
                                    link={cand.link}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Follow-ups Due */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Bell className="w-4 h-4 text-purple-500" />
                                <h3 className="font-semibold text-sm text-text-main">Follow-ups Due</h3>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {FOLLOW_UPS.map((follow) => (
                                <FollowUpCard
                                    key={follow.id}
                                    name={follow.name}
                                    status={follow.status}
                                    link={follow.link}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
