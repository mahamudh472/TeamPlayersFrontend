import React, { useState } from "react";
import { Link } from "react-router";
import { LandingHeader } from "../components";
import { Typography, Button } from "../../../components/ui";
import { HelpCircle, ArrowRight, ChevronDown } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQCategory {
    title: string;
    faqs: FAQItem[];
}

export const FaqContainer: React.FC = () => {
    // Structured FAQ categories directly from your asset source
    const categories: FAQCategory[] = [
        {
            title: "Getting Started",
            faqs: [
                {
                    question: "How long does setup take?",
                    answer:
                        "Most agencies complete setup in under 30 minutes. Our guided onboarding walks you through creating your workspace, connecting integrations, and inviting team members.",
                },
                {
                    question: "Do I need technical skills to use the platform?",
                    answer:
                        "No technical skills required. Our platform is designed for recruiters, not developers. If you can use Gmail or LinkedIn, you can use Team Players.",
                },
                {
                    question: "Can I import my existing data?",
                    answer:
                        "Yes! We support imports from CSV files, other ATS systems, and most popular recruitment platforms. Our team can help with data migration during onboarding.",
                },
                {
                    question: "Is there a free trial?",
                    answer:
                        "Yes, we offer a 14-day free trial with full access to all features. No credit card required to start.",
                },
            ],
        },
        {
            title: "AI Features",
            faqs: [
                {
                    question: "How does AI candidate screening work?",
                    answer:
                        "Our AI analyzes CVs against your job requirements, extracting skills, experience, and qualifications. It generates match scores (0-100%), summaries, and recommendations. The AI learns from your feedback to improve over time.",
                },
                {
                    question: "Is the AI screening accurate?",
                    answer:
                        "Our AI has 95%+ accuracy in parsing CVs and matching candidates. It's been trained on millions of job descriptions and CVs across industries. However, we recommend recruiters always review AI recommendations before making final decisions.",
                },
                {
                    question: "How does lead generation work?",
                    answer:
                        "AI scans thousands of companies daily, looking for hiring signals like job postings, growth indicators, and industry news. Leads are scored based on your target criteria (industry, company size, location) and presented in a prioritized pipeline.",
                },
                {
                    question: "Can AI replace my recruiters?",
                    answer:
                        "No, and that's not the goal. AI handles time-consuming admin tasks (CV screening, data entry, scheduling) so recruiters can focus on relationship-building and strategic work. Think of it as a super-powered assistant.",
                },
            ],
        },
        {
            title: "Pricing & Billing",
            faqs: [
                {
                    question: "What payment methods do you accept?",
                    answer:
                        "We accept all major credit cards (Visa, Mastercard, Amex), debit cards, and bank transfers for annual plans.",
                },
                {
                    question: "Can I change plans later?",
                    answer:
                        "Yes, you can upgrade or downgrade at any time. Upgrades take effect immediately. Downgrades take effect at the end of your current billing period.",
                },
                {
                    question: "What happens if I exceed my AI screening limit?",
                    answer:
                        "You can purchase additional screenings at £0.50 each, or upgrade to a higher plan. We'll notify you when you're approaching your limit.",
                },
                {
                    question: "Do you offer discounts for annual billing?",
                    answer:
                        "Yes! Annual billing saves 20% compared to monthly. Contact sales for details.",
                },
                {
                    question: "Is there a contract?",
                    answer:
                        "No long-term contracts required. Monthly subscriptions can be cancelled anytime. Annual subscriptions have a 12-month commitment.",
                },
            ],
        },
        {
            title: "Integrations & Data",
            faqs: [
                {
                    question: "What integrations are available?",
                    answer:
                        "We integrate with Gmail, Outlook, Google Calendar, LinkedIn, Indeed, Stripe, WhatsApp, and 50+ other tools. Custom integrations available on Enterprise plans.",
                },
                {
                    question: "Is my data secure?",
                    answer:
                        "Absolutely. We're GDPR compliant, use enterprise-grade encryption (AES-256), and never share your data with third parties. All data is stored in secure UK data centers.",
                },
                {
                    question: "Can I export my data?",
                    answer:
                        "Yes, you can export all your data (candidates, clients, jobs, etc.) to CSV at any time. You own your data.",
                },
                {
                    question: "What happens to my data if I cancel?",
                    answer:
                        "Your data is retained for 90 days after cancellation. You can export it or reactivate your account during this period. After 90 days, data is permanently deleted.",
                },
            ],
        },
        {
            title: "Support",
            faqs: [
                {
                    question: "What support do you offer?",
                    answer:
                        "All plans include email support. Professional and Enterprise plans get priority support and live chat. Enterprise customers get a dedicated account manager.",
                },
                {
                    question: "What are your support hours?",
                    answer:
                        "Support is available Monday-Friday, 9am-6pm GMT. Enterprise customers get 24/7 support.",
                },
                {
                    question: "Do you offer training?",
                    answer:
                        "Yes! All customers get access to our video training library. Professional and Enterprise plans include live onboarding sessions.",
                },
                {
                    question: "How quickly do you respond to support requests?",
                    answer:
                        "Starter: within 48 hours. Professional: within 24 hours. Enterprise: within 4 hours (1 hour for critical issues).",
                },
            ],
        },
    ];

    // Track active opened questions per category index + item index
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggleAccordion = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <main className="flex-1">
            {/* Landing Header matches exact schema from your templates */}
            <LandingHeader
                title="Frequently Asked Questions"
                subtitle="Everything you need to know about Team Players. Can't find what you're looking for? Reach out to our support team."
            />

            {/* Main Accordion Body */}
            <section className="py-20 px-4 bg-slate-50/50">
                <div className="max-w-4xl mx-auto space-y-16">
                    {categories.map((category, catIndex) => (
                        <div key={category.title} className="space-y-6">
                            {/* Category Header */}
                            <div className="flex items-center gap-2.5 pb-2 border-b border-btn-sec-border">
                                <HelpCircle className="w-6 h-6 text-primary" />
                                <Typography
                                    variant="h3"
                                    className="text-2xl font-bold text-text-main"
                                >
                                    {category.title}
                                </Typography>
                            </div>

                            {/* Accordion List */}
                            <div className="space-y-4">
                                {category.faqs.map((faq, faqIndex) => {
                                    const itemKey = `${catIndex}-${faqIndex}`;
                                    const isOpen = openIndex === itemKey;

                                    return (
                                        <div
                                            key={faqIndex}
                                            className="bg-white rounded-xl border border-btn-sec-border overflow-hidden transition-all duration-200 shadow-xs"
                                        >
                                            {/* Accordion Trigger */}
                                            <button
                                                onClick={() => toggleAccordion(itemKey)}
                                                className="w-full flex items-center justify-between text-left px-6 py-4 outline-hidden cursor-pointer group hover:bg-slate-50/50 transition-colors"
                                            >
                                                <Typography
                                                    variant="body1"
                                                    className="font-semibold text-text-main group-hover:text-primary transition-colors"
                                                >
                                                    {faq.question}
                                                </Typography>
                                                <ChevronDown
                                                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-primary" : ""
                                                        }`}
                                                />
                                            </button>

                                            {/* Accordion Content Area with Smooth Max-Height Reveal */}
                                            <div
                                                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px]" : "max-h-0"
                                                    }`}
                                            >
                                                <div className="px-6 pb-5 pt-1 border-t border-slate-100/50">
                                                    <Typography
                                                        variant="body2"
                                                        className="text-muted-foreground leading-relaxed"
                                                    >
                                                        {faq.answer}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom Call to Action Section */}
            <section className="py-20 px-4 bg-slate-100/30 border-t border-btn-sec-border">
                <div className="max-w-4xl mx-auto text-center">
                    <Typography
                        variant="h3"
                        className="text-3xl md:text-4xl font-bold mb-4 text-text-main"
                    >
                        Still Have Questions?
                    </Typography>
                    <Typography variant="body1" className="text-muted-foreground mb-8">
                        Our team is here to help. Get in touch and we'll answer any
                        questions you have.
                    </Typography>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/book-demo">
                            <Button className="h-11 px-8 font-semibold text-sm rounded-lg bg-primary hover:bg-primary/95 text-white shadow-xs transition-all cursor-pointer flex items-center gap-2">
                                Book a Demo
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button
                                variant="secondary"
                                className="h-11 px-8 font-semibold text-sm rounded-lg border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 transition-all cursor-pointer"
                            >
                                Contact Support
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default FaqContainer;
