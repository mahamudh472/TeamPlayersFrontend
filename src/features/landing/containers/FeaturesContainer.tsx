import React from "react";
import { LandingHeader, FeatureSection } from "../components";
import { Target, Bot, Zap, BarChart3, Users, Globe } from "lucide-react";

export const FeaturesContainer: React.FC = () => {
  const categories = [
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      heading: "Lead Generation",
      features: [
        { title: "AI Company Discovery", description: "Automatically find companies hiring in your target sectors" },
        { title: "Opportunity Scoring", description: "AI ranks leads by likelihood to convert" },
        { title: "Contact Enrichment", description: "Find decision-maker details instantly" },
        { title: "Hiring Signal Detection", description: "Identify companies actively recruiting" }
      ]
    },
    {
      icon: <Bot className="w-6 h-6 text-primary" />,
      heading: "Candidate Screening",
      features: [
        { title: "CV Parsing", description: "Extract skills, experience, and qualifications automatically" },
        { title: "Match Scoring", description: "AI compares candidates against job requirements" },
        { title: "Smart Summaries", description: "Get instant recruiter-style candidate summaries" },
        { title: "Automated Shortlisting", description: "High-fit candidates automatically flagged" }
      ]
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      heading: "Workflow Automation",
      features: [
        { title: "Email Sequences", description: "Automated follow-ups for candidates and clients" },
        { title: "Interview Scheduling", description: "Calendar integration and booking automation" },
        { title: "Pipeline Management", description: "Move candidates through stages automatically" },
        { title: "Task Reminders", description: "Never miss a follow-up or deadline" }
      ]
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      heading: "Analytics & Reporting",
      features: [
        { title: "Real-time Dashboard", description: "Live metrics on placements, revenue, and pipeline" },
        { title: "Recruiter Performance", description: "Track individual and team productivity" },
        { title: "Time-to-Fill Metrics", description: "Optimize your recruitment process" },
        { title: "Custom Reports", description: "Generate client and internal reports instantly" }
      ]
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      heading: "Client Management",
      features: [
        { title: "Client Portal", description: "Branded portal for clients to review candidates" },
        { title: "Feedback Tracking", description: "Collect and manage client feedback" },
        { title: "Meeting History", description: "Full timeline of client interactions" },
        { title: "Contract Management", description: "Store and track client agreements" }
      ]
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      heading: "Integrations",
      features: [
        { title: "Email & Calendar", description: "Gmail, Outlook, Google Calendar sync" },
        { title: "Job Boards", description: "Post to Indeed, LinkedIn, and more" },
        { title: "CRM Systems", description: "Integrate with your existing tools" },
        { title: "Payment Processing", description: "Stripe integration for client billing" }
      ]
    }
  ];

  return (
    <main className="flex-1">
      <LandingHeader
        title="Powerful Features for Modern Recruiters"
        subtitle="Everything you need to run a successful recruitment agency, powered by AI automation."
      />

      <section className="py-20 px-4 bg-slate-50/50">
        <div className="max-w-7xl mx-auto space-y-16">
          {categories.map((category, index) => (
            <FeatureSection
              key={index}
              icon={category.icon}
              heading={category.heading}
              features={category.features}
            />
          ))}
        </div>
      </section>
    </main>
  );
};
