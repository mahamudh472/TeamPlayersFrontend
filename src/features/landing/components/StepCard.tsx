import React from "react";
import { CircleCheck } from "lucide-react";
import { Typography } from "../../../components/ui";

interface StepCardProps {
  stepNumber: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

export const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  icon,
  title,
  description,
  items
}) => {
  return (
    <div data-slot="card" className="bg-white rounded-xl border-2 border-btn-sec-border p-6 shadow-xs flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-primary text-white rounded-lg flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <Typography variant="body2" className="text-primary font-semibold mb-1">
            Step {stepNumber}
          </Typography>
          <Typography variant="h4" className="text-2xl font-bold text-text-main">
            {title}
          </Typography>
          <Typography variant="body2" className="text-muted-foreground mt-2">
            {description}
          </Typography>
        </div>
      </div>
      <ul className="space-y-2 mt-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <CircleCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-text-main">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
