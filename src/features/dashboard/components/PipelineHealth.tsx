import React from "react";
import { Typography } from "../../../components/ui";
import { PipelineHealthData } from "../types";

interface PipelineHealthProps {
    data?: PipelineHealthData;
}

export const PipelineHealth: React.FC<PipelineHealthProps> = ({ data }) => {
  const steps = [
    { label: "Applications", value: data?.applications ?? 0 },
    { label: "Shortlisted", value: data?.shortlisted ?? 0 },
    { label: "Interview Stage", value: data?.interview_stage ?? 0 },
    { label: "Placed", value: data?.placed ?? 0 },
  ];

  // Maximum value is either the max value in the steps, or at least 1 (to avoid division by 0)
  const maxValue = Math.max(1, ...steps.map(s => s.value));

  return (
    <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs flex flex-col gap-6">
      <div className="border-b border-btn-sec-border pb-3">
        <Typography variant="h4" className="font-bold text-text-main">
          Pipeline Health
        </Typography>
        <Typography variant="caption" className="text-muted-text mt-1 block">
          Overview of your recruitment funnel
        </Typography>
      </div>
      <div className="space-y-4">
        {steps.map((step) => {
          const percentage = (step.value / maxValue) * 100;
          return (
            <div key={step.label}>
              <div className="flex items-center justify-between mb-2">
                <Typography variant="body2" className="font-semibold text-text-main">
                  {step.label}
                </Typography>
                <Typography variant="body2" className="font-bold text-text-main">
                  {step.value}
                </Typography>
              </div>
              <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-2">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
