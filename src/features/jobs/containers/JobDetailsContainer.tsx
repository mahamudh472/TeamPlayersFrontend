import React from "react";
import { useParams } from "react-router";
import { JobDetailsHeader } from "../components/JobDetailsHeader";
import { JobDetailsStats } from "../components/JobDetailsStats";
import { JobDetailsMain } from "../components/JobDetailsMain";
import { JobDetailsSidebar } from "../components/JobDetailsSidebar";

import { getJobDetails } from "../fake-data";

export const JobDetailsContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();

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
