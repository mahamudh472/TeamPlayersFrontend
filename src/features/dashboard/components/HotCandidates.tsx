import React from "react";
import { Link } from "react-router";
import { Typography, Button, AppBadge } from "../../../components/ui";
import { Users, ArrowRight } from "lucide-react";

export const HotCandidates: React.FC = () => {
  const candidates = [
    {
      id: "1",
      name: "Alex Thompson",
      role: "Senior Software Engineer",
      match: 92,
    },
    {
      id: "2",
      name: "Sarah Martinez",
      role: "Senior Software Engineer",
      match: 88,
    },
    {
      id: "3",
      name: "James Wilson",
      role: "Product Manager",
      match: 85,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between border-b border-btn-sec-border pb-3">
        <div>
          <Typography variant="h4" className="font-bold text-text-main">
            Hot Candidates
          </Typography>
          <Typography variant="caption" className="text-muted-text mt-1 block">
            High-match candidates to review
          </Typography>
        </div>
        <Link to="/dashboard/candidates">
          <Button variant="ghost" size="sm" suffixIcon={ArrowRight}>
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {candidates.map((item) => (
          <Link
            key={item.id}
            to={`/dashboard/candidates/${item.id}`}
            className="flex items-start gap-3 p-3 rounded-lg border border-btn-sec-border hover:bg-slate-50 transition-colors block"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <Typography variant="body2" className="font-semibold text-text-main">
                  {item.name}
                </Typography>
                <AppBadge variant="primary">
                  {item.match}% match
                </AppBadge>
              </div>
              <Typography variant="caption" className="text-muted-text block">
                {item.role}
              </Typography>
              <div className="mt-2">
                <div className="bg-black/10 relative w-full overflow-hidden rounded-full h-1">
                  <div
                    className="bg-primary h-full rounded-full transition-all"
                    style={{ width: `${item.match}%` }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
