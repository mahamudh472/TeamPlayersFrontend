import React from "react";
import { Typography } from "../../../components/ui";

export const ContactContainer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Typography variant="h2" className="mb-6">
        Contact Us
      </Typography>
      <Typography variant="body1">
        Get in touch with our team. We'd love to hear from you.
      </Typography>
    </div>
  );
};
