import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Typography } from "../../../components/ui";

export const ContactCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      {/* Email Card */}
      <div data-slot="card" className="bg-white text-card-foreground flex flex-col gap-4 rounded-xl border border-btn-sec-border p-6 shadow-xs text-left">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <div>
          <Typography variant="h6" className="font-bold text-text-main">
            Email
          </Typography>
          <div className="mt-2 text-muted-foreground">
            <p className="font-semibold text-text-main mb-1">hello@teamplayers.ai</p>
            <p className="text-sm">We typically respond within 24 hours</p>
          </div>
        </div>
      </div>

      {/* Phone Card */}
      <div data-slot="card" className="bg-white text-card-foreground flex flex-col gap-4 rounded-xl border border-btn-sec-border p-6 shadow-xs text-left">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Phone className="w-6 h-6 text-primary" />
        </div>
        <div>
          <Typography variant="h6" className="font-bold text-text-main">
            Phone
          </Typography>
          <div className="mt-2 text-muted-foreground">
            <p className="font-semibold text-text-main mb-1">+44 20 1234 5678</p>
            <p className="text-sm">Mon-Fri, 9am-6pm GMT</p>
          </div>
        </div>
      </div>

      {/* Office Card */}
      <div data-slot="card" className="bg-white text-card-foreground flex flex-col gap-4 rounded-xl border border-btn-sec-border p-6 shadow-xs text-left">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <div>
          <Typography variant="h6" className="font-bold text-text-main">
            Office
          </Typography>
          <div className="mt-2 text-muted-foreground">
            <p className="font-semibold text-text-main mb-1">London, United Kingdom</p>
            <p className="text-sm">Visit by appointment only</p>
          </div>
        </div>
      </div>
    </div>
  );
};
