import React from "react";
import { Typography } from "./Typography";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

export interface StatItem {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  iconColor?: string;
  change?: string;
  changeType?: "up" | "down";
  changeLabel?: string;
}

export interface StatsGroupProps {
  items: StatItem[];
  className?: string;
}

export const StatsGroup: React.FC<StatsGroupProps> = ({ items, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`.trim()}>
      {items.map((item, index) => {
        if (item.icon) {
          const Icon = item.icon;
          const TrendIcon = item.changeType === "down" ? TrendingDown : TrendingUp;
          const trendColor = item.changeType === "down" ? "text-red-500" : "text-green-500";
          
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-btn-sec-border shadow-xs flex flex-col gap-6"
            >
              <div className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
                <Typography variant="body2" className="text-sm font-medium text-muted-text">
                  {item.title}
                </Typography>
                <Icon className={`w-5 h-5 ${item.iconColor || "text-primary"}`} />
              </div>
              <div className="px-6 pb-6">
                <Typography variant="h2" className="text-2xl font-bold text-text-main">
                  {item.value}
                </Typography>
                {item.change && (
                  <div className="flex items-center gap-1 text-xs mt-1">
                    <TrendIcon className={`w-3 h-3 ${trendColor}`} />
                    <span className={`${trendColor} font-medium`}>{item.change}</span>
                    {item.changeLabel && (
                      <span className="text-muted-text">{item.changeLabel}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        }

        return (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs flex flex-col justify-between min-h-[120px] transition-all duration-200 hover:shadow-md"
          >
            <Typography variant="body2" className="text-muted-text font-semibold">
              {item.title}
            </Typography>
            <Typography variant="h2" className="font-extrabold text-text-main mt-4">
              {item.value}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};
