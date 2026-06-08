import React from "react";
import { Link } from "react-router";
import { Typography, Button } from "../../../components/ui";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const UpcomingInterviews: React.FC = () => {
  const interviews = [
    {
      name: "Sarah Martinez",
      role: "Senior Software Engineer",
      time: "10/06/2026 at 14:00",
    },
    {
      name: "James Wilson",
      role: "Product Manager",
      time: "08/06/2026 at 10:00",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between border-b border-btn-sec-border pb-3">
        <div>
          <Typography variant="h4" className="font-bold text-text-main">
            Upcoming Interviews
          </Typography>
          <Typography variant="caption" className="text-muted-text mt-1 block">
            Scheduled for the next 7 days
          </Typography>
        </div>
        <Link to="/dashboard/interviews">
          <Button variant="ghost" size="sm" suffixIcon={ArrowRight}>
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {interviews.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 p-3 rounded-lg border border-btn-sec-border">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <Typography variant="body2" className="font-semibold text-text-main">
                {item.name}
              </Typography>
              <Typography variant="caption" className="text-muted-text block">
                {item.role}
              </Typography>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-text">
                <Clock className="w-3.5 h-3.5" />
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
