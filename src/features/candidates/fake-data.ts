import { CandidateItem } from "./types";

export const initialCandidates: CandidateItem[] = [
    {
        id: "1",
        name: "Alex Thompson",
        role: "Senior Software Engineer",
        matchScore: 92,
        status: "interview_scheduled",
        location: "London, UK",
        experience: "6 years",
        salary: "£85,000",
        appliedDate: "16/05/2026",
    },
    {
        id: "2",
        name: "Sarah Martinez",
        role: "Senior Software Engineer",
        matchScore: 88,
        status: "interview_scheduled",
        location: "London, UK",
        experience: "5 years",
        salary: "£80,000",
        appliedDate: "17/05/2026",
    },
    {
        id: "3",
        name: "James Wilson",
        role: "Product Manager",
        matchScore: 85,
        status: "shortlisted",
        location: "Manchester, UK",
        experience: "4 years",
        salary: "£65,000",
        appliedDate: "21/05/2026",
    },
    {
        id: "4",
        name: "Emma Davis",
        role: "Store Manager",
        matchScore: 78,
        status: "rejected",
        location: "Birmingham, UK",
        experience: "3 years",
        appliedDate: "26/05/2026",
    },
];

export const getCandidateDetails = (candidateId: string | undefined) => {
    if (candidateId === "2") {
        return {
            name: "Sarah Martinez",
            matchScore: 88,
            status: "interview_scheduled" as const,
            email: "sarah.m@email.com",
            phone: "+44 7700 900234",
            location: "London, UK",
            summaryText:
                "Strong background in frontend engineering with solid React and TypeScript skills. Good team collaborator.",
            strengths: [
                "Clean code developer",
                "React & TypeScript expert",
                "UI/UX sensitivity",
            ],
            concerns: ["Limited experience with backend systems"],
            experience: "5 years",
            currentSalary: "£70,000",
            expectedSalary: "£80,000",
            skills: ["React", "TypeScript", "Redux", "Tailwind CSS"],
            appliedDate: "17 May 2026",
            jobTitle: "Senior Software Engineer",
            jobLocation: "London, UK",
            jobSalary: "£70,000 - £90,000",
            jobId: "1",
            skillsMatch: 90,
            experienceMatch: 85,
            salaryMatch: 90,
            locationMatch: 100,
            recommendationTitle: "Highly Fit Candidate",
            recommendationText:
                "Highly recommend moving forward to technical panel interview.",
            interviewDate: "2026-06-17",
            interviewTime: "14:00",
            appliedJobs: [
                { id: "1", title: "Senior Software Engineer" },
            ],
        };
    }
    if (candidateId === "3") {
        return {
            name: "James Wilson",
            matchScore: 85,
            status: "shortlisted" as const,
            email: "james.w@email.com",
            phone: "+44 7700 900345",
            location: "Manchester, UK",
            summaryText:
                "Capable Product Manager with agile leadership experience. Solid communication and client coordination history.",
            strengths: [
                "Strong leadership skills",
                "Agile & Scrum certified",
                "Great communicator",
            ],
            concerns: ["Slightly less technical implementation experience"],
            experience: "4 years",
            currentSalary: "£58,000",
            expectedSalary: "£65,000",
            skills: ["Agile", "Scrum", "Product Roadmap", "Jira"],
            appliedDate: "21 May 2026",
            jobTitle: "Product Manager",
            jobLocation: "Manchester, UK",
            jobSalary: "£60,000 - £80,000",
            jobId: "2",
            skillsMatch: 85,
            experienceMatch: 80,
            salaryMatch: 85,
            locationMatch: 100,
            recommendationTitle: "Fit Candidate",
            recommendationText:
                "Recommend for cultural and strategy assessment call.",
            appliedJobs: [
                { id: "2", title: "Product Manager" },
                { id: "4", title: "Project Lead" },
            ],
        };
    }
    if (candidateId === "4") {
        return {
            name: "Emma Davis",
            matchScore: 78,
            status: "rejected" as const,
            email: "emma.d@email.com",
            phone: "+44 7700 900456",
            location: "Birmingham, UK",
            summaryText:
                "Energetic retail specialist with good store operations and leadership background.",
            strengths: [
                "Operations efficiency",
                "Team building",
                "Sales management",
            ],
            concerns: ["Has not managed large-scale enterprise hubs previously"],
            experience: "3 years",
            currentSalary: "£30,000",
            expectedSalary: "£35,000",
            skills: ["Sales", "Store Ops", "Team Mgmt"],
            appliedDate: "26 May 2026",
            jobTitle: "Store Manager",
            jobLocation: "Birmingham, UK",
            jobSalary: "£35,000 - £45,000",
            jobId: "3",
            skillsMatch: 80,
            experienceMatch: 75,
            salaryMatch: 80,
            locationMatch: 100,
            recommendationTitle: "Potential Fit",
            recommendationText:
                "Recommend scheduling initial screening interview call.",
            appliedJobs: [
                { id: "3", title: "Store Manager" },
            ],
        };
    }
    // Fallback or Alex Thompson
    return {
        name: "Alex Thompson",
        matchScore: 92,
        status: "interview_scheduled" as const,
        email: "alex.thompson@email.com",
        phone: "+44 7700 900123",
        location: "London, UK",
        summaryText:
            "Excellent technical background with strong experience in React and cloud technologies. Previous experience at leading tech companies.",
        strengths: [
            "Strong technical skills",
            "Leadership experience",
            "Great communication",
        ],
        concerns: ["Salary expectation slightly above range"],
        experience: "6 years",
        currentSalary: "£75,000",
        expectedSalary: "£85,000",
        skills: ["React", "TypeScript", "Node.js", "AWS", "Python"],
        appliedDate: "16 May 2026",
        jobTitle: "Senior Software Engineer",
        jobLocation: "London, UK",
        jobSalary: "£70,000 - £90,000",
        jobId: "1",
        skillsMatch: 95,
        experienceMatch: 90,
        salaryMatch: 85,
        locationMatch: 100,
        recommendationTitle: "High Fit Candidate",
        recommendationText:
            "Recommend to shortlist and schedule interview immediately.",
        interviewDate: "2026-06-16",
        interviewTime: "10:00",
        appliedJobs: [
            { id: "1", title: "Senior Software Engineer" },
            { id: "3", title: "Full Stack Developer" },
        ],
    };
};
