import React, { useState } from "react";
import { PageHeader } from "../../../components/ui";
import { Sparkles } from "lucide-react";
import { LeadStats } from "../components/LeadStats";
import { LeadPipeline } from "../components/LeadPipeline";
import { GenerateLeadsModal } from "../components/GenerateLeadsModal";

export const LeadGenerationContainer: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGenerate = (filters: {
        country: string;
        industry: string;
        companySize: string;
        hiringActivity: string;
    }) => {
        console.log("Generating leads with filters:", filters);
    };

    return (
        <main className="space-y-8">
            <PageHeader
                title="Lead Generation"
                subtitle="AI-powered client acquisition"
                action={{
                    title: "Generate Leads",
                    icon: Sparkles,
                    onClick: () => {
                        setIsModalOpen(true);
                    },
                }}
            />

            {/* Lead Stats Cards Row */}
            <LeadStats />

            {/* Lead Pipeline Tab List View */}
            <LeadPipeline />

            {/* Generate Leads AI Modal */}
            <GenerateLeadsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onGenerate={handleGenerate}
            />
        </main>
    );
};
