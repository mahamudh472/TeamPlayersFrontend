import React from "react";
import { Link } from "react-router";
import { LandingHeader, PricingCard } from "../components";
import { Typography, Button } from "../../../components/ui";
import { HelpCircle } from "lucide-react";

export const PricingContainer: React.FC = () => {
  const plans = [
    {
      title: "Starter",
      description: "Perfect for small teams starting with AI recruitment",
      price: "£99",
      features: [
        "Up to 5 users",
        "100 AI screenings per month",
        "Basic analytics dashboard",
        "Email support",
        "Standard integrations",
        "Client portal access"
      ],
      popular: false
    },
    {
      title: "Professional",
      description: "For growing agencies ready to scale",
      price: "£249",
      features: [
        "Up to 15 users",
        "500 AI screenings per month",
        "Advanced analytics & reporting",
        "AI lead generation",
        "Priority email & chat support",
        "All integrations included",
        "Custom branding",
        "API access"
      ],
      popular: true
    },
    {
      title: "Enterprise",
      description: "Unlimited power for established agencies",
      price: "£599",
      features: [
        "Unlimited users",
        "Unlimited AI screenings",
        "Full analytics suite",
        "Unlimited lead generation",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options",
        "SLA guarantee",
        "Custom workflows",
        "Advanced security"
      ],
      popular: false
    }
  ];

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
                key={index}
                title={plan.title}
                description={plan.description}
                price={plan.price}
                features={plan.features}
                popular={plan.popular}
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
