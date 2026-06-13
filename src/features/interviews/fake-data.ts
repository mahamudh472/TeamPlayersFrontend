import { Interview } from "./types";
import { OptionType } from "../../shared/types";

export const initialInterviews: Interview[] = [
    {
        id: "1",
        candidateId: "2",
        candidateName: "Sarah Martinez",
        role: "Senior Software Engineer",
        company: "GlobalTech Industries",
        date: "2026-06-10",
        time: "14:00",
        status: "scheduled",
    },
    {
        id: "2",
        candidateId: "3",
        candidateName: "James Wilson",
        role: "Product Manager",
        company: "GlobalTech Industries",
        date: "2026-06-08",
        time: "10:00",
        status: "scheduled",
    },
];

export const candidatesOptions: OptionType[] = [
    { label: "Alex Thompson", value: "Alex Thompson" },
    { label: "Sarah Martinez", value: "Sarah Martinez" },
    { label: "James Wilson", value: "James Wilson" },
    { label: "Emily Davis", value: "Emily Davis" },
];

export const jobsOptions: OptionType[] = [
    { label: "Senior Software Engineer - GlobalTech Industries", value: "Senior Software Engineer|GlobalTech Industries" },
    { label: "Product Manager - GlobalTech Industries", value: "Product Manager|GlobalTech Industries" },
    { label: "Frontend Developer - Acme Corp", value: "Frontend Developer|Acme Corp" },
    { label: "Fullstack Developer - TechCorp Solutions", value: "Fullstack Developer|TechCorp Solutions" },
];
