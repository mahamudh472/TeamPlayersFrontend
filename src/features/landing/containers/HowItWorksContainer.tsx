import React from "react";
import { Link } from "react-router";
import { LandingHeader, StepCard } from "../components";
import { Typography, Button } from "../../../components/ui";
import {
  UserPlus,
  TrendingUp,
  Briefcase,
  Bot,
  Users,
  Calendar,
  CircleCheck as CircleCheckIcon,
  ArrowDown,
  ArrowRight
} from "lucide-react";

export const HowItWorksContainer: React.FC = () => {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: "Sign Up & Set Up",
      description: "Create your agency workspace in under 5 minutes",
      items: [
        "Create your account with email",
        "Set up your agency profile",
        "Choose your subscription plan",
        "Invite team members",
        "Connect integrations (email, calendar, etc.)"
      ]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Find Clients with AI",
      description: "Let AI discover potential clients for you",
      items: [
        "Set your target industries and company sizes",
        "AI scans thousands of companies for hiring signals",
        "Leads are automatically scored and prioritized",
        "Get contact details for decision-makers",
        "Track outreach and conversions"
      ]
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Post Your First Job",
      description: "Upload a job description and let AI do the work",
      items: [
        "Upload job description (PDF or paste text)",
        "AI extracts skills, experience, and requirements",
        "Set salary, location, and other details",
        "Publish to your careers page and job boards",
        "Candidate pipeline created automatically"
      ]
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Screens Candidates",
      description: "Every application is analyzed in seconds",
      items: [
        "Candidates apply via your portal or job boards",
        "AI parses CV and extracts key information",
        "Match score calculated against job criteria",
        "Summary and recommendations generated",
        "High-fit candidates auto-shortlisted"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Review & Submit",
      description: "Focus on relationships, not admin",
      items: [
        "Review AI-scored candidates in seconds",
        "Read summaries instead of full CVs",
        "Add notes and communicate with candidates",
        "Generate submission packs for clients",
        "Track client feedback and decisions"
      ]
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Schedule Interviews",
      description: "Automated booking and reminders",
      items: [
        "Send calendar links to candidates and clients",
        "Automatic sync with Google Calendar / Outlook",
        "Reminders sent 24 hours before",
        "Collect feedback after interviews",
        "Track outcomes and next steps"
      ]
    },
    {
      icon: <CircleCheckIcon className="w-8 h-8" />,
      title: "Make Placements",
      description: "Close deals and track revenue",
      items: [
        "Record offers and acceptances",
        "Track placement fees and revenue",
        "Monitor guarantee periods",
        "Generate placement reports",
        "Analyze performance metrics"
      ]
    }
  ];

  return (
    <main className="flex-1">
      <LandingHeader
        title="How It Works"
        subtitle="From setup to placements in 7 simple steps. See how AI transforms your recruitment process."
      />

      <section className="py-20 px-4 bg-slate-50/50">
        <div className="max-w-4xl mx-auto space-y-4">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <StepCard
                stepNumber={index + 1}
                icon={step.icon}
                title={step.title}
                description={step.description}
                items={step.items}
              />
              {index < steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="w-6 h-6 text-primary" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-50 border-t border-btn-sec-border">
        <div className="max-w-4xl mx-auto text-center">
          <Typography variant="h3" className="text-3xl md:text-4xl font-bold mb-4 text-text-main">
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" className="text-muted-foreground mb-8">
            Join hundreds of agencies using AI to scale their business
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button className="h-11 px-8 font-semibold text-sm rounded-lg bg-primary hover:bg-primary/95 text-white shadow-xs transition-all cursor-pointer flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" className="h-11 px-8 font-semibold text-sm rounded-lg border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 transition-all cursor-pointer">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
