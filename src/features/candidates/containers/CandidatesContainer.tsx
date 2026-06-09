import React from "react";
import { PageHeader } from "../../../components/ui";
import { CandidateStats } from "../components/CandidateStats";
import { CandidatesList } from "../components/CandidatesList";

export const CandidatesContainer: React.FC = () => {
    return (
        <main className="space-y-6">
            <PageHeader
                title="Candidates"
                subtitle="AI-powered candidate pipeline"
            />
            <CandidateStats />
            <CandidatesList />
        </main>
    );
};
