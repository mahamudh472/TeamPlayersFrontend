import { JobPosition, CandidateItem } from "./types";

export const jobs: JobPosition[] = [
    {
        id: "1",
        title: "Senior Software Engineer",
        company: "GlobalTech Industries",
        location: "London, UK",
        salary: "£70,000 - £90,000",
        status: "active",
        skills: ["React", "TypeScript", "Node.js"],
        applicants: 45,
        shortlisted: 8,
        interviewed: 3,
    },
    {
        id: "2",
        title: "Product Manager",
        company: "GlobalTech Industries",
        location: "Manchester, UK",
        salary: "£60,000 - £80,000",
        status: "active",
        skills: ["Product Strategy", "Agile", "User Research"],
        applicants: 32,
        shortlisted: 6,
        interviewed: 2,
    },
    {
        id: "3",
        title: "Store Manager",
        company: "RetailPro Group",
        location: "Birmingham, UK",
        salary: "£35,000 - £45,000",
        status: "active",
        skills: ["Retail Management", "Team Leadership", "Sales"],
        applicants: 28,
        shortlisted: 10,
        interviewed: 5,
    },
    {
        id: "4",
        title: "Operations Manager",
        company: "Manufacturing United",
        location: "Leeds, UK",
        salary: "£50,000 - £65,000",
        status: "active",
        skills: ["Operations", "Lean Manufacturing", "Process Improvement"],
        applicants: 18,
        shortlisted: 4,
        interviewed: 1,
    },
];

export const candidates: CandidateItem[] = [
    {
        id: "1",
        name: "Alex Thompson",
        matchScore: 92,
        status: "interview",
        location: "London, UK",
        experience: "6 years",
    },
    {
        id: "2",
        name: "Sarah Martinez",
        matchScore: 88,
        status: "interview",
        location: "London, UK",
        experience: "5 years",
    },
];

export const getJobDetails = (jobId: string | undefined) => {
    if (jobId === "2") {
        return {
            title: "Product Manager",
            status: "active",
            company: "GlobalTech Industries",
            location: "Manchester, UK",
            salary: "£60,000 - £80,000",
            applicants: 32,
            shortlisted: 6,
            interviewed: 2,
            daysActive: 7,
        };
    }
    if (jobId === "3") {
        return {
            title: "Store Manager",
            status: "active",
            company: "RetailPro Group",
            location: "Birmingham, UK",
            salary: "£35,000 - £45,000",
            applicants: 28,
            shortlisted: 10,
            interviewed: 5,
            daysActive: 15,
        };
    }
    if (jobId === "4") {
        return {
            title: "Operations Manager",
            status: "active",
            company: "Manufacturing United",
            location: "Leeds, UK",
            salary: "£50,000 - £65,000",
            applicants: 18,
            shortlisted: 4,
            interviewed: 1,
            daysActive: 9,
        };
    }
    // Fallback / Senior Software Engineer
    return {
        title: "Senior Software Engineer",
        status: "active",
        company: "GlobalTech Industries",
        location: "London, UK",
        salary: "£70,000 - £90,000",
        applicants: 45,
        shortlisted: 8,
        interviewed: 3,
        daysActive: 11,
    };
};
