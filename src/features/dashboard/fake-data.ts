import {
    RecommendationCardProps,
    CandidateCardProps,
    FollowUpCardProps,
    SearchResult,
    Notification
} from "./types";

export const RECOMMENDATIONS: (RecommendationCardProps & { id: string })[] = [
    {
        id: "rec-1",
        type: "alert",
        title: "High-match candidate needs follow-up",
        description: "Sarah Johnson (92% match) has been shortlisted for 3 days",
        actionText: "Schedule Interview",
        actionLink: "/dashboard/candidates/1?schedule=true",
    },
    {
        id: "rec-2",
        type: "trend",
        title: "New high-value lead detected",
        description: "TechCorp Ltd matches your success profile - similar to your top clients",
        actionText: "View Lead",
        actionLink: "/dashboard/leads",
    },
    {
        id: "rec-3",
        type: "check",
        title: "Perfect candidate for Senior Developer role",
        description: "Michael Chen is 95% match - consider fast-tracking",
        actionText: "Review Now",
        actionLink: "/dashboard/candidates/2",
    },
];

export const HOT_CANDIDATES: (CandidateCardProps & { id: string })[] = [
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

export const FOLLOW_UPS: (FollowUpCardProps & { id: string })[] = [
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

export const mockResults: SearchResult[] = [
    {
        id: "1",
        label: "John Smith",
        type: "candidate",
        subtitle: "Senior Software Engineer",
    },
    {
        id: "2",
        label: "Senior React Developer",
        type: "job",
        subtitle: "Acme Corp • London",
    },
    {
        id: "3",
        label: "Acme Corporation",
        type: "client",
        subtitle: "Technology • 200 employees",
    },
    {
        id: "4",
        label: "TechStart Ltd",
        type: "lead",
        subtitle: "Hiring 3 positions",
    },
    {
        id: "5",
        label: "Emma Williams",
        type: "candidate",
        subtitle: "Product Manager",
    },
    {
        id: "6",
        label: "DevOps Engineer",
        type: "job",
        subtitle: "CloudScale • Remote",
    },
];

export const notifications: Notification[] = [
    {
        id: "1",
        title: "New Candidate Application",
        description: "John Smith has applied for the Senior Software Engineer position.",
        time: "2 hours ago",
        type: "candidate",
    },
    {
        id: "2",
        title: "Interview Scheduled",
        description: "First round interview with Acme Corp has been confirmed.",
        time: "4 hours ago",
        type: "job",
    },
    {
        id: "3",
        title: "Placement Finalized",
        description: "Sarah Johnson's placement contract has been signed by Manufacturing United.",
        time: "1 day ago",
        type: "placement",
    },
];
