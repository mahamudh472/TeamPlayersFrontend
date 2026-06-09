import React from "react";
import { Typography } from "../../../components/ui";

export const PrivacyContent: React.FC = () => {
    return (
        <article className="max-w-4xl mx-auto px-6 py-16 text-left space-y-8">
            <div>
                <Typography variant="h1" className="font-extrabold text-text-main leading-tight mb-2">
                    Privacy Policy
                </Typography>
                <Typography variant="body2" className="text-muted-text">
                    Last updated: June 9, 2026
                </Typography>
            </div>

            <section className="space-y-4">
                <Typography variant="h4" className="font-bold text-text-main">
                    1. Information We Collect
                </Typography>
                <Typography variant="body1" className="text-muted-text leading-relaxed">
                    We collect personal information that you provide to us directly when registering an account, creating profile details, posting job descriptions, or communicating with us. This may include your name, email, agency name, and phone number.
                </Typography>
            </section>

            <section className="space-y-4">
                <Typography variant="h4" className="font-bold text-text-main">
                    2. How We Use Your Information
                </Typography>
                <Typography variant="body1" className="text-muted-text leading-relaxed">
                    We use the information we collect to operate, maintain, and improve our recruitment platform services, to process transactions, communicate with you, analyze platform usage, and protect against security incidents.
                </Typography>
            </section>

            <section className="space-y-4">
                <Typography variant="h4" className="font-bold text-text-main">
                    3. Information Sharing & Disclosure
                </Typography>
                <Typography variant="body1" className="text-muted-text leading-relaxed">
                    We do not sell, rent, or trade your personal information. We may share information with trusted third-party service providers who assist us in operating our platform, so long as those parties agree to keep this information confidential.
                </Typography>
            </section>

            <section className="space-y-4">
                <Typography variant="h4" className="font-bold text-text-main">
                    4. Security of Your Data
                </Typography>
                <Typography variant="body1" className="text-muted-text leading-relaxed">
                    We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </Typography>
            </section>

            <section className="space-y-4">
                <Typography variant="h4" className="font-bold text-text-main">
                    5. Cookies & Tracking Technologies
                </Typography>
                <Typography variant="body1" className="text-muted-text leading-relaxed">
                    We use cookies and similar tracking technologies to track user activities on our platform and hold certain preferences. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </Typography>
            </section>

            <section className="space-y-4">
                <Typography variant="h4" className="font-bold text-text-main">
                    6. Your Rights & Choices
                </Typography>
                <Typography variant="body1" className="text-muted-text leading-relaxed">
                    You have the right to access, update, correct, or delete your personal information at any time by accessing your profile settings or contacting support directly.
                </Typography>
            </section>
        </article>
    );
};
