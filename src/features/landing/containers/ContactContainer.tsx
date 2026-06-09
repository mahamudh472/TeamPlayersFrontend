import React from "react";
import { LandingHeader, ContactCards, ContactForm } from "../components";

export const ContactContainer: React.FC = () => {
  return (
    <main className="flex-1">
      <LandingHeader
        title="Get in Touch"
        subtitle="Have questions? We're here to help. Send us a message and we'll respond as soon as possible."
      />
      <section className="py-20 px-4 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <ContactCards />
          <ContactForm />
        </div>
      </section>
    </main>
  );
};
