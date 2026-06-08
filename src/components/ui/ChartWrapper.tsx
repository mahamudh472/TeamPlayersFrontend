import React from "react";
import { LucideIcon } from "lucide-react";
import { Typography } from "./Typography";

export interface ChartWrapperProps {
  title: string;
  subtitle?: string;
  value?: string | number;
  valuelabel?: string;
  badge?: {
    icon?: LucideIcon;
    text: string;
  };
  children?: React.ReactNode;
  className?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title,
  subtitle,
  value,
  valuelabel,
  badge,
  children,
  className = "",
}) => {
  return (
    <div className={`bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs flex flex-col justify-between ${className}`.trim()}>
      <div className="space-y-1 mb-6">
        <Typography variant="h3" className="font-bold text-text-main">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" className="text-muted-text">
            {subtitle}
          </Typography>
        )}
      </div>

      <div className="flex-1 min-h-[240px] flex items-center justify-center">
        {children}
      </div>

      {(value || valuelabel || badge) && (
        <div className="flex items-end justify-between mt-6 border-t border-btn-sec-border pt-4">
          <div className="space-y-0.5">
            {value && (
              <Typography variant="h2" className="font-extrabold text-text-main">
                {value}
              </Typography>
            )}
            {valuelabel && (
              <Typography variant="caption" className="text-muted-text font-semibold">
                {valuelabel}
              </Typography>
            )}
          </div>
          {badge && (
            <div className="bg-[#10b981] text-white px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0">
              {badge.icon && <badge.icon className="w-3.5 h-3.5" />}
              <span>{badge.text}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
