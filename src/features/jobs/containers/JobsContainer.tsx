import React from "react";
import { PageHeader } from "../../../components/ui";
import { Plus } from "lucide-react";
import { JobStats } from "../components/JobStats";
import { JobsList } from "../components/JobsList";
import { useNavigate } from "react-router";

export const JobsContainer: React.FC = () => {
    const navigate = useNavigate();
    return (
        <main className="space-y-6">
            <PageHeader
                title="Jobs"
                subtitle="Manage your job postings"
                action={{
                    title: "Create Job",
                    onClick: () => {
                        navigate("/dashboard/jobs/create");
                    },
                    icon: Plus,
                }}
            />
            <JobStats />

            <JobsList />
        </main>
    );
};
