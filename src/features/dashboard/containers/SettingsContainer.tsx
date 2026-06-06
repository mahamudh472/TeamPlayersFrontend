import React from "react";
import { Typography } from "../../../components/ui";

export const SettingsContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <Typography variant="h2">Settings</Typography>
      <Typography variant="body1">
        Manage your personal account, team, and system preferences.
      </Typography>
    </div>
  );
};
