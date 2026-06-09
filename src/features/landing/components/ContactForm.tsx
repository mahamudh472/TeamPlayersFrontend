import React, { useState } from "react";
import { Send } from "lucide-react";
import { Input, Select, Typography, OptionType } from "../../../components/ui";

export const ContactForm: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [subject, setSubject] = useState<OptionType | null>(null);
    const [message, setMessage] = useState("");

    const subjectOptions = [
        { label: "Sales Inquiry", value: "sales" },
        { label: "Technical Support", value: "support" },
        { label: "Request a Demo", value: "demo" },
        { label: "Partnership Opportunity", value: "partnership" },
        { label: "Other", value: "other" },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject) {
            alert("Please select a subject");
            return;
        }
        alert(`Message sent successfully!\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nSubject: ${subject.label}\nMessage: ${message}`);
        setName("");
        setEmail("");
        setCompany("");
        setSubject(null);
        setMessage("");
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div data-slot="card" className="bg-white text-card-foreground flex flex-col gap-6 rounded-xl border border-btn-sec-border p-8 shadow-xs text-left">
                <div>
                    <Typography variant="h5" className="font-bold text-text-main leading-none">
                        Send Us a Message
                    </Typography>
                    <Typography variant="body2" className="text-muted-foreground mt-2">
                        Fill out the form below and our team will get back to you within 24 hours.
                    </Typography>
                </div>
                <div className="mt-2">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Full Name *"
                                type="text"
                                id="name"
                                placeholder="John Smith"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                label="Email Address *"
                                type="email"
                                id="email"
                                placeholder="you@agency.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Input
                            label="Company Name"
                            type="text"
                            id="company"
                            placeholder="Your Agency Ltd"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        <Select
                            label="Subject *"
                            placeholder="What can we help you with?"
                            options={subjectOptions}
                            value={subject}
                            onChange={(val) => setSubject(val)}
                        />
                        <div className="w-full flex flex-col gap-1.5">
                            <label htmlFor="message" className="cursor-pointer select-none">
                                <Typography variant="body2" className="font-semibold text-text-main">
                                    Message *
                                </Typography>
                            </label>
                            <textarea
                                id="message"
                                rows={6}
                                required
                                placeholder="Tell us more about how we can help..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-text-main transition-all duration-200 outline-none bg-white placeholder:text-light-text focus:ring-2 focus:ring-primary/20 border-btn-sec-border focus:border-primary focus:ring-primary/20 resize-none"
                            />
                        </div>
                        <button
                            data-slot="button"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-white h-9 px-4 py-2 w-full bg-accent hover:bg-accent/90 cursor-pointer"
                            type="submit"
                        >
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
