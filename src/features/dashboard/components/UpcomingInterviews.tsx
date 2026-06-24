import React from "react";
import { Link } from "react-router";
import { Typography, Button } from "../../../components/ui";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { UpcomingInterview } from "../types";

interface UpcomingInterviewsProps {
    interviews?: UpcomingInterview[];
}

export const UpcomingInterviews: React.FC<UpcomingInterviewsProps> = ({ interviews = [] }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs flex flex-col gap-6 h-full justify-between">
      <div className="flex flex-col gap-4">
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

        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
          {interviews.length === 0 ? (
            <div className="text-center py-8 text-muted-text text-sm">
              No upcoming interviews scheduled.
            </div>
          ) : (
            interviews.map((item) => (
              <div key={item.id} className="flex items-start gap-4 p-3 rounded-lg border border-btn-sec-border">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <Typography variant="body2" className="font-semibold text-text-main">
                    {item.candidate_name}
                  </Typography>
                  <Typography variant="caption" className="text-muted-text block">
                    {item.job_title}
                  </Typography>
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-text">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.formatted_meeting_time}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
