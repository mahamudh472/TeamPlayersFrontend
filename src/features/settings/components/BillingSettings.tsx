import React, { useState, useEffect } from "react";
import { Typography, Button } from "../../../components/ui";
import { CreditCard } from "lucide-react";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

export const BillingSettings: React.FC = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    const [plans, setPlans] = useState<any[]>([]);
    const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);
    const [isLoadingPlans, setIsLoadingPlans] = useState(true);
    const [isLoadingSub, setIsLoadingSub] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState<number | string | null>(null);
    const [isPortalLoading, setIsPortalLoading] = useState(false);

    const formatPrice = (price: string | number, currency: string) => {
        const amount = parseFloat(String(price));
        const symbol = currency === "EUR" ? "€" : currency === "GBP" ? "£" : currency === "USD" ? "$" : currency;
        const amountStr = amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2);
        return `${symbol}${amountStr}`;
    };

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setIsLoadingPlans(true);
                const res = await apiClient.get("/api/v1/finance/plans/");
                const sortedPlans = [...res.data].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                setPlans(sortedPlans);
            } catch (err: any) {
                console.error("Failed to fetch plans:", err);
                toast.error(err.response?.data?.detail || "Failed to load available plans");
            } finally {
                setIsLoadingPlans(false);
            }
        };

        fetchPlans();
    }, [toast]);

    useEffect(() => {
        const fetchCurrentPlan = async () => {
            if (!agencyId) {
                setIsLoadingSub(false);
                return;
            }
            try {
                setIsLoadingSub(true);
                const res = await apiClient.get("/api/v1/finance/agency-plan/", {
                    headers: { "X-Agency-ID": String(agencyId) }
                });
                setSubscriptionInfo(res.data);
            } catch (err: any) {
                console.error("Failed to fetch current plan:", err);
                // Don't show toast for 404 (no active plan/subscription is normal)
                if (err.response?.status !== 404) {
                    toast.error(err.response?.data?.detail || "Failed to fetch current plan status");
                }
            } finally {
                setIsLoadingSub(false);
            }
        };

        fetchCurrentPlan();
    }, [agencyId, toast]);

    const handlePlanAction = async (planId: number) => {
        if (!agencyId) {
            toast.error("Please select or join an agency to manage subscriptions.");
            return;
        }
        setIsActionLoading(planId);
        try {
            const response = await apiClient.post("/api/v1/finance/checkout/", {
                plan_id: planId
            }, {
                headers: {
                    "X-Agency-ID": String(agencyId)
                }
            });

            if (response.data?.checkout_url) {
                window.location.href = response.data.checkout_url;
            } else {
                throw new Error("No checkout URL returned from Stripe.");
            }
        } catch (error: any) {
            console.error("Stripe checkout error:", error);
            toast.error(error.response?.data?.error || error.response?.data?.detail || "Failed to start checkout process. Please try again.");
        } finally {
            setIsActionLoading(null);
        }
    };

    const handleManageBilling = async () => {
        if (!agencyId) {
            toast.error("Please select or join an agency to manage billing.");
            return;
        }
        setIsPortalLoading(true);
        try {
            const response = await apiClient.post("/api/v1/finance/billing-portal/", {}, {
                headers: {
                    "X-Agency-ID": String(agencyId)
                }
            });

            if (response.data?.url) {
                window.location.href = response.data.url;
            } else {
                throw new Error("No billing portal URL returned.");
            }
        } catch (error: any) {
            console.error("Billing portal error:", error);
            toast.error(error.response?.data?.error || error.response?.data?.detail || "Failed to open billing portal. Please try again.");
        } finally {
            setIsPortalLoading(false);
        }
    };

    if (isLoadingPlans || isLoadingSub) {
        return (
            <div className="bg-white rounded-xl border border-btn-sec-border shadow-xs flex flex-col items-center justify-center p-12 min-h-[350px]">
                <svg
                    className="animate-spin text-primary shrink-0 w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
                <Typography variant="body2" className="text-muted-text mt-4">
                    Loading billing settings...
                </Typography>
            </div>
        );
    }

    const activeSub = subscriptionInfo?.subscription;
    const isSubActive = activeSub?.is_active;
    const currentPlan = activeSub?.plan;

    return (
        <div className="space-y-6 text-left">
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
                {isSubActive && currentPlan ? (
                    <>
                        <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/15">
                            <div>
                                <Typography variant="body1" className="font-semibold capitalize text-primary text-md">
                                    {currentPlan.name} Plan
                                </Typography>
                                <Typography variant="body2" className="text-xs text-primary/70">
                                    Billed {currentPlan.interval || "monthly"}
                                </Typography>
                            </div>
                            <div className="text-right">
                                <Typography variant="h3" className="font-bold text-primary">
                                    {formatPrice(currentPlan.price, currentPlan.currency || "EUR")}
                                </Typography>
                                <Typography variant="caption" className="text-primary/70">
                                    /{currentPlan.interval || "month"}
                                </Typography>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                loading={isPortalLoading}
                                onClick={handleManageBilling}
                                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 font-semibold"
                            >
                                Cancel or Manage Subscription
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <Typography variant="body1" className="font-semibold text-text-main text-sm">
                            No active subscription
                        </Typography>
                        <Typography variant="body2" className="text-xs text-muted-text mt-1">
                            Choose a plan below to upgrade your account and get started.
                        </Typography>
                    </div>
                )}
            </div>

            {/* Available Plans */}
            <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs space-y-6">
                <div>
                    <Typography variant="h4" className="font-bold text-text-main">
                        Available Plans
                    </Typography>
                    <Typography variant="body2" className="text-muted-text">
                        Select a plan to upgrade or downgrade your agency subscription.
                    </Typography>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {plans.map((plan) => {
                        const isCurrent = isSubActive && currentPlan && String(currentPlan.id) === String(plan.id);

                        let btnText = "Subscribe";
                        let isUpgrade = false;
                        let isDowngrade = false;

                        if (isSubActive && currentPlan) {
                            const currentPrice = parseFloat(currentPlan.price);
                            const planPrice = parseFloat(plan.price);
                            
                            if (isCurrent) {
                                btnText = "Current Plan";
                            } else if (planPrice > currentPrice) {
                                btnText = "Upgrade";
                                isUpgrade = true;
                            } else {
                                btnText = "Downgrade";
                                isDowngrade = true;
                            }
                        }

                        // For parsing backend feature_list when it's either an array or a JSON string
                        let features: string[] = [];
                        if (plan.feature_list) {
                            if (Array.isArray(plan.feature_list)) {
                                features = plan.feature_list;
                            } else {
                                try {
                                    features = JSON.parse(plan.feature_list);
                                } catch (e) {
                                    features = [];
                                }
                            }
                        }

                        return (
                            <div key={plan.id} className={`p-6 rounded-xl border flex flex-col justify-between h-full relative ${
                                isCurrent ? "border-primary bg-primary/5" : "border-btn-sec-border bg-white"
                            }`}>
                                {isCurrent && (
                                    <span className="absolute top-3 right-3 text-xs font-semibold text-primary px-2 py-0.5 bg-primary/10 rounded-full">
                                        Active
                                    </span>
                                )}
                                <div>
                                    <Typography variant="h5" className="font-bold text-text-main text-lg mb-1 capitalize">
                                        {plan.name}
                                    </Typography>
                                    <Typography variant="body2" className="text-muted-text text-sm mb-4 min-h-[40px]">
                                        {plan.description}
                                    </Typography>
                                    <div className="flex items-baseline mb-4">
                                        <Typography variant="h3" className="font-bold text-text-main">
                                            {formatPrice(plan.price, plan.currency)}
                                        </Typography>
                                        <Typography variant="caption" className="text-muted-text ml-1">
                                            /{plan.interval}
                                        </Typography>
                                    </div>
                                    
                                    <ul className="space-y-2 mb-6">
                                        {features.map((feature: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-primary font-bold text-sm shrink-0">✓</span>
                                                <span className="text-xs text-text-main">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <Button
                                    variant={isCurrent ? "outline" : "primary"}
                                    disabled={isCurrent}
                                    loading={isActionLoading === plan.id}
                                    onClick={() => handlePlanAction(plan.id)}
                                    className="w-full mt-auto"
                                >
                                    {btnText}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

