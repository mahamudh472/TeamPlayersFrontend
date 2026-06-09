import React from "react";
import { Star } from "lucide-react";
import { Typography } from "../../../components/ui";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  role
}) => {
  return (
    <div data-slot="card" className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-4">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
      <Typography variant="body1" className="text-muted-foreground leading-relaxed flex-1">
        "{quote}"
      </Typography>
      <div>
        <Typography variant="body2" className="font-semibold text-text-main">
          {name}
        </Typography>
        <Typography variant="body2" className="text-muted-foreground text-sm">
          {role}
        </Typography>
      </div>
    </div>
  );
};
