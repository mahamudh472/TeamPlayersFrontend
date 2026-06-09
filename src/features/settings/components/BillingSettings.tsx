import React from "react";
import { Typography, Button } from "../../../components/ui";
import { CreditCard } from "lucide-react";

export const BillingSettings: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Subscription */}
            <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs space-y-6">
                <div>
                    <Typography variant="h4" className="font-bold text-text-main">
                        Subscription
                    </Typography>
                    <Typography variant="body2" className="text-muted-text">
                        Manage your billing and subscription
                    </Typography>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/15">
                    <div>
                        <Typography variant="body1" className="font-semibold capitalize text-primary text-md">
                            professional Plan
                        </Typography>
                        <Typography variant="body2" className="text-xs text-primary/70">
                            Billed monthly
                        </Typography>
                    </div>
                    <div className="text-right">
                        <Typography variant="h3" className="font-bold text-primary">
                            £249
                        </Typography>
                        <Typography variant="caption" className="text-primary/70">
                            /month
                        </Typography>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="secondary" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                        Cancel Subscription
                    </Button>
                </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs space-y-6">
                <div>
                    <Typography variant="h4" className="font-bold text-text-main">
                        Payment Method
                    </Typography>
                    <Typography variant="body2" className="text-muted-text">
                        Manage your payment methods
                    </Typography>
                </div>
                <div className="flex items-center gap-4 p-4 border border-btn-sec-border rounded-lg">
                    <CreditCard className="w-8 h-8 text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                        <Typography variant="body1" className="font-semibold text-text-main text-sm">
                            •••• •••• •••• 4242
                        </Typography>
                        <Typography variant="body2" className="text-xs text-muted-text">
                            Expires 12/25
                        </Typography>
                    </div>
                    <Button variant="outline" className="text-xs py-1 px-2.5 h-8">
                        Update
                    </Button>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Add Payment Method
                </Button>
            </div>
        </div>
    );
};
