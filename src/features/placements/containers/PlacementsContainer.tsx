import React from "react";
import { PageHeader } from "../../../components/ui";
import { FileText } from "lucide-react";
import { PlacementStats } from "../components/PlacementStats";
import { PlacementList } from "../components/PlacementList";

export const PlacementsContainer: React.FC = () => {
    return (
        <main className="space-y-6">
            <PageHeader
                title="Placements"
                subtitle="Track successful placements and revenue"
                action={{
                    title: "Generate Report",
                    icon: FileText,
                    onClick: () => console.log("Generating report..."),
                }}
            />
            <PlacementStats />
            <PlacementList />
        </main>
    );
};