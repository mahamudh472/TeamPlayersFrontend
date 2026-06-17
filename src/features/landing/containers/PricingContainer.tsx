import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { LandingHeader, PricingCard } from "../components";
import { Typography, Button } from "../../../components/ui";
import { HelpCircle } from "lucide-react";
import { apiClient } from "../../../shared/api/apiClient";

export const PricingContainer: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.get("/api/v1/finance/plans/");
      // Sort plans by price so that they display in order: e.g. Starter (99), Professional (249), Enterprise (599)
      const sortedPlans = [...response.data].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      setPlans(sortedPlans);
    } catch (err: any) {
      console.error("Failed to fetch plans:", err);
      setError(err.response?.data?.detail || "Failed to load pricing plans. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const formatPrice = (price: string | number, currency: string) => {
    const amount = parseFloat(String(price));
    const symbol = currency === "EUR" ? "€" : currency === "GBP" ? "£" : currency === "USD" ? "$" : currency;
    const amountStr = amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2);
    return `${symbol}${amountStr}`;
  };

  const faqs = [
    {
      q: "Can I change plans later?",
      a: "Yes, you can upgrade or downgrade at any time. Changes take effect immediately."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, debit cards, and bank transfers for annual plans."
    },
    {
      q: "Is there a setup fee?",
      a: "No setup fees, ever. The price you see is what you pay."
    },
    {
      q: "What happens after my trial ends?",
      a: "You can choose a plan to continue, or your account will be paused. Your data is saved for 30 days."
    },
    {
      q: "Do you offer annual billing?",
      a: "Yes! Annual billing saves 20% compared to monthly. Contact sales for details."
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, cancel anytime with no penalties. Your subscription remains active until the end of the billing period."
    }
  ];

  if (isLoading) {
    return (
      <main className="flex-1">
        <LandingHeader
          title="Simple, Transparent Pricing"
          subtitle="Choose the plan that fits your agency. All plans include a 14-day free trial. No credit card required."
        />
        <section className="py-20 px-4 bg-slate-50/50 flex flex-col items-center justify-center min-h-[400px]">
          <svg
            className="animate-spin text-primary shrink-0 w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <Typography variant="body2" className="text-muted-text mt-4">
            Loading plans...
          </Typography>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1">
        <LandingHeader
          title="Simple, Transparent Pricing"
          subtitle="Choose the plan that fits your agency. All plans include a 14-day free trial. No credit card required."
        />
        <section className="py-20 px-4 bg-slate-50/50 flex flex-col items-center justify-center min-h-[400px]">
          <Typography variant="h5" className="text-red-500 font-semibold mb-2">
            Failed to load plans
          </Typography>
          <Typography variant="body2" className="text-muted-foreground mb-6">
            {error}
          </Typography>
          <Button onClick={fetchPlans} variant="primary">
            Retry
          </Button>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <LandingHeader
        title="Simple, Transparent Pricing"
        subtitle="Choose the plan that fits your agency. All plans include a 14-day free trial. No credit card required."
      />

      <section className="py-20 px-4 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
            {plans.map((plan, index) => (
              <PricingCard
                key={plan.id || index}
                title={plan.name}
                description={plan.description}
                price={formatPrice(plan.price, plan.currency)}
                features={plan.feature_list || []}
                popular={plan.name.toLowerCase() === "professional" || plan.name.toLowerCase() === "pro"}
              />
            ))}
          </div>

          {/* Pricing Footer */}
          <div className="text-center mb-16">
            <Typography variant="body2" className="text-muted-foreground mb-4">
              All prices in GBP. Taxes may apply. Volume discounts available for 25+ users.
            </Typography>
            <Link to="/contact">
              <Button variant="secondary" className="h-10 px-6 font-semibold text-sm rounded-lg border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 transition-all cursor-pointer">
                Contact Sales for Enterprise Pricing
              </Button>
            </Link>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto border-t border-btn-sec-border pt-16">
            <Typography variant="h3" className="text-3xl font-bold text-center mb-12 text-text-main">
              Frequently Asked Questions
            </Typography>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} data-slot="card" className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-2">
                  <div className="flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <Typography variant="h6" className="font-bold text-text-main text-lg mb-1">
                        {faq.q}
                      </Typography>
                      <Typography variant="body2" className="text-muted-foreground">
                        {faq.a}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
