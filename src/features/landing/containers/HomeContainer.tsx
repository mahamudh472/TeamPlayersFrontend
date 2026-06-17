import React from "react";
import { Link } from "react-router";
import { PricingCard, TestimonialCard } from "../components";
import { Typography, Button } from "../../../components/ui";
import { useAuth } from "../../../shared/context/AuthContext";
import {
  ArrowRight,
  Target,
  Bot,
  Zap,
  BarChart3,
  Clock,
  TrendingUp,
  Sparkles,
  DollarSign,
  HelpCircle
} from "lucide-react";

const automationFeatures = [
  {
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    title: "AI Lead Discovery",
    description: "Automatically identify and qualify potential clients using advanced AI algorithms."
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Smart Candidate Matching",
    description: "Match candidates to roles with 95% accuracy using AI-powered screening."
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Automated Workflows",
    description: "Streamline your recruitment process from lead to placement."
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
    title: "Revenue Analytics",
    description: "Track placements, revenue, and performance metrics in real-time."
  }
];

const benefits = [
  { icon: <Clock className="w-8 h-8 text-primary" />, stat: "10x", label: "Faster Candidate Screening" },
  { icon: <TrendingUp className="w-8 h-8 text-primary" />, stat: "3x", label: "More Placements Per Month" },
  { icon: <Sparkles className="w-8 h-8 text-primary" />, stat: "60%", label: "Reduction in Admin Time" },
  { icon: <DollarSign className="w-8 h-8 text-primary" />, stat: "+150%", label: "Revenue Growth on Average" }
];

const howItWorksSteps = [
  { step: "1", title: "Create Your Account", description: "Sign up and set up your agency workspace in under 5 minutes." },
  { step: "2", title: "AI Does the Work", description: "Upload jobs and CVs. AI screens candidates, finds leads, and automates workflows." },
  { step: "3", title: "Make Placements", description: "Focus on relationships while AI handles admin. Track everything in real-time." }
];

const testimonials = [
  {
    quote: "This platform transformed our agency. We've doubled our placements while reducing our team's workload by 40%.",
    name: "Sarah Johnson",
    role: "Director, Elite Recruiters Ltd"
  },
  {
    quote: "The AI screening is incredibly accurate. It's like having a senior recruiter review every application instantly.",
    name: "Michael Chen",
    role: "CEO, TechTalent Partners"
  },
  {
    quote: "Lead generation alone pays for the platform. We're booking 3x more client meetings than before.",
    name: "Emma Williams",
    role: "Founder, Future Careers"
  }
];

const pricingPlans = [
  {
    title: "Starter",
    description: "Perfect for small teams",
    price: "£99",
    features: ["Up to 5 users", "100 AI screenings/month", "Basic analytics", "Email support"],
    popular: false
  },
  {
    title: "Professional",
    description: "For growing agencies",
    price: "£249",
    features: ["Up to 15 users", "500 AI screenings/month", "Advanced analytics", "Lead generation", "Priority support"],
    popular: true
  },
  {
    title: "Enterprise",
    description: "Unlimited power",
    price: "£599",
    features: ["Unlimited users", "Unlimited AI screenings", "Full analytics suite", "Custom integrations", "Dedicated account manager"],
    popular: false
  }
];

const faqs = [
  { q: "How does AI candidate screening work?", a: "Our AI analyzes CVs against your job requirements, extracting skills, experience, and qualifications. It generates match scores, summaries, and recommendations instantly." },
  { q: "Can I try it before committing?", a: "Yes! We offer a 14-day free trial with full access to all features. No credit card required." },
  { q: "How quickly can we get set up?", a: "Most agencies are up and running in under 30 minutes. Our guided onboarding walks you through every step." },
  { q: "Is my data secure?", a: "Absolutely. We're GDPR compliant, use enterprise-grade encryption, and never share your data with third parties." }
];

export const HomeContainer: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main className="flex-1">
      {/* Hero */}
      <section
        className="py-24 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-xs mb-6">
            Powered by AI
          </span>
          <Typography variant="h1" className="text-5xl md:text-6xl font-bold mb-6 text-text-main leading-tight">
            Recruitment Automation<br />for Modern Agencies
          </Typography>
          <Typography variant="body1" className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your recruitment agency with AI-driven lead generation, intelligent candidate matching, and automated workflows. Close more placements, faster.
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="h-11 px-8 font-semibold text-sm rounded-lg bg-primary hover:bg-primary/95 text-white shadow-xs transition-all cursor-pointer flex items-center gap-2">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button className="h-11 px-8 font-semibold text-sm rounded-lg bg-primary hover:bg-primary/95 text-white shadow-xs transition-all cursor-pointer flex items-center gap-2">
                  Get started now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
          <Typography variant="body2" className="text-muted-foreground mt-4 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </Typography>
        </div>
        <img className="border-4 border-black rounded-2xl max-w-6xl mx-auto mt-8" src="/banner.jpg" />

      </section>

      <section
        className="py-10"
        style={{
          background: "linear-gradient(135deg, rgba(30, 41, 59, 0.1) 0%, #F8FAFC 0.01%, rgba(20, 184, 166, 0.1) 100%)"
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Typography variant="h2" className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-none">
                10,000+
              </Typography>
              <Typography variant="body2" className="text-xs md:text-sm text-slate-500 font-medium mt-2">
                Placements Made
              </Typography>
            </div>
            <div className="flex flex-col items-center">
              <Typography variant="h2" className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-none">
                500+
              </Typography>
              <Typography variant="body2" className="text-xs md:text-sm text-slate-500 font-medium mt-2">
                Agencies
              </Typography>
            </div>
            <div className="flex flex-col items-center">
              <Typography variant="h2" className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-none">
                95%
              </Typography>
              <Typography variant="body2" className="text-xs md:text-sm text-slate-500 font-medium mt-2">
                Match Accuracy
              </Typography>
            </div>
            <div className="flex flex-col items-center">
              <Typography variant="h2" className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-none">
                $2M+
              </Typography>
              <Typography variant="body2" className="text-xs md:text-sm text-slate-500 font-medium mt-2">
                Revenue Generated
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* AI Recruitment Automation */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-4 text-text-main">
              Powerful Features for Modern Recruiters
            </Typography>
            <Typography variant="body1" className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to scale your recruitment business
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {automationFeatures.map((feature, idx) => (
              <div
                key={idx}
                data-slot="card"
                className="bg-white rounded-xl border-2 border-btn-sec-border hover:border-primary transition-colors p-6 shadow-xs flex flex-col gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <Typography variant="h5" className="font-bold text-text-main">
                  {feature.title}
                </Typography>
                <Typography variant="body2" className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </Typography>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/features">
              <Button suffixIcon={ArrowRight} variant="outline">
                View All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-4 text-text-main">
              Simple, Transparent Pricing
            </Typography>
            <Typography variant="body1" className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your agency. All plans include a 14-day free trial.
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {pricingPlans.map((plan, idx) => (
              <PricingCard
                key={idx}
                title={plan.title}
                description={plan.description}
                price={plan.price}
                features={plan.features}
                popular={plan.popular}
              />
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 px-4"
        style={{
          background: "linear-gradient(135deg, rgba(30, 41, 59, 0.1) 0%, #F8FAFC 0.01%, rgba(20, 184, 166, 0.1) 100%)"
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-4 text-text-main">
              What Our Customers Say
            </Typography>
            <Typography variant="body1" className="text-muted-foreground max-w-2xl mx-auto">
              Trusted by recruitment agencies across the UK
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={idx} quote={t.quote} name={t.name} role={t.role} />
            ))}
          </div>
        </div>
      </section>




      <section className="py-20 px-4 bg-slate-50 border-t border-btn-sec-border">
        <div className="max-w-4xl mx-auto text-center">
          <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-4 text-text-main">
            Ready to Transform Your Recruitment Agency?
          </Typography>
          <Typography variant="body1" className="text-muted-foreground mb-8">
            Join hundreds of agencies using AI to scale their business
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="h-11 px-8 font-semibold text-sm rounded-lg bg-primary hover:bg-primary/95 text-white shadow-xs transition-all cursor-pointer flex items-center gap-2">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button className="h-11 px-8 font-semibold text-sm rounded-lg bg-primary hover:bg-primary/95 text-white shadow-xs transition-all cursor-pointer flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
            <Link to="/contact">
              <Button variant="secondary" className="h-11 px-8 font-semibold text-sm rounded-lg border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 transition-all cursor-pointer">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-slate-50/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-4 text-text-main">
              Frequently Asked Questions
            </Typography>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} data-slot="card" className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-2">
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
      </section>

      {/* Final CTA */}

    </main>
  );
};
