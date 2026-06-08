import React from "react";
import { QuickActions } from "./QuickActions";
import { PipelineHealth } from "./PipelineHealth";

export const DashboardActionsPipeline: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <QuickActions />
            </div>
            <div className="lg:col-span-2">
                <PipelineHealth />
            </div>
        </div>
    );
};
