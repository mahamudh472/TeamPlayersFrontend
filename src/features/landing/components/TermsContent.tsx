import React from "react";
import { Typography } from "../../../components/ui";

export const TermsContent: React.FC = () => {
    return (
        <article className="max-w-4xl mx-auto px-6 py-16 text-left space-y-8">
            <div>
                <Typography variant="h1" className="font-extrabold text-text-main leading-tight mb-2">
                    Terms of Service
                </Typography>
                <Typography variant="body2" className="text-muted-text">
                    Last updated: June 9, 2026
                </Typography>
            </div>

            <section className="space-y-4">
                <Typography variant="h4" className="font-bold text-text-main">
                    1. Agreement to Terms
                </Typography>
                <Typography variant="body1" className="text-muted-text leading-relaxed">
                    By accessing or using NoahMoore's platform and recruitment services, you agree to be bound by these Terms of Service. If you do not agree, please do not use or access our services.
                </Typography>
            </section>

            <section className="space-y-4">
                <Typography variant="h4" className="font-bold text-text-main">
                    2. User Accounts & Security
                </Typography>
                <Typography variant="body1" className="text-muted-text leading-relaxed">
                    You are responsible for safeguarding the credentials you use to access the service and for any activities or actions under your account. You agree not to disclose your password to any third party.
                </Typography>
            </section>

            <section className="space-y-4">
                <Typography variant="h4" className="font-bold text-text-main">
                    3. Intellectural Property
                </Typography>
                <Typography variant="body1" className="text-muted-text leading-relaxed">
                    The platform, design, software, algorithms, assets, and all content provided by NoahMoore are the exclusive property of NoahMoore and its licensors. You may not copy, modify, distribute, or reverse-engineer any part of the service.
                </Typography>
            </section>

            <section className="space-y-4">
                <Typography variant="h4" className="font-bold text-text-main">
                    4. Limitation of Liability
                </Typography>
                <Typography variant="body1" className="text-muted-text leading-relaxed">
                    In no event shall NoahMoore, its directors, employees, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, goodwill, or other intangible losses.
                </Typography>
            </section>

            <section className="space-y-4">
                <Typography variant="h4" className="font-bold text-text-main">
                    5. Termination
                </Typography>
                <Typography variant="body1" className="text-muted-text leading-relaxed">
                    We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </Typography>
            </section>

            <section className="space-y-4">
                <Typography variant="h4" className="font-bold text-text-main">
                    6. Changes to Terms
                </Typography>
                <Typography variant="body1" className="text-muted-text leading-relaxed">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notification prior to any new terms taking effect.
                </Typography>
            </section>
        </article>
    );
};
