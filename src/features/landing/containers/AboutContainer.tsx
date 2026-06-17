import React from "react";
import { Link } from "react-router";
import { LandingHeader } from "../components";
import { Typography, Button } from "../../../components/ui";
import { Target, Users, TrendingUp, Heart, ArrowRight } from "lucide-react";
import { useAuth } from "../../../shared/context/AuthContext";

export const AboutContainer: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <main className="flex-1">
      <LandingHeader
        title="About Team Players"
        subtitle="We're building the future of recruitment. AI-powered tools that help agencies scale without sacrificing quality."
      />

      <section className="py-20 px-4 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          {/* Our Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <Typography variant="h3" className="text-3xl font-bold mb-6 text-text-main">
                Our Story
              </Typography>
              <div className="space-y-4 text-muted-foreground">
                <Typography variant="body1">
                  Team Players was founded in 2022 by a team of recruitment industry veterans who were frustrated with outdated tools and manual processes.
                </Typography>
                <Typography variant="body1">
                  We spent years building ATS systems, managing candidate pipelines, and chasing leads. We knew there had to be a better way.
                </Typography>
                <Typography variant="body1">
                  When AI technology matured, we saw an opportunity to transform recruitment. Not by replacing recruiters, but by giving them superpowers.
                </Typography>
                <Typography variant="body1">
                  Today, hundreds of agencies use our platform to find more clients, screen candidates faster, and make more placements than ever before.
                </Typography>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-btn-sec-border p-8 h-full flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-4">2022</div>
                <Typography variant="h5" className="font-semibold text-text-main">
                  Founded in London
                </Typography>
                <Typography variant="body2" className="text-muted-foreground mt-2">
                  Now serving agencies across the UK
                </Typography>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-20">
            <Typography variant="h3" className="text-3xl font-bold text-center mb-12 text-text-main">
              Our Values
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Value 1 */}
              <div data-slot="card" className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <Typography variant="h5" className="font-bold text-text-main mb-2">
                    Mission-Driven
                  </Typography>
                  <Typography variant="body2" className="text-muted-foreground leading-relaxed">
                    We believe AI should empower recruiters, not replace them. Our mission is to eliminate busywork so you can focus on relationships.
                  </Typography>
                </div>
              </div>

              {/* Value 2 */}
              <div data-slot="card" className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <Typography variant="h5" className="font-bold text-text-main mb-2">
                    Customer-First
                  </Typography>
                  <Typography variant="body2" className="text-muted-foreground leading-relaxed">
                    Every feature we build starts with recruiter feedback. Your success is our success.
                  </Typography>
                </div>
              </div>

              {/* Value 3 */}
              <div data-slot="card" className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <Typography variant="h5" className="font-bold text-text-main mb-2">
                    Continuous Innovation
                  </Typography>
                  <Typography variant="body2" className="text-muted-foreground leading-relaxed">
                    We invest heavily in AI research to stay ahead. Our platform evolves as the industry evolves.
                  </Typography>
                </div>
              </div>

              {/* Value 4 */}
              <div data-slot="card" className="bg-white rounded-xl border border-btn-sec-border p-6 shadow-xs flex flex-col gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <Typography variant="h5" className="font-bold text-text-main mb-2">
                    Built by Recruiters
                  </Typography>
                  <Typography variant="body2" className="text-muted-foreground leading-relaxed">
                    Our founding team spent 10+ years in recruitment. We understand your challenges firsthand.
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* By the Numbers */}
          <div className="bg-slate-100/50 rounded-xl p-12 border border-btn-sec-border">
            <Typography variant="h3" className="text-3xl font-bold text-center mb-12 text-text-main">
              By the Numbers
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                <Typography variant="body2" className="text-muted-foreground">
                  Agencies Using Our Platform
                </Typography>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50K+</div>
                <Typography variant="body2" className="text-muted-foreground">
                  Candidates Screened Monthly
                </Typography>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
                <Typography variant="body2" className="text-muted-foreground">
                  Placements Made
                </Typography>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
                <Typography variant="body2" className="text-muted-foreground">
                  Customer Satisfaction
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-50 border-t border-btn-sec-border">
        <div className="max-w-4xl mx-auto text-center">
          <Typography variant="h3" className="text-3xl md:text-4xl font-bold mb-4 text-text-main">
            Join Us on This Journey
          </Typography>
          <Typography variant="body1" className="text-muted-foreground mb-8">
            Whether you're a solo recruiter or a 50-person agency, we're here to help you succeed.
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
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
