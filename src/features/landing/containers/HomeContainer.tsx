import React from "react";
import { Button, Typography } from "../../../components/ui";

export const HomeContainer: React.FC = () => {
    return (
        <main className="w-full">
            <section className="container mx-auto items-center text-center my-20 flex flex-col gap-4">
                <Typography className="w-1/2" variant="h1">
                    Recruitment Automation for Modern Agencies
                </Typography>
                <Typography variant="subtitle1" className="w-1/2">
                    Transform your recruitment agency with AI-driven lead generation,
                    intelligent candidate matching, and automated workflows. Close more
                    placements, faster.
                </Typography>

                <Button>Get Start Now</Button>
            </section>
        </main>
    );
};
{
    /* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-center text-center">
                                
                                
                                  <Typography
                                    variant="h1"
                                    className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight"
                                  >
                                    Smarter Sourcing. <span className="text-primary">Faster Placements.</span>
                                  </Typography>
                                
                                  <Typography
                                    variant="subtitle1"
                                    className="mb-10 max-w-2xl text-muted-text text-lg md:text-xl leading-relaxed"
                                  >
                                    The ultimate workspace for candidate sourcing, client management, and job matching. Empowering agencies and enterprises worldwide.
                                  </Typography>
                                
                                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <Link to="/register">
                                      <Button variant="primary" size="lg" className="gap-2 group">
                                        Start Free Trial
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                      </Button>
                                    </Link>
                                    <Link to="/pricing">
                                      <Button variant="secondary" size="lg">
                                        View Pricing
                                      </Button>
                                    </Link>
                                  </div>
                                </section>
                                
                                {/* Horizontal Brand Line (bg: #14B8A61A) */
}
{
    /* <section className="w-full bg-accent-light py-6 border-y border-primary/10">
                                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                                      <div className="flex items-center gap-2 opacity-85 hover:opacity-100 transition-opacity">
                                        <Globe className="w-5 h-5 text-primary" />
                                        <Typography
                                          variant="body2"
                                          component="span"
                                          className="font-bold tracking-wider text-primary"
                                        >
                                          GLOBAL TALENT
                                        </Typography>
                                      </div>
                                      <div className="flex items-center gap-2 opacity-85 hover:opacity-100 transition-opacity">
                                        <Zap className="w-5 h-5 text-primary" />
                                        <Typography
                                          variant="body2"
                                          component="span"
                                          className="font-bold tracking-wider text-primary"
                                        >
                                          REALTIME AI
                                        </Typography>
                                      </div>
                                      <div className="flex items-center gap-2 opacity-85 hover:opacity-100 transition-opacity">
                                        <Shield className="w-5 h-5 text-primary" />
                                        <Typography
                                          variant="body2"
                                          component="span"
                                          className="font-bold tracking-wider text-primary"
                                        >
                                          SECURE CLOUD
                                        </Typography>
                                      </div>
                                      <div className="flex items-center gap-2 opacity-85 hover:opacity-100 transition-opacity">
                                        <Cpu className="w-5 h-5 text-primary" />
                                        <Typography
                                          variant="body2"
                                          component="span"
                                          className="font-bold tracking-wider text-primary"
                                        >
                                          MATCH ENGINE
                                        </Typography>
                                      </div>
                                    </div>
                                  </div>
                                </section> */
}

{
    /* Features Grid */
}
{
    /* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                                  <div className="text-center mb-16">
                                    <Typography variant="h2" className="mb-4">
                                      Built for High-Growth Teams
                                    </Typography>
                                    <Typography
                                      variant="subtitle2"
                                      className="max-w-2xl mx-auto text-muted-text text-base"
                                    >
                                      Everything you need to source, track, and close candidate placements in a single workspace.
                                    </Typography>
                                  </div>
                                
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="p-8 rounded-xl border border-btn-sec-border bg-white shadow-xs hover:shadow-md transition-all duration-300">
                                      <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center text-primary mb-6">
                                        <Users className="w-6 h-6" />
                                      </div>
                                      <Typography variant="h5" className="mb-3 font-bold">
                                        Client Relations
                                      </Typography>
                                      <Typography variant="body2" className="text-muted-text leading-relaxed">
                                        Track client acquisition, manage accounts, and keep detailed requirements all in one single system of record.
                                      </Typography>
                                    </div>
                                
                                    <div className="p-8 rounded-xl border border-btn-sec-border bg-white shadow-xs hover:shadow-md transition-all duration-300">
                                      <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center text-primary mb-6">
                                        <Briefcase className="w-6 h-6" />
                                      </div>
                                      <Typography variant="h5" className="mb-3 font-bold">
                                        Job Pipeline
                                      </Typography>
                                      <Typography variant="body2" className="text-muted-text leading-relaxed">
                                        Automated job posting, application pipelines, and interviewer notes ensure you never lose track of top talent.
                                      </Typography>
                                    </div>
                                
                                    <div className="p-8 rounded-xl border border-btn-sec-border bg-white shadow-xs hover:shadow-md transition-all duration-300">
                                      <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center text-primary mb-6">
                                        <TrendingUp className="w-6 h-6" />
                                      </div>
                                      <Typography variant="h5" className="mb-3 font-bold">
                                        Analytics & Placements
                                      </Typography>
                                      <Typography variant="body2" className="text-muted-text leading-relaxed">
                                        Keep tabs on placement speed, success rates, and team revenue with native, interactive dashboard tools.
                                      </Typography>
                                    </div>
                                  </div>
                                </section> */
}

{
    /* Testimonials Block (bg: #14B8A61A) */
}
{
    /* <section className="w-full bg-accent-light py-20 border-t border-primary/10">
                                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="text-center mb-16">
                                      <Typography variant="h2" className="mb-4">
                                        Loved by Recruiters Everywhere
                                      </Typography>
                                      <Typography
                                        variant="subtitle2"
                                        className="max-w-2xl mx-auto text-muted-text text-base"
                                      >
                                        See how our platform helps modern teams scale their recruitment operations.
                                      </Typography>
                                    </div>
                                
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                      <div className="bg-white p-8 rounded-xl border border-primary/10 shadow-xs relative">
                                        <Typography
                                          variant="body1"
                                          className="italic mb-6 text-text-main font-medium leading-relaxed"
                                        >
                                          "NoahMoore completely revolutionized our placement speed. We went from a 30-day average hire time down to just 9 days using their automated matching engine."
                                        </Typography>
                                        <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                            JS
                                          </div>
                                          <div>
                                            <Typography variant="subtitle2" className="font-bold text-text-main">
                                              Jane Sanders
                                            </Typography>
                                            <Typography variant="caption" className="text-light-text">
                                              VP of Talent, Apex Tech
                                            </Typography>
                                          </div>
                                        </div>
                                      </div>
                                
                                      <div className="bg-white p-8 rounded-xl border border-primary/10 shadow-xs relative">
                                        <Typography
                                          variant="body1"
                                          className="italic mb-6 text-text-main font-medium leading-relaxed"
                                        >
                                          "Having client info, job pipelines, and candidate details in a single workspace is a game changer. Our recruiters save hours of administrative tasks every single day."
                                        </Typography>
                                        <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                            MC
                                          </div>
                                          <div>
                                            <Typography variant="subtitle2" className="font-bold text-text-main">
                                              Marcus Chen
                                            </Typography>
                                            <Typography variant="caption" className="text-light-text">
                                              Founder, TalentScale Agency
                                            </Typography>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section> */
}
