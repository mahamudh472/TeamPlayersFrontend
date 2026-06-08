import React from "react";
import { Button, PageHeader } from "../../../components/ui";
import { Filter } from "lucide-react";
import { CandidateStats } from "../components/CandidateStats";
import { CandidatesList } from "../components/CandidatesList";

export const CandidatesContainer: React.FC = () => {
    return (
        <main className="space-y-6">
            <PageHeader
                title="Candidates"
                subtitle="AI-powered candidate pipeline"
                rightElement={
                    <>
                        <Button prefixIcon={Filter} variant="outline">
                            Filters
                        </Button>
                    </>
                }
            />
            <CandidateStats />
            <CandidatesList />
        </main>
    );
};
