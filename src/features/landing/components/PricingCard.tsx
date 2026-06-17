import React from "react";
import { Link } from "react-router";
import { CircleCheck } from "lucide-react";
import { Typography, Button } from "../../../components/ui";
import { useAuth } from "../../../shared/context/AuthContext";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  popular: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  features,
  popular
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <div
      data-slot="card"
      className={`bg-white rounded-xl border p-8 shadow-xs relative flex flex-col h-full ${
        popular ? "border-primary border-2" : "border-btn-sec-border"
      }`}
    >
      {popular && (
        <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
          <span className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-xs">
            Most Popular
          </span>
        </div>
      )}
      <div>
        <Typography variant="h4" className="font-bold text-text-main leading-none mb-2">
          {title}
        </Typography>
        <Typography variant="body2" className="text-muted-foreground mb-4 min-h-[40px]">
          {description}
        </Typography>
        <div className="mt-4 flex items-baseline mb-6">
          <span className="text-4xl font-extrabold text-text-main">{price}</span>
          <span className="text-muted-foreground ml-1">/month</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between gap-6">
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CircleCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-text-main">{feature}</span>
            </li>
          ))}
        </ul>

        <Link to={isAuthenticated ? "/dashboard" : "/register"} className="w-full mt-auto">
          <Button
            variant={popular ? "primary" : "secondary"}
            className={`w-full h-11 font-semibold text-sm rounded-lg transition-all cursor-pointer flex items-center justify-center ${
              popular
                ? "bg-primary hover:bg-primary/95 text-white shadow-xs"
                : "border border-btn-sec-border bg-white text-text-main hover:bg-slate-50"
            }`}
          >
            {isAuthenticated ? "Go to Dashboard" : "Start Free Trial"}
          </Button>
        </Link>
      </div>
    </div>
  );
};
