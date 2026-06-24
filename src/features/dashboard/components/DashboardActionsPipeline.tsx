import React from "react";
import { QuickActions } from "./QuickActions";
import { PipelineHealth } from "./PipelineHealth";
import { PipelineHealthData } from "../types";

interface DashboardActionsPipelineProps {
    pipelineHealth?: PipelineHealthData;
}

export const DashboardActionsPipeline: React.FC<DashboardActionsPipelineProps> = ({
    pipelineHealth,
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <QuickActions />
            </div>
            <div className="lg:col-span-2">
                <PipelineHealth data={pipelineHealth} />
            </div>
        </div>
    );
};
