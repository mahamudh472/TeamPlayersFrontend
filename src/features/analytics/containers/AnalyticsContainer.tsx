import React from "react";
import { PageHeader } from "../../../components/ui";

export const AnalyticsContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Monitor your operational and pipeline performances here."
      />
    </div>
  );
};
