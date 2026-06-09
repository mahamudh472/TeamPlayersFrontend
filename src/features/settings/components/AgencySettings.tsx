import React, { useState } from "react";
import { Typography, Input, AppBadge, Button } from "../../../components/ui";

export const AgencySettings: React.FC = () => {
    const [agencyName, setAgencyName] = useState("Demo Agency");
    const [isSavingAgency, setIsSavingAgency] = useState(false);

    const handleSaveAgency = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingAgency(true);
        setTimeout(() => setIsSavingAgency(false), 800);
    };

    return (
        <form onSubmit={handleSaveAgency} className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs space-y-6">
            <div>
                <Typography variant="h4" className="font-bold text-text-main">
                    Agency Information
                </Typography>
                <Typography variant="body2" className="text-muted-text">
                    Update your agency details
                </Typography>
            </div>
            <div className="space-y-4">
                <Input
                    label="Agency Name"
                    type="text"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Typography variant="body2" className="font-medium text-text-main text-sm">
                            Current Plan
                        </Typography>
                        <div className="flex items-center gap-2">
                            <Input
                                type="text"
                                value="professional"
                                disabled
                                className="bg-slate-50 cursor-not-allowed grow"
                            />
                            <AppBadge variant="primary" className="capitalize">
                                professional
                            </AppBadge>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Typography variant="body2" className="font-medium text-text-main text-sm">
                            Team Size
                        </Typography>
                        <Input
                            type="text"
                            value="5 members"
                            disabled
                            className="bg-slate-50 cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" loading={isSavingAgency}>
                    Save Changes
                </Button>
            </div>
        </form>
    );
};
