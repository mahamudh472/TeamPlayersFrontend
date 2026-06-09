import React from "react";
import { useParams } from "react-router";
import { JobDetailsHeader } from "../components/JobDetailsHeader";
import { JobDetailsStats } from "../components/JobDetailsStats";
import { JobDetailsMain } from "../components/JobDetailsMain";
import { JobDetailsSidebar } from "../components/JobDetailsSidebar";

export const JobDetailsContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Mock details based on ID
    const getJobDetails = (jobId: string | undefined) => {
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

    const job = getJobDetails(id);

    return (
        <main className="space-y-6">
            {/* Header section */}
            <JobDetailsHeader
                id={id}
                title={job.title}
                status={job.status}
                company={job.company}
                location={job.location}
                salary={job.salary}
            />

            {/* Stats section */}
            <JobDetailsStats
                applicants={job.applicants}
                shortlisted={job.shortlisted}
                interviewed={job.interviewed}
                daysActive={job.daysActive}
            />

            {/* 3-Column main/sidebar details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <JobDetailsMain />
                </div>
                <div>
                    <JobDetailsSidebar />
                </div>
            </div>
        </main>
    );
};
