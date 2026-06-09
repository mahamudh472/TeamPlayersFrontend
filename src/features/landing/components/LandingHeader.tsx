import React from "react";
import { Typography } from "../../../components/ui";

interface LandingHeaderProps {
  title: string;
  subtitle: string;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ title, subtitle }) => {
  return (
    <section
      className="py-20 px-4"
      style={{
        background: "linear-gradient(135deg, rgba(30, 41, 59, 0.1) 0%, #F8FAFC 0.01%, rgba(20, 184, 166, 0.1) 100%)"
      }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <Typography variant="h2" className="text-4xl md:text-5xl font-bold mb-6 text-text-main">
          {title}
        </Typography>
        <Typography variant="body1" className="text-muted-foreground max-w-3xl mx-auto">
          {subtitle}
        </Typography>
      </div>
    </section >
  );
};
