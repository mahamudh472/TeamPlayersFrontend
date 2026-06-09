import React from "react";
import { Typography } from "../../../components/ui";

interface FeatureItem {
  title: string;
  description: string;
}

interface FeatureSectionProps {
  icon: React.ReactNode;
  heading: string;
  features: FeatureItem[];
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  icon,
  heading,
  features
}) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <Typography variant="h4" className="text-2xl font-bold text-text-main">
          {heading}
        </Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            data-slot="card"
            className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-2"
          >
            <Typography variant="h5" className="font-bold text-text-main">
              {feature.title}
            </Typography>
            <Typography variant="body2" className="text-muted-foreground leading-relaxed">
              {feature.description}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
